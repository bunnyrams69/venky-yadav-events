import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'rgba(8, 8, 16, 0.95)',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
        padding: '60px 5% 30px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}
      >
        {/* Brand */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--gold-primary)', marginBottom: '12px' }}>
            Venky Yadav
          </h3>
          <p className="text-body" style={{ maxWidth: '280px' }}>
            Every Event, A Memory Forever. Premium event planning and catering across Telangana.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-primary)', marginBottom: '16px' }}>QUICK LINKS</h4>
          {['Services', 'Portfolio', 'Process', 'Pricing', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                display: 'block',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                marginBottom: '10px',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--gold-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-primary)', marginBottom: '16px' }}>SERVICES</h4>
          {['Birthday Decorations', 'Wedding Decoration', 'Catering Services', 'Photography', 'Stage Decoration'].map((item) => (
            <p key={item} style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: '14px', marginBottom: '10px' }}>{item}</p>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-primary)', marginBottom: '16px' }}>REACH US</h4>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: '14px', marginBottom: '10px' }}>📍 Telangana, India</p>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: '14px', marginBottom: '10px' }}>📞 +91 99999 99999</p>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: '14px', marginBottom: '10px' }}>✉️ hello@venkyyadavevents.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(212, 175, 55, 0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: '13px' }}>
          © {new Date().getFullYear()} Venky Yadav Events & Catering. All rights reserved.
        </p>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Made with <Heart size={14} color="var(--gold-rose)" fill="var(--gold-rose)" /> in Telangana
        </p>
      </div>
    </footer>
  );
}
