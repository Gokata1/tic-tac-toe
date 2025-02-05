import React from "react";
import { twMerge } from "tailwind-merge";
import { RefreshCcw } from "lucide-react";

const GameBoard = () => {
  const [board, setBoard] = React.useState<(string | null)[]>(
    Array(9).fill(false)
  );
  const [turn, setTurn] = React.useState<"X" | "O">("X");
  const [gameStatus, setGameStatus] = React.useState<
    "running" | "finished" | "draw"
  >("running");
  const [winner, setWinner] = React.useState<number[] | null>(null);

  const resetGame = () => {
    setBoard(Array(9).fill(false));
    setWinner(null);
    setGameStatus("running");
  };

  const winConditions = (board: (string | null)[]) => {
    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setGameStatus("finished");
        setWinner([a, b, c]);
        return board[a];
      }
    }

    return null;
  };

  const isDraw = (board: (string | boolean | null)[]) => {
    return !board.includes(false);
  };

  const handleClick = (index: number) => {
    setBoard((prev) => {
      prev[index] = turn;
      winConditions(prev);
      isDraw(prev);
      return prev;
    });
    setTurn((prev) => (prev === "X" ? "O" : "X"));
  };

  return (
    <div className="border-2 rounded-sm border-purple-200">
      <button
        className="absolute w-10 h-10 top-5 right-5 flex items-center justify-center border rounded-full hover:bg-gray-50 shadow-sm hover:shadow-md"
        onClick={() => resetGame()}
      >
        <RefreshCcw />
      </button>
      <div className="grid grid-cols-3">
        {board.map((ele, index) => (
          <button
            className={twMerge(
              "w-20 h-20 flex items-center justify-center border rounded-sm disabled:bg-gray-50 text-black text-lg hover:bg-gray-50",
              winner?.includes(index) && "disabled:bg-green-300"
            )}
            key={index}
            onClick={() => handleClick(index)}
            disabled={(gameStatus === "finished" || ele) as true}
          >
            {ele || ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
