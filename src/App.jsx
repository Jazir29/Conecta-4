import { useState } from "react";
import Board from "./components/Board";
import "./index.css";

import { WinnerModal } from "./components/WinnerModal.jsx";

const ROWS = 6;
const COLS = 7;

function App() {
  const [board, setBoard] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );
  const [turn, setTurn] = useState("red");
  const [winner, setWinner] = useState(null);

  // Coloca una ficha en la columna seleccionada
  const dropDisc = (colIndex) => {
    if (winner) return;

    const newBoard = board.map((row) => [...row]);

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][colIndex]) {
        newBoard[row][colIndex] = turn;
        setBoard(newBoard);
        checkWinner(newBoard, row, colIndex);
        setTurn(turn === "red" ? "yellow" : "red");
        break;
      }
    }
  };

  // Comprueba si hay un ganador
  const checkWinner = (board, row, col) => {
    const color = board[row][col];
    if (!color) return;

    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal descendente
      [1, -1], // diagonal ascendente
    ];

    for (const [dx, dy] of directions) {
      let count = 1;

      for (let i = 1; i < 4; i++) {
        const x = row + dx * i;
        const y = col + dy * i;
        if (board[x]?.[y] === color) count++;
        else break;
      }

      for (let i = 1; i < 4; i++) {
        const x = row - dx * i;
        const y = col - dy * i;
        if (board[x]?.[y] === color) count++;
        else break;
      }

      if (count >= 4) {
        setWinner(color);
        return;
      }
    }
  };

  // Reinicia el juego
  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setWinner(null);
    setTurn("red");
  };

  return (
    <div className="game">
      <h1>4 en Raya</h1>

      {/* Tablero */}
      <Board board={board} onDrop={dropDisc} />

      {/* Panel inferior */}
      <div className="bottom-panel">
        {winner ? (
          <h2>🎉 Ganó {winner.toUpperCase()} 🎉</h2>
        ) : (
          <h2>
            Turno de:{" "}
            <span
              style={{
                color: turn === "red" ? "#ff4b4b" : "#ffd93d",
              }}
            >
              {turn.toUpperCase()}
            </span>
          </h2>
        )}
      </div>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </div>
  );
}

export default App;
