import { Response, Request } from "express";
import documentModel from "../model/document.model";

export const createDocument = async (req: any, res: Response): Promise<any> => {
  try {
    const { title } = req.body;
    const userId = req.assignId;

    const document = await documentModel.create({
      title,
      owner: userId,
      collaborators: [userId],
      version:[{title}]
    });

    return res
      .status(201)
      .send({ message: "Document created successfully", document });
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

export const getDocuments = async (req: any, res: Response): Promise<any> => {
  try {
    const userId = req.assignId;
    const document = await documentModel
      .find({ is_delete: false})
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).send({ document });
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

export const getDocumentById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const document = await documentModel.findById(id).lean();
    return res.status(200).send({ document });
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateDocument = async (req: any, res: Response): Promise<any> => {
  try {
    const userId = req.assignId;
    const { id } = req.params;
    const { content } = req.body;
    const document = await documentModel.findById(id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    document.content = content;
    document.versions.push({ content });
    document.collaborators.push(userId);

    await document.save();

    return res.status(200).send({ document });
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteDocument = async (req: any, res: Response): Promise<any> => {
  try {
    const document = await documentModel.findById(req.params.id);
    if (!document) return res.status(404).json({ error: "Document not found" });

    document.is_delete = true;
    await document.save();
    return res.status(200).send({ document });
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

export const upsertDocument = async (req: any, res: Response): Promise<any> => {
  try {
    const userId = req.assignId;
    const { content, title, id } = req.body;
    let document: any;
    if (id) {
      document = await documentModel.findById(id);
    } else {
      document = new documentModel({});
      document.owner = userId;
    }
    if (content !== undefined) {
      document.content = content;
      document.versions.push({ content });
    }
    if(title === undefined){
        document.title = "Untitled document";
        document.versions.push({ title: "Untitled document" });
    }
        console.log("title",title);
        
    if (title !== undefined) {
      document.title = title;
      document.versions.push({ title });
    }
    if(!document.collaborators.includes(userId)) document.collaborators.push(userId);
    await document.save();
    return res.status(200).send({ document });
  } catch (error: any) {
    console.log("errr", error);

    return res.status(500).send({ message: error.message });
  }
};
