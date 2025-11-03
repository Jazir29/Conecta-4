// src/components/Board.jsx
import React from "react";

/**
 * Board
 * Props:
 * - board: matriz ROWS x COLS
 * - onDrop(col): función para dejar caer en columna col
 * - winningPositions: array de posiciones [[r,c],...] para resaltar (o null)
 */
export default function Board({ board, onDrop, winningPositions }) {
  // función de ayuda para saber si una celda está en la línea ganadora
  const isWinningCell = (r, c) => {
    if (!winningPositions) return false;
    return winningPositions.some(([wr, wc]) => wr === r && wc === c);
  };

  return (
    <div className="board" role="grid" aria-label="Tablero 4 en raya">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row" role="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${
                isWinningCell(rowIndex, colIndex) ? "win" : ""
              }`}
              onClick={() => onDrop(colIndex)}
              role="gridcell"
              aria-label={`Fila ${rowIndex + 1} Columna ${colIndex + 1}`}
            >
              {cell && <div className={`disc ${cell}`}></div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
