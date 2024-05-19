import React from "react";
import chess_board_landing from "../public/chess_board_landing.png";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-800 h-screen py-0 mt-[-10px]">
      <div className="mt-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
          <div className="flex flex-wrap justify-center align-middle items-center h-screen">
            <img
              src={chess_board_landing}
              className="max-w-96 border-4 rounded-xl border-sky-900"
            />
          </div>
          <div>
            <div className="mt-[150px]">
              <h1 className="text-4xl font-bold text-white text-center">
                Play Chess
              </h1>
              <h1 className="text-4xl font-bold text-white text-center">
                on Dushy's Site!!
              </h1>
            </div>

            <div className="mt-4 ">
              <button
                className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded ml-[100px]"
                onClick={() => {
                  navigate("/game");
                }}
              >
                Play Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
