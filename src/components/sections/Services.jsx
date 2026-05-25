import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Utensils, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Flower2, 
  Zap, 
  Users, 
  Home 
} from "lucide-react";
import SectionHeader from "../ui/SectionHeader.jsx";
import "../../assets/styles/services.css";

// Premium features representing our 8 Core Specialized Services
const SERVICES_DATA = [
  {
    id: "catering",
    label: "Royal Catering",
    icon: Utensils,
    image: "/images/catering.jpg",
    description: "South Indian feasts & multi-cuisine culinary spreads crafted by culinary maestros.",
  },
  {
    id: "wedding",
    label: "Wedding Decors",
    icon: Sparkles,
    image: "/images/wedding.jpg",
    description: "Grand mandapam designs, walkway floral styling, and royal entrance aesthetics.",
  },
  {
    id: "birthday",
    label: "Themed Birthdays",
    icon: Home,
    image: "/images/castle.jpg",
    description: "Handcrafted castle, fairytale, superhero, and cartoon Kids birthday setups.",
  },
  {
    id: "coordination",
    label: "Operational Sync",
    icon: Users,
    image: "/images/castle.jpg",
    description: "Timely setups, structured layout syncs, and dedicated on-site event directors.",
  },
  {
    id: "floral",
    label: "Floral Installations",
    icon: Flower2,
    image: "/images/wedding.jpg",
    description: "Exquisite daily floral sculptures constructed using fresh jasmine and marigolds.",
  },
  {
    id: "production",
    label: "Stage Production",
    icon: Zap,
    image: "/images/stage.jpg",
    description: "Intelligent dynamic staging, heavy-bass line arrays, and custom LED installations.",
  },
  {
    id: "allinclusive",
    label: "All-Inclusive feasting",
    icon: Layers,
    image: "/images/catering.jpg",
    description: "Complete package coordination across catering, staging, visual lights, and sound.",
  },
  {
    id: "balloons",
    label: "Balloon Paradise",
    icon: CheckCircle2,
    image: "/images/balloons.jpg",
    description: "10-foot tall themed balloon structures and custom color balloon arches.",
  }
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 60; // Clean vertical chip height matching CSS

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function Services() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileLayout(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentIndex =
    ((step % SERVICES_DATA.length) + SERVICES_DATA.length) % SERVICES_DATA.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index) => {
    const diff = (index - currentIndex + SERVICES_DATA.length) % SERVICES_DATA.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index) => {
    const diff = index - currentIndex;
    const len = SERVICES_DATA.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <section id="services" className="services-section-container bg-dot-grid">
      {/* Header Info */}
      <div style={{ textAlign: "center", width: "100%", padding: "0 5%", marginBottom: "20px" }}>
        <SectionHeader eyebrow="WHAT WE DO" headline="14 Premium Services. One Royal Team." />
        <p className="text-body" style={{ maxWidth: "600px", margin: "20px auto 0 auto", fontSize: "15px" }}>
          Every event is a unique masterpiece. Explore our core specialized specialities. Click any chip on the left to expand its live layout details.
        </p>
      </div>

      <div className="services-carousel-box">
        {/* Left Side Chips Scrolling Panel */}
        <div className="services-chips-panel">
          {!isMobileLayout && <div className="services-panel-fade-top" />}
          {!isMobileLayout && <div className="services-panel-fade-bottom" />}
          
          <div className="services-chips-viewport">
            {isMobileLayout ? (
              // MOBILE HORIZONTAL RAIL LAYOUT
              <div className="services-chips-mobile-rail">
                {SERVICES_DATA.map((feature, index) => {
                  const isActive = index === currentIndex;
                  const Icon = feature.icon;
                  return (
                    <button
                      key={feature.id}
                      onClick={() => handleChipClick(index)}
                      className={`services-chip-btn ${isActive ? "active" : ""}`}
                      style={{ width: "auto", flexShrink: 0 }}
                    >
                      <div className="services-chip-icon">
                        <Icon size={14} />
                      </div>
                      <span className="services-chip-label" style={{ fontSize: "10px" }}>
                        {feature.label.split(" ")[0]} {/* Shorten for mobile layout fit */}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              // DESKTOP VERTICAL WHEEL LAYOUT
              SERVICES_DATA.map((feature, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(
                  -(SERVICES_DATA.length / 2),
                  SERVICES_DATA.length / 2,
                  distance
                );

                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.id}
                    style={{
                      height: ITEM_HEIGHT,
                      width: "100%",
                      position: "absolute",
                      left: 0,
                    }}
                    animate={{
                      y: wrappedDistance * ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrappedDistance) * 0.28,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 22,
                      mass: 1,
                    }}
                    className="flex items-center justify-start lg:justify-center"
                  >
                    <button
                      onClick={() => handleChipClick(index)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className={`services-chip-btn ${isActive ? "active" : ""}`}
                    >
                      <div className="services-chip-icon">
                        <Icon size={16} />
                      </div>
                      <span className="services-chip-label">
                        {feature.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>


        {/* Right Side Stacked Parallax Previews */}
        <div className="services-cards-panel">
          <div className="services-cards-viewport">
            {SERVICES_DATA.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -120 : isNext ? 120 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                    rotate: isPrev ? -4 : isNext ? 4 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className={`services-deck-card ${isActive ? "active" : ""}`}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className="services-card-image"
                    style={{
                      filter: isActive ? "grayscale(0) blur(0px)" : "grayscale(0.6) blur(2px) brightness(0.65)"
                    }}
                  />

                  {/* Dynamic Info Panel at bottom */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="services-card-details"
                      >
                        <div className="services-card-index-tag">
                          {index + 1} • {feature.label}
                        </div>
                        <p className="services-card-description">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dynamic floating live tag */}
                  <div
                    className="services-live-badge"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.3s"
                    }}
                  >
                    <div className="services-live-dot" />
                    <span className="services-live-text">
                      LIVE SETUP
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
