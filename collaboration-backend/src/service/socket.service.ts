import { verifyToken } from "../helper";
import documentModel from "../model/document.model";
import { handleCollaborators } from "./documents.service";

export const authSocketMiddleware = (socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: Token missing"));
  }
  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return socket.emit("error", "Unauthorized");
    }
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
};

const usersInRoom:any = {}
export const connectSocket = (socket: any) => {
  const currentUser = socket.data.user;

  // Join a specific document
  socket.on("join-document", (docId: string) => {
    socket.join(docId);
    console.log(`Socket ${socket.id} joined document ${docId}`);
  });

  // Leave a specific document
  socket.on("leave-document", (docId: string) => {
    socket.leave(docId);
    console.log(`Socket ${socket.id} left document ${docId}`);
  });

  // Load the document content
  socket.on("load-document", async (docId: string) => {
    try {        
      let document = await documentModel.findById(docId).lean();
      if (!document) {
        document = await documentModel.create({
          content: "",
          title: "Untitled document",
          owner: String(currentUser?.userId),
        });
        socket.join(document?._id);
      }
    //   handleCollaborators(docId, currentUser?.userId);      
      socket.emit("documentState", document);
    } catch (err) {
      console.error("Error loading document:", err);
    }
  });

  // Update the document content in real-time
  socket.on("updateDocument", async (payload: any) => {
    const docId = [...socket.rooms].find((room) => room !== socket.id);
    if (docId) {
      try {
        const { title, content } = payload;
        const query: any = {};
        if (title !== undefined) {
          query["title"] = title;
        }
        if (content !== undefined) {
          query["content"] = content;
        }
        await documentModel.findByIdAndUpdate(docId, {
          ...query,
        },{ upsert: true,  });//returnDocument: "after"
        
        socket.to(docId).emit("updateDocument", {
          ...query
        });
        handleCollaborators(docId, currentUser?.userId);
      } catch (err) {
        console.error("Error updating document:", err);
      }
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
};
