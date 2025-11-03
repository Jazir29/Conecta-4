import React from "react";

export default function Board({ board, onDrop }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              onClick={() => onDrop(colIndex)}
            >
              {cell && <div className={`disc ${cell}`}></div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
