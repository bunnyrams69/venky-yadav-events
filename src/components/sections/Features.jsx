import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, Sparkles, Heart, Utensils } from "lucide-react";
import Badge from "../ui/Badge.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import "../../assets/styles/features.css";

// Premium timeline data representing Venky Yadav Events operational nodes
const defaultTimelineData = [
  {
    id: 1,
    title: "1. Creative Conception",
    date: "Phase 1: Setup",
    content: "Our design team creates 3D visual mockups, drafts themes, and curates bespoke color palettes tailored to your event story.",
    category: "Design",
    icon: Sparkles,
    relatedIds: [2, 5],
    status: "completed",
    energy: 98,
  },
  {
    id: 2,
    title: "2. Strategic Sourcing",
    date: "Phase 2: Prep",
    content: "We source pristine, high-end decor materials, premium structural fabrics, and align top-tier local artisans.",
    category: "Logistics",
    icon: Link,
    relatedIds: [1, 3],
    status: "completed",
    energy: 85,
  },
  {
    id: 3,
    title: "3. Gourmet Crafting",
    date: "Phase 3: Catering",
    content: "Our master chefs design exquisite South Indian & multi-cuisine menus prepared with locally-sourced ingredients.",
    category: "Catering",
    icon: Utensils,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 90,
  },
  {
    id: 4,
    title: "4. Audio-Visual Brilliance",
    date: "Phase 4: Production",
    content: "Full-range sound engineering, intelligent ambient lighting, and high-performance screens configured for immersive experience.",
    category: "Production",
    icon: Zap,
    relatedIds: [3, 5],
    status: "in-progress",
    energy: 78,
  },
  {
    id: 5,
    title: "5. The Grand Showcase",
    date: "Phase 5: Showday",
    content: "Flawless on-site operational coordination, guest welcoming, and complete event execution under seasoned directors.",
    category: "Execution",
    icon: Heart,
    relatedIds: [1, 4],
    status: "pending",
    energy: 40,
  }
];

export default function Features({ timelineData = defaultTimelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [viewMode, setViewMode] = useState("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState(null);
  
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    // Smoothly transition rotation angle to keep target node in focus
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    
    // Dynamically adjust radius for mobile screen sizes
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    const radius = isMobile ? 140 : 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  return (
    <section id="features" className="orbital-container section bg-dot-grid" ref={containerRef} onClick={handleContainerClick}>
      <SectionHeader eyebrow="HOW WE WORK" headline="The Radial Orbital Operation Timeline" />
      
      <p className="text-body" style={{ textAlign: "center", maxWidth: "600px", margin: "-30px auto 40px", fontSize: "14px" }}>
        Interactive Node System: Click any floating operation node below to explore its details, connection streams, and real-time phase completion status.
      </p>

      <div className="orbital-wrapper">
        <div
          className="orbital-view"
          ref={orbitRef}
          style={{
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Orbital Glowing Center */}
          <div className="orbital-center">
            <div className="orbital-ping-1"></div>
            <div className="orbital-ping-2"></div>
            <div className="orbital-center-core"></div>
          </div>

          {/* Orbital Dashed Ring */}
          <div className="orbital-ring"></div>
          <div className="orbital-ring-outer"></div>

          {/* Timeline Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className={`orbital-node ${isExpanded ? "active" : ""} ${isRelated ? "related" : ""}`}
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Custom Pulsing Energy Level glow */}
                <div
                  className="orbital-node-pulse"
                  style={{
                    width: `${item.energy * 0.4 + 40}px`,
                    height: `${item.energy * 0.4 + 40}px`,
                    display: isPulsing ? "block" : "none"
                  }}
                ></div>

                {/* Node Icon */}
                <div className="orbital-node-icon">
                  <Icon size={16} />
                </div>

                {/* Node Title */}
                <div className="orbital-node-title">
                  {item.title}
                </div>

                {/* Node Expansion Details Card */}
                {isExpanded && (
                  <Card className="orbital-detail-card">
                    <div className="orbital-detail-line"></div>
                    <CardHeader style={{ paddingBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Badge>
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", opacity: 0.6 }}>
                          {item.date}
                        </span>
                      </div>
                      <CardTitle style={{ marginTop: "10px", fontSize: "15px" }}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p style={{ margin: 0, fontSize: "12px", color: "rgba(245, 239, 224, 0.8)", lineHeight: "1.5" }}>
                        {item.content}
                      </p>

                      {/* Energy Level Indicator */}
                      <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "6px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Zap size={10} color="var(--gold-primary)" />
                            Focus Level
                          </span>
                          <span style={{ fontFamily: "var(--font-mono)", color: "var(--gold-primary)" }}>{item.energy}%</span>
                        </div>
                        <div className="energy-bar-container">
                          <div
                            className="energy-bar-fill"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Connected Nodes Links */}
                      {item.relatedIds.length > 0 && (
                        <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                          <div className="connected-nodes-title">
                            <Link size={10} />
                            Connected Phases
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <button
                                  key={relatedId}
                                  className="connected-node-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title.split(". ")[1] || `Phase ${relatedId}`}
                                  <ArrowRight size={8} />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
