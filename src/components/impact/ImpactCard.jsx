export default function ImpactCard({ label, value, detail }) {
  return (
    <article className="impact-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <p>{detail}</p>}
    </article>
  );
}
