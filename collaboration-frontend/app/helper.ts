import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

export const socket: Socket = io("http://localhost:8080", {
    auth: {
      token: Cookies.get("token"), // Attach token here
    },
  });