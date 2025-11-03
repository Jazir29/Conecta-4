// src/components/WinnerModal.jsx
export function WinnerModal({ winner, resetGame }) {
  // Si no hay ganador ni empate, no mostramos nada
  if (winner === null) return null;

  const isDraw = winner === "draw";

  return (
    <section className="winner">
      <div className="text">
        <h2>{isDraw ? "🤝 ¡Empate!" : "🏆 ¡Ganador!"}</h2>

        {/* Si hay un ganador, mostramos su ficha de color */}
        {!isDraw && winner?.color && (
          <div className="win">
            <div className={`disc ${winner.color}`}></div>
          </div>
        )}

        <footer>
          <button onClick={resetGame}>Jugar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
