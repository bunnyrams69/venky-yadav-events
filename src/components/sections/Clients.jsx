import React, { useState, useEffect, useRef, cloneElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
import SectionHeader from "../ui/SectionHeader.jsx";
import "../../assets/styles/clients.css";

// ===== Utilities =====
const cn = (...inputs) => inputs.filter(Boolean).join(" ");

// ===== Custom Hook for Outside Clicks =====
const useOutsideClick = (ref, onOutsideClick) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      onOutsideClick();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

// ===== Carousel Component =====
export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? 290 : 340;
      const gap = 16;
      const scrollPosition = (cardWidth + gap) * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      // Slight delay to allow layout to settle before checking scrollability
      setTimeout(checkScrollability, 100);
    }
    
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [initialScroll]);

  return (
    <div className="clients-carousel-container">
      <div
        className="clients-scroll-track"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="clients-cards-flex">
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.15 * index,
                  ease: "easeOut"
                },
              }}
              viewport={{ once: true }}
              key={`card-${index}`}
              className="clients-card-wrapper"
            >
              {cloneElement(item, {
                onCardClose: () => handleCardClose(index),
              })}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="clients-carousel-controls">
        <button
          className="clients-control-btn"
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          className="clients-control-btn"
          onClick={handleScrollRight}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// ===== Profile Image Component =====
export const ProfileImage = ({ src, alt, ...rest }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="clients-profile-wrapper">
      <img
        className={cn(
          "clients-profile-img",
          isLoading ? "blur-sm" : "blur-0"
        )}
        onLoad={() => setLoading(false)}
        src={src}
        loading="lazy"
        alt={alt || "Profile image"}
        {...rest}
      />
    </div>
  );
};

// ===== Testimonial Card Component =====
export const TestimonialCard = ({
  testimonial,
  index,
  layout = true,
  onCardClose = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1686806372726-388d03ff49c8?q=80&w=3087&auto=format&fit=crop",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  const handleExpand = () => setIsExpanded(true);
  
  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleCollapse();
      }
    };

    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" });
    }

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <div className="clients-dialog-overlay-wrapper">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="clients-dialog-backdrop"
              onClick={handleCollapse}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              ref={containerRef}
              layoutId={layout ? `card-${testimonial.name}` : undefined}
              className="clients-dialog-card"
            >
              <button
                className="clients-dialog-close-btn"
                onClick={handleCollapse}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
              
              <motion.p
                layoutId={layout ? `category-${testimonial.name}` : undefined}
                className="clients-dialog-designation"
              >
                {testimonial.designation}
              </motion.p>
              
              <motion.p
                layoutId={layout ? `title-${testimonial.name}` : undefined}
                className="clients-dialog-name"
              >
                {testimonial.name}
              </motion.p>
              
              <div className="clients-dialog-quote-box">
                <Quote size={28} className="clients-dialog-quote-icon" />
                <span>{testimonial.description}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${testimonial.name}` : undefined}
        onClick={handleExpand}
        className="clients-card-btn-wrapper"
        whileHover={{
          rotateZ: index % 2 === 0 ? 1 : -1,
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <div className="clients-card-inner">
          <div className="clients-card-bg-overlay">
            <img
              src={backgroundImage}
              alt="Background texture"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          
          <ProfileImage src={testimonial.profileImage} alt={testimonial.name} />
          
          <motion.p
            layoutId={layout ? `title-${testimonial.name}` : undefined}
            className="clients-card-quote"
          >
            {testimonial.description.length > 110
              ? `“${testimonial.description.slice(0, 110)}...”`
              : `“${testimonial.description}”`}
          </motion.p>
          
          <motion.p
            layoutId={layout ? `name-${testimonial.name}` : undefined}
            className="clients-card-name"
          >
            {testimonial.name}
          </motion.p>
          
          <motion.p
            layoutId={layout ? `category-${testimonial.name}` : undefined}
            className="clients-card-designation"
          >
            {testimonial.designation}
          </motion.p>
        </div>
      </motion.button>
    </>
  );
};

// ===== Custom event testimonials data =====
const defaultTestimonials = [
  {
    name: "Priya R.",
    designation: "Host Mother (1st Birthday Event)",
    description: "The royal castle decoration for my son's first birthday was absolutely beyond imagination! Every detail was handcrafted, and parents couldn't stop asking for Venky's number.",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    backgroundImage: "/images/castle.jpg"
  },
  {
    name: "Kiran & Meghana",
    designation: "Newlyweds (Traditional Ceremony)",
    description: "Our wedding floral mandap was exactly the royal design we had pictured. The visual spacing, fresh marigold paths, and on-time coordination gave us a zero-stress wedding day.",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    backgroundImage: "/images/wedding.jpg"
  },
  {
    name: "Swetha D.",
    designation: "Parents-to-be (Baby Shower)",
    description: "Extremely beautiful balloon arches and pastel backdrops! The flower installations added such an elegant texture, making our photo setup look completely magical.",
    profileImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop",
    backgroundImage: "/images/balloons.jpg"
  },
  {
    name: "Ramesh K.",
    designation: "Homeowner (Gruhapravesam & Feast)",
    description: "Booked their catering and traditional housewarming setup together. The South Indian cuisine was legendary, and having one team handle everything made it perfect.",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    backgroundImage: "/images/catering.jpg"
  }
];

// ===== Main Clients Section Assembly =====
export default function Clients() {
  const carouselItems = defaultTestimonials.map((testimonial, index) => (
    <TestimonialCard
      key={`t-${index}`}
      testimonial={testimonial}
      index={index}
      backgroundImage={testimonial.backgroundImage}
    />
  ));

  return (
    <section id="clients" className="clients-section bg-dot-grid">
      <div style={{ padding: "0 5%" }}>
        <SectionHeader eyebrow="CLIENT STORIES" headline="Trust Built on Spectacular Celebrations" />
        <p className="text-body" style={{ textAlign: "center", maxWidth: "600px", margin: "20px auto 0 auto", fontSize: "15px" }}>
          Click any card below to expand and read full testimonials from the families and couples who trusted us with their most cherished milestones.
        </p>
      </div>

      <Carousel items={carouselItems} />
    </section>
  );
}
