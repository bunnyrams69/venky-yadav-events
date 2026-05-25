import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Utensils, Zap, Wind } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import '../../assets/styles/portfolio.css';

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState([]);
  
  // Custom high-fidelity portfolio data matching Venky Yadav Events actual verified assets
  const options = [
    {
      title: "Royal Birthdays",
      description: "Handcrafted theme castle decorations",
      image: "/images/castle.jpg",
      icon: <Sparkles size={20} />
    },
    {
      title: "Grand Weddings",
      description: "Luxurious mandaps & flower walkways",
      image: "/images/wedding.jpg",
      icon: <Heart size={20} />
    },
    {
      title: "Bespoke Catering",
      description: "Gourmet multi-cuisine culinary spreads",
      image: "/images/catering.jpg",
      icon: <Utensils size={20} />
    },
    {
      title: "Scenic Production",
      description: "Custom staging, sound & ambient lights",
      image: "/images/stage.jpg",
      icon: <Zap size={20} />
    },
    {
      title: "Balloon Paradise",
      description: "Charming themed balloon installations",
      image: "/images/balloons.jpg",
      icon: <Wind size={20} />
    }
  ];

  const handleOptionClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 150 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <section id="portfolio" className="portfolio-section bg-dot-grid"> 
      {/* Header Section */}
      <div style={{ textAlign: "center", width: "100%", padding: "0 5%" }}>
        <SectionHeader eyebrow="OUR WORK" headline="Setups That Stop Time." />
        <p className="text-body" style={{ maxWidth: "600px", margin: "20px auto 0 auto", fontSize: "15px" }}>
          Interactive Showcase: Click any card in the accordion deck below to expand it, view our actual verified event spaces, and explore our premium decorations.
        </p>
      </div>

      {/* Options Container */}
      <div className="portfolio-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`portfolio-option ${activeIndex === index ? 'active' : ''}`}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: 'hidden',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-40px)',
              flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Shadow effect overlay */}
            <div className="portfolio-option-shadow"></div>
            
            {/* Label with icon and info */}
            <div className="portfolio-option-label">
              <div className="portfolio-option-icon">
                {option.icon}
              </div>
              <div className="portfolio-option-info">
                <div className="portfolio-option-title">
                  {option.title}
                </div>
                <div className="portfolio-option-description">
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
