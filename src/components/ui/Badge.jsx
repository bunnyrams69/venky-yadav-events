export default function Badge({ children, className = '', ...props }) {
  return (
    <span
      className={`ui-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '9999px',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        padding: '3px 10px',
        fontSize: '10px',
        fontWeight: '600',
        letterSpacing: '0.05em',
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
      }}
      {...props}
    >
      {children}
    </span>
  );
}
