import { WebSocket } from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./messages";
export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | undefined;
  private users: WebSocket[];
  constructor() {
    this.games = [];
    this.users = [];
  }
  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandeler(socket);
  }
  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
  }
  private addHandeler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      console.log("message recieved ", message);
      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = undefined;
        } else {
          this.pendingUser = socket;
        }
      }
      if (message.type === MOVE) {
        console.log("inside move");
        const game = this.games.find((game) => game.isThisGame(socket));
        if (game) {
          game.makeMove(socket, message.payload);
        }
      }
    });
  }
}
