import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const MIN_DURATION = 2400; // minimum display time in ms

    // Simulate progressive loading tied to real font + frame preloading
    let frame;
    const tick = () => {
      const elapsed = Date.now() - start;
      const natural = Math.min(elapsed / MIN_DURATION, 1);
      // Ease-out curve for smooth feel
      const eased = 1 - Math.pow(1 - natural, 3);
      setProgress(Math.round(eased * 100));

      if (natural < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    // Wait for fonts to be ready, then start the progress
    const fontReady = document.fonts ? document.fonts.ready : Promise.resolve();
    fontReady.then(() => {
      frame = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleExitComplete = () => {
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#080810',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          {/* Brand Mark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{ textAlign: 'center' }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(36px, 6vw, 56px)',
                fontWeight: 700,
                color: '#D4AF37',
                letterSpacing: '0.04em',
                lineHeight: 1.2,
              }}
            >
              Venky Yadav
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.4em',
                color: 'rgba(245, 239, 224, 0.35)',
                marginTop: '12px',
              }}
            >
              EVENTS & CATERING
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ width: '180px' }}
          >
            {/* Track */}
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'rgba(212, 175, 55, 0.15)',
                borderRadius: '1px',
                overflow: 'hidden',
              }}
            >
              {/* Fill */}
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #D4AF37, #C9845A)',
                  borderRadius: '1px',
                  transition: 'width 0.15s ease-out',
                }}
              />
            </div>

            {/* Percentage */}
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                color: 'rgba(245, 239, 224, 0.3)',
                textAlign: 'center',
                marginTop: '14px',
                letterSpacing: '0.15em',
              }}
            >
              {progress}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
