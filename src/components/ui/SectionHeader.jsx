export default function SectionHeader({ eyebrow, headline }) {
  return (
    <div className="section-header">
      <span className="text-eyebrow">{eyebrow}</span>
      <h2 className="text-h2">{headline}</h2>
    </div>
  );
}
