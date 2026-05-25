import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../../data/content.js';
import SectionHeader from '../ui/SectionHeader.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.process-card');
    if (!cards) return;

    gsap.fromTo(
      cards,
      { x: -60, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section id="process" className="section bg-dot-grid">
      <SectionHeader eyebrow="THE PROCESS" headline="Simple Steps. Spectacular Results." />

      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          position: 'relative',
        }}
      >
        {/* Connecting line (desktop) */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--gold-primary), transparent)',
            opacity: 0.3,
            zIndex: 0,
          }}
        />

        {processSteps.map((step) => (
          <div
            key={step.step}
            className="glass-card process-card"
            style={{
              padding: '40px 32px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
              visibility: 'hidden',
            }}
          >
            {/* Step Number */}
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                border: '2px solid var(--gold-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                background: 'rgba(212, 175, 55, 0.08)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--gold-primary)',
                }}
              >
                {step.step}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '12px',
              }}
            >
              {step.title}
            </h3>

            <p className="text-body">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
