import React, { useState } from "react";
import { Square, PieceSymbol, Color } from "chess.js";
import wk from "../../public/wk.png";
import wq from "../../public/wq.png";
import wn from "../../public/wn.png";
import wb from "../../public/wb.png";
import wp from "../../public/wp.png";
import wr from "../../public/wr.png";
import bk from "../../public/bk.png";
import bq from "../../public/bq.png";
import br from "../../public/br.png";
import bn from "../../public/bn.png";
import bb from "../../public/bb.png";
import bp from "../../public/bp.png";
const ChessBoard = ({
  board,
  socket,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const image = (imgName: string) => {
    switch (imgName) {
      case "bk":
        return { bk };
        break;
      case "bq":
        return { bq };
        break;
      case "br":
        return { br };
        break;
      case "bn":
        return { bn };
        break;
      case "bb":
        return { bb };
        break;
      case "bp":
        return { bp };
        break;
      case "wk":
        return { wk };
        break;
      case "wq":
        return { wq };
        break;
      case "wr":
        return { wr };
        break;
      case "wn":
        return { wn };
        break;
      case "wb":
        return { wb };
        break;
      case "wp":
        return { wp };
        break;
    }
  };
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);
  return (
    <div className="text-black  bordesquare.typer-black border-2">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRep = (
                String.fromCharCode(65 + (j % 8)) +
                "" +
                (8 - i)
              ).toLowerCase() as Square;
              const imgName = square ? square.color + square.type : "";
              return (
                <div
                  onClick={async () => {
                    if (!from) setFrom(square ? square.square : null);
                    else {
                      await setTo(squareRep);
                      socket.send(
                        JSON.stringify({
                          type: "move",
                          payload: {
                            from: from,
                            to: squareRep,
                          },
                        })
                      );
                      setFrom(null);
                      setTo(null);
                    }
                  }}
                  key={j}
                  className={`w-[70px] h-[70px] ${
                    (i + j) % 2 === 0 ? "bg-green-700" : "bg-orange-100"
                  }`}
                >
                  <div className="flex justify-center w-full h-full align-middle items-center">
                    {square ? (
                      <img src={`/${imgName}.png`} className="h-full" />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
