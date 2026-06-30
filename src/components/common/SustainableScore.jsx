export default function SustainableScore({ score = 0, level = 'Iniciante consciente' }) {
  const safeScore = Math.min(100, Math.max(0, score));

  return (
    <div className="score-panel" aria-label={`Pontuacao sustentavel ${safeScore} de 100`}>
      <div className="score-panel-header">
        <span>Pontuacao sustentavel</span>
        <strong>{safeScore}/100</strong>
      </div>
      <div className="score-track">
        <span style={{ width: `${safeScore}%` }} />
      </div>
      <p>{level}</p>
    </div>
  );
}
