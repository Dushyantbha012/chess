import React, { useEffect, useState } from "react";
import ChessBoard from "./components/ChessBoard";
import { useSocket } from "./hooks/useSocket";
import { Chess } from "chess.js";
function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case "init_game":
          setChess(new Chess());
          setBoard(chess.board());
          console.log("game initialised");
          break;
        case "move":
          const move = message.payload;
          chess.move(move);
          console.log("moved", move);
          setBoard(chess.board());
          break;
        case "game_over":
          const winner = message.payload;
          console.log("winner is ", winner);
          console.log("game over");
          break;
      }
    };
  }, [socket]);
  if (!socket) return <div>Connecting.......</div>;

  return (
    <div className="justify-center flex bg-slate-900 h-screen">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 flex justify-center">
            <ChessBoard board={board} socket={socket} />
          </div>
          <div className="col-span-2 bg-slate-600 justify-center flex rounded">
            <button
              className="h-fit w-fit bg-green-700 text-3xl text-white rounded px-4 py-2 mt-3"
              onClick={() => {
                socket.send(JSON.stringify({ type: "init_game" }));
              }}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
