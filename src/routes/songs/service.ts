import { Server, ServerOptions } from "socket.io";
import { Server as HttpServer } from "http";

export class SocketIOService {
  private static _instance: SocketIOService | undefined;
  private static server: Server | undefined;

  private constructor() {
    // Private constructor ensures singleton instance
  }

  static instance(): SocketIOService {
    if (!this._instance) {
      return new SocketIOService();
    }

    return this._instance;
  }

  initialize(httpServer: HttpServer, opts?: Partial<ServerOptions>) {
    SocketIOService.server = new Server(httpServer, opts);

    return SocketIOService.server;
  }

  ready() {
    return SocketIOService.server !== null;
  }

  getServer(): Server {
    if (!SocketIOService.server) {
      throw new Error("IO server requested before initialization");
    }

    return SocketIOService.server;
  }

  sendMessage(roomId: string | string[], key: string, message: string) {
    this.getServer().to(roomId).emit(key, message);
  }

  emitAll(key: string, message: string) {
    this.getServer().emit(key, message);
  }

  getRooms() {
    return this.getServer().sockets.adapter.rooms;
  }
}