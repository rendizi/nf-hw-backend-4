import { Server } from "socket.io";
import { SocketIOService } from "./service";
import AuthService from "../users/auth-service";

const authService = new AuthService()

export default (expressServer) => {
  SocketIOService.instance().initialize(expressServer, {
    cors: {
        origin: '*'    
    },
  });

  const io = SocketIOService.instance().getServer();

  io.on("connection", async (socket) => {
    socket.on("send-listens-to", async (token,listens) => {
        const tok = token.split(' ')[0]
        const payload = authService.verifyJwt(tok)
      
        if (!payload) {
          return 
        }

        listens.username = payload.username 

        io.emit("listens-to",listens)
    });
  });

  return io;
};

interface listens{
    username: string;
    title: string;
    url: string;
    preview: string;
    author: string;
    currect: number;
    total: number;
}