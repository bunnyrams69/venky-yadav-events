import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Crown } from 'lucide-react';
import { pricingPackages } from '../../data/content.js';
import SectionHeader from '../ui/SectionHeader.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.pricing-card');
    if (!cards) return;

    gsap.fromTo(
      cards,
      { y: 60, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section id="pricing" className="section bg-dot-grid">
      <SectionHeader eyebrow="PACKAGES" headline="Pick Your Package. We Handle the Rest." />

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        {pricingPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="glass-card pricing-card"
            style={{
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transform: pkg.highlight ? 'scale(1.04)' : 'none',
              border: pkg.highlight
                ? '1px solid var(--glass-border-hover)'
                : '1px solid var(--glass-border)',
              boxShadow: pkg.highlight
                ? '0 0 60px rgba(212, 175, 55, 0.2)'
                : 'none',
              visibility: 'hidden',
            }}
          >
            {/* Badge for Gold */}
            {pkg.highlight && (
              <div
                style={{
                  position: 'absolute',
                  top: '-1px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-rose))',
                  color: '#080810',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  padding: '6px 20px',
                  borderRadius: '0 0 8px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Crown size={12} /> {pkg.tag}
              </div>
            )}

            {/* Tag (non-highlighted) */}
            {!pkg.highlight && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                }}
              >
                {pkg.tag}
              </span>
            )}

            {/* Name */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '36px',
                fontWeight: 700,
                color: pkg.highlight ? 'var(--gold-primary)' : 'var(--text-main)',
                marginTop: pkg.highlight ? '16px' : '0',
                marginBottom: '8px',
              }}
            >
              {pkg.name}
            </h3>

            {/* Price */}
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '24px',
              }}
            >
              {pkg.price}
            </p>

            {/* Divider */}
            <div
              style={{
                height: '1px',
                background: pkg.highlight
                  ? 'linear-gradient(to right, var(--gold-primary), var(--gold-rose), transparent)'
                  : 'var(--glass-border)',
                marginBottom: '24px',
              }}
            />

            {/* Features */}
            <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {pkg.features.map((feat, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  <Check
                    size={16}
                    color="var(--gold-primary)"
                    style={{ flexShrink: 0, marginTop: '2px' }}
                  />
                  {feat}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href="#contact"
              className={pkg.highlight ? 'btn-primary' : 'btn-outline'}
              style={{
                textAlign: 'center',
                display: 'block',
              }}
            >
              {pkg.highlight ? 'Get Started' : 'Choose Plan'}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
