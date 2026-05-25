import React from 'react';

export function Card({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`ui-card ${className}`}
      style={{
        background: 'rgba(8, 8, 16, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.05)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`ui-card-header ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '16px',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', style = {}, ...props }) {
  return (
    <h3
      className={`ui-card-title ${className}`}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--text-main)',
        margin: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`ui-card-content ${className}`}
      style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '13px',
        lineHeight: '1.6',
        color: 'rgba(245, 239, 224, 0.8)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
