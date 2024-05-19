"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const messages_1 = require("./messages");
class GameManager {
  constructor() {
    this.games = [];
    this.users = [];
  }
  addUser(socket) {
    this.users.push(socket);
    this.addHandeler(socket);
  }
  removeUser(socket) {
    this.users = this.users.filter((user) => user !== socket);
  }
  addHandeler(socket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      console.log("message recieved ", message);
      if (message.type === messages_1.INIT_GAME) {
        if (this.pendingUser) {
          const game = new Game_1.Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = undefined;
        } else {
          this.pendingUser = socket;
        }
      }
      if (message.type === messages_1.MOVE) {
        console.log("inside move");
        const game = this.games.find((game) => game.isThisGame(socket));
        console.log("here 1");
        if (game) {
          console.log("huehue");
          game.makeMove(socket, message.payload);
        }
      }
    });
  }
}
exports.GameManager = GameManager;
