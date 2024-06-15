import { Server } from "socket.io";
import { SocketIOService } from "./service";
import AuthService from "../users/auth-service";

const authService = new AuthService();

export default (expressServer) => {
  SocketIOService.instance().initialize(expressServer, {
    cors: {
      origin: '*',
    },
  });

  const io = SocketIOService.instance().getServer();

  io.on("connection", async (socket) => {
    socket.on("send-listens-to", async (token: string, listens: listens) => {
      try {
        const tok = token.split(' ')[0];
        const payload = authService.verifyJwt(tok);
        
        if (!payload) {
          return;
        }

        listens.username = payload.username;

        io.emit("listens-to", listens);
      } catch (error) {
        console.error("Error verifying JWT in send-listens-to:", error, token, listens);
      }
    });

    socket.on("send-stop-listens-to", async (token) => {
      try {
        const tok = token.split(' ')[0];
        const payload = authService.verifyJwt(tok);
        
        if (!payload) {
          return;
        }

        io.emit("stop-listens-to", payload.username);
      } catch (error) {
        console.error("Error verifying JWT in send-stop-listens-to:", error, token);
      }
    });

    socket.on("disconnect", async (token) => {
      try {
        if (!token) {
          return;
        }

        const tok = token.split(' ')[0];
        const payload = authService.verifyJwt(tok);

        if (!payload) {
          return;
        }

        io.emit("stop-listens-to", payload.username);
      } catch (error) {
        console.error("Error verifying JWT in disconnect:", error, token);
      }
    });

    return io;
  });
}

interface listens {
  username: string;
  title: string;
  author: string;
}
