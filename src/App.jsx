import { useState, useCallback } from "react";
import "./App.css";

const ROWS = 6;
const COLS = 7;

function App() {
  const [board, setBoard] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );
  const [turn, setTurn] = useState("red");
  const [winner, setWinner] = useState(null);
  const [lastMove, setLastMove] = useState(null);

  // 👉 Verifica si el tablero está lleno
  const isBoardFull = (b) =>
    b.every((row) => row.every((cell) => cell !== null));

  // 👉 Comprueba si hay ganador
  const checkWinnerPositions = (b, row, col) => {
    const directions = [
      { r: 0, c: 1 }, // horizontal
      { r: 1, c: 0 }, // vertical
      { r: 1, c: 1 }, // diagonal ↘
      { r: 1, c: -1 }, // diagonal ↙
    ];

    for (const { r, c } of directions) {
      const positions = [{ row, col }];
      let color = b[row][col];

      // busca en dirección positiva
      let i = 1;
      while (b[row + i * r] && b[row + i * r][col + i * c] === color) {
        positions.push({ row: row + i * r, col: col + i * c });
        i++;
      }

      // busca en dirección negativa
      i = 1;
      while (b[row - i * r] && b[row - i * r][col - i * c] === color) {
        positions.push({ row: row - i * r, col: col - i * c });
        i++;
      }

      if (positions.length >= 4) return positions;
    }

    return null;
  };

  // 👉 Coloca la ficha
  const dropDisc = useCallback(
    (colIndex) => {
      if (winner) return;

      const newBoard = board.map((row) => [...row]);
      let placed = false;

      for (let row = ROWS - 1; row >= 0; row--) {
        if (!newBoard[row][colIndex]) {
          newBoard[row][colIndex] = turn;
          setBoard(newBoard);
          setLastMove({ row, col: colIndex }); // 💡 guardamos la última jugada
          placed = true;

          const winPositions = checkWinnerPositions(newBoard, row, colIndex);
          if (winPositions) {
            setWinner({ color: turn, positions: winPositions });
          } else if (isBoardFull(newBoard)) {
            setWinner("draw");
          } else {
            setTurn((t) => (t === "red" ? "yellow" : "red"));
          }
          break;
        }
      }

      if (!placed) return;
    },
    [board, turn, winner]
  );

  // 👉 Reinicia el juego
  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setWinner(null);
    setTurn("red");
    setLastMove(null);
  };

  return (
    <div className="game">
      <h1>Connect 4</h1>

      <div className="top-panel">
        <div className="turn-info">
          Turno: <span className={`disc ${turn}`}></span>
        </div>
        <button onClick={resetGame}>Reiniciar</button>
      </div>

      <div className="board">
        {board.map((row, rIndex) => (
          <div className="row" key={rIndex}>
            {row.map((cell, cIndex) => {
              const isWinningCell =
                winner &&
                winner !== "draw" &&
                winner.positions.some(
                  (pos) => pos.row === rIndex && pos.col === cIndex
                );

              const isLastMove =
                lastMove && lastMove.row === rIndex && lastMove.col === cIndex;

              return (
                <div
                  key={cIndex}
                  className={`cell 
                    ${isWinningCell ? "win" : ""} 
                    ${isLastMove ? "last" : ""}`}
                  onClick={() => dropDisc(cIndex)}
                >
                  {cell && <div className={`disc ${cell}`}></div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {winner && (
        <div className="winner">
          <div className="text">
            {winner === "draw" ? (
              <h2>¡Empate!</h2>
            ) : (
              <>
                <h2>¡Ganador!</h2>
                <div className="win">
                  <div className={`disc ${winner.color}`}></div>
                </div>
              </>
            )}
            <button onClick={resetGame}>Jugar de nuevo</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
