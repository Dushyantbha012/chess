import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
  private player1: WebSocket;
  private player2: WebSocket;
  public board: Chess;
  private moves: string[];
  private startTime: Date;
  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({ type: INIT_GAME, payload: { color: "white" } })
    );
    this.player2.send(
      JSON.stringify({ type: INIT_GAME, payload: { color: "black" } })
    );
  }
  isThisGame(socket: WebSocket) {
    return socket === this.player1 || socket === this.player2;
  }
  makeMove(player: WebSocket, move: { from: string; to: string }) {
    //validation
    //is it this users move
    //is the move valid
    if (this.board.moves.length % 2 === 0 && player !== this.player1) {
      return;
    }
    if (this.board.moves.length % 2 === 1 && player !== this.player2) {
      return;
    }
    try {
      this.board.move(move);
    } catch (e) {
      return;
    }
    //update the board
    //push the move
    if (this.board.isGameOver()) {
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: this.board.turn() === "w" ? "Black" : "White",
        })
      );
      this.player2.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: this.board.turn() === "w" ? "Black" : "White",
        })
      );
      return;
    }
    //check if the game is over
    //send updated board to both players
    this.player1.emit(
      JSON.stringify({
        type: MOVE,
        payload: this.board.turn(),
      })
    );
    this.player2.emit(
      JSON.stringify({
        type: MOVE,
        payload: this.board.turn(),
      })
    );
  }
}
