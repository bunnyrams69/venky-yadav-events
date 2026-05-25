import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // ── CANVAS SCROLL SEQUENCE ──
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Retina scaling
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Pre-load all 192 frames
    const frames = [];
    const currentFrame = { value: 0 };

    function drawFrame(index) {
      const img = frames[index];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      const scale = Math.max(
        canvas.clientWidth / img.width,
        canvas.clientHeight / img.height
      );
      const x = (canvas.clientWidth - img.width * scale) / 2;
      const y = (canvas.clientHeight - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/hero-sequence/${String(i).padStart(4, '0')}.jpg`;
      if (i === 1) {
        img.onload = () => drawFrame(0);
      }
      frames.push(img);
    }

    // GSAP scroll-driven frame sequence
    gsap.to(currentFrame, {
      value: TOTAL_FRAMES - 1,
      snap: 'value',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
      onUpdate: () => {
        drawFrame(Math.round(currentFrame.value));
      },
    });

    // ── TEXT APPEARS AFTER 50% SCROLL ──
    const textElements = textRef.current?.querySelectorAll('.hero-animate');
    if (textElements) {
      gsap.fromTo(
        textElements,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '50% bottom',  // text appears when section is 50% scrolled
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    const handleResize = () => {
      resize();
      drawFrame(Math.round(currentFrame.value));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '200vh',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Canvas Background — scroll frame sequence */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            mixBlendMode: 'screen',
            opacity: 0.65,
          }}
        />

        {/* Gradient overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(8,8,16,0.9) 0%, rgba(8,8,16,0.4) 45%, transparent 100%)',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '240px',
            background: 'linear-gradient(to top, #080810, transparent)',
            zIndex: 1,
          }}
        />

        {/* Minimal Text — only visible after 50% scroll */}
        <div
          ref={textRef}
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '0 5%',
            maxWidth: '700px',
          }}
        >
          <h1
            className="text-hero"
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '32px',
            }}
          >
            <span className="hero-animate" style={{ visibility: 'hidden' }}>
              WE CREATE
            </span>
            <span
              className="hero-animate text-hero-italic"
              style={{ visibility: 'hidden' }}
            >
              UNFORGETTABLE MOMENTS
            </span>
          </h1>

          <div
            className="hero-animate"
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              visibility: 'hidden',
            }}
          >
            <a href="#contact" className="btn-primary">
              Book Your Event
            </a>
            <a href="#portfolio" className="btn-outline">
              See Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
