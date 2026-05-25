import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import { testimonials } from '../../data/content.js';
import SectionHeader from '../ui/SectionHeader.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const railRef = useRef(null);

  useEffect(() => {
    const cards = railRef.current?.querySelectorAll('.testimonial-card');
    if (!cards) return;

    gsap.fromTo(
      cards,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: railRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section id="testimonials" className="section">
      <SectionHeader eyebrow="HAPPY CLIENTS" headline="They Celebrated. They Loved It." />

      {/* Snap scroll rail */}
      <div
        ref={railRef}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: '16px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          .testimonial-rail::-webkit-scrollbar { display: none; }
        `}</style>

        {testimonials.map((t, i) => (
          <div
            key={i}
            className="glass-card testimonial-card"
            style={{
              minWidth: '340px',
              maxWidth: '400px',
              flex: '0 0 auto',
              padding: '36px',
              scrollSnapAlign: 'start',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              visibility: 'hidden',
            }}
          >
            {/* Quote icon */}
            <Quote size={32} color="var(--gold-primary)" style={{ opacity: 0.5 }} />

            {/* Quote text */}
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.6,
                color: 'var(--text-main)',
                flex: 1,
              }}
            >
              "{t.quote}"
            </p>

            {/* Divider */}
            <div
              style={{
                height: '1px',
                background: 'linear-gradient(to right, var(--gold-primary), transparent)',
                opacity: 0.3,
              }}
            />

            {/* Author */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                }}
              >
                {t.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--gold-rose)',
                  marginTop: '4px',
                }}
              >
                {t.event}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
