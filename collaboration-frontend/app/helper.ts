import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

export const socket: Socket = io("http://localhost:8080", {
  auth: {
    token: Cookies.get("token"),
  },
});

export const randomColorPick = () => {
  const colors:string[] = ["red","blue","yellow","pink","orange",""];
  const index:number = Math.floor(Math.random() * colors.length);
  const color:string = colors[index];
  return color
};
