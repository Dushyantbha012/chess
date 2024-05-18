"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({ type: messages_1.INIT_GAME, payload: { color: "white" } }));
        this.player2.send(JSON.stringify({ type: messages_1.INIT_GAME, payload: { color: "black" } }));
    }
    isThisGame(socket) {
        return socket === this.player1 || socket === this.player2;
    }
    makeMove(player, move) {
        //validation
        //is it this users move
        //is the move valid
        console.log("inside make move");
        if (player === this.player1 && this.board.turn() === "b") {
            console.log("wrong turn");
            this.player2.emit(JSON.stringify({ message: "its not your move" }));
            return;
        }
        if (player === this.player2 && this.board.turn() === "w") {
            console.log("wrong turn");
            this.player1.emit(JSON.stringify({ message: "its not your move" }));
            return;
        }
        console.log("did not early return ");
        try {
            console.log("checking the move");
            this.board.move(move);
            console.log("move done");
        }
        catch (e) {
            return;
        }
        //update the board
        //push the move
        if (this.board.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: this.board.turn() === "w" ? "Black" : "White",
            }));
            this.player2.emit(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: this.board.turn() === "w" ? "Black" : "White",
            }));
            return;
        }
        //check if the game is over
        //send updated board to both players
        this.player1.send(JSON.stringify({
            type: messages_1.MOVE,
            payload: this.board.turn(),
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.MOVE,
            payload: this.board.turn(),
        }));
    }
}
exports.Game = Game;
