export default function Marquee() {
  const items = ['BIRTHDAYS', 'WEDDINGS', 'CATERING', 'RECEPTIONS', 'PHOTOGRAPHY', 'STAGE DESIGN', 'BABY SHOWERS', 'CORPORATE'];

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
        <span className={`marquee-item ${i % 3 === 0 ? 'filled' : ''}`}>{item}</span>
        <span className="marquee-separator">✦</span>
      </span>
    ));

  return (
    <section
      style={{
        overflow: 'hidden',
        padding: '40px 0',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
      }}
    >
      <div className="marquee-track">
        {renderItems()}
        {renderItems()}
      </div>
    </section>
  );
}
