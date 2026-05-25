export default function Button({ children, variant = 'primary', onClick, type = 'button', disabled = false, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-outline'} ${className}`}
      style={disabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
    >
      {children}
    </button>
  );
}
