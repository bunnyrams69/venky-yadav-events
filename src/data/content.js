// ════════════════════════════════════════════════
// VENKY YADAV EVENTS — CONTENT DATA
// ════════════════════════════════════════════════

export const services = [
  { id: 's1', title: 'Birthday Decorations', desc: 'Castle themes, superhero setups, and more.', size: 'large', icon: 'Cake' },
  { id: 's2', title: 'Wedding Decoration', desc: 'Grand floral mandaps and entry walkways.', size: 'medium', icon: 'Heart' },
  { id: 's3', title: 'Catering Services', desc: 'Authentic South Indian & multi-cuisine spreads.', size: 'small', icon: 'Utensils' },
  { id: 's4', title: 'Reception Setup', desc: 'Elegant stage designs with modern lighting.', size: 'small', icon: 'PartyPopper' },
  { id: 's5', title: 'Photography', desc: 'Candid and traditional photo/video.', size: 'small', icon: 'Camera' },
  { id: 's6', title: 'Balloon Decoration', desc: '10ft tall themed balloon arches.', size: 'small', icon: 'Wind' },
  { id: 's7', title: 'Bridal Makeup', desc: 'Flawless traditional styling.', size: 'small', icon: 'Sparkles' },
  { id: 's8', title: 'Stage Decoration', desc: 'Custom structural builds for any event.', size: 'small', icon: 'Box' },
  { id: 's9', title: 'House Warming', desc: 'Traditional floral setups for Gruhapravesam.', size: 'small', icon: 'Home' },
  { id: 's10', title: 'Baby Shower', desc: 'Pastel backdrops and floral arrangements.', size: 'small', icon: 'Baby' },
  { id: 's11', title: 'Corporate Events', desc: 'Professional stage and audio setups.', size: 'small', icon: 'Briefcase' },
  { id: 's12', title: 'Flower Decoration', desc: 'Fresh jasmine and marigold installations.', size: 'small', icon: 'Flower2' },
  { id: 's13', title: 'All Types of Events', desc: 'Custom planning for any celebration.', size: 'small', icon: 'CalendarCheck' },
  { id: 's14', title: 'Vendor Coordination', desc: 'We handle everything so you enjoy.', size: 'small', icon: 'Users' }
];

export const portfolioItems = [
  { id: 'p1', title: 'Royal Castle Setup', category: 'Birthday', image: '/images/castle.jpg' },
  { id: 'p2', title: 'Grand Wedding Mandap', category: 'Wedding', image: '/images/wedding.jpg' },
  { id: 'p3', title: 'Balloon Paradise', category: 'Decoration', image: '/images/balloons.jpg' },
  { id: 'p4', title: 'Multi-Cuisine Spread', category: 'Catering', image: '/images/catering.jpg' },
  { id: 'p5', title: 'Floral Elegance', category: 'Flowers', image: '/images/flowers.jpg' },
  { id: 'p6', title: 'Modern Reception', category: 'Reception', image: '/images/reception.jpg' },
  { id: 'p7', title: 'Royal Stage Design', category: 'Stage', image: '/images/stage.jpg' },
  { id: 'p8', title: 'Baby Shower Bliss', category: 'Baby Shower', image: '/images/baby.jpg' }
];

export const processSteps = [
  { step: '01', title: 'Consult', desc: 'Tell us your dream. We listen to every detail, theme preference, budget, and guest count.' },
  { step: '02', title: 'Plan', desc: 'Our team designs your setup, sources materials, and coordinates every vendor.' },
  { step: '03', title: 'Execute', desc: 'We arrive early, set up completely, and stay until your last guest leaves happy.' }
];

export const testimonials = [
  { name: 'Priya R.', event: 'Birthday Event', quote: "The castle setup for my son's 1st birthday was beyond imagination. Every parent at the party was asking for Venky's number." },
  { name: 'Kiran & Meghana', event: 'Wedding', quote: 'Our wedding stage was exactly what we dreamed. Professional team, on time, zero stress.' },
  { name: 'Swetha D.', event: 'Baby Shower', quote: 'The balloon arch for our baby shower was stunning. The photos came out so beautiful.' },
  { name: 'Ramesh K.', event: 'House Warming', quote: 'Catering was excellent, decoration was royal, photography was perfect. Booked everything together — so easy.' }
];

export const pricingPackages = [
  {
    id: 'silver',
    name: 'Silver',
    price: '₹25,000',
    tag: 'Starting at',
    highlight: false,
    features: [
      'Basic stage decoration',
      'Standard balloon arch',
      'LED lighting setup',
      'Theme backdrop',
      'Table centerpieces',
      '2 hours setup time'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    price: '₹65,000',
    tag: 'Most Popular',
    highlight: true,
    features: [
      'Premium stage decoration',
      'Custom balloon arch + garlands',
      'Advanced LED + fairy lights',
      'Custom theme backdrop',
      'Flower arrangements',
      'Photography coverage',
      'Catering (50 guests)',
      'Full day coordination'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: '₹1,50,000',
    tag: 'All Inclusive',
    highlight: false,
    features: [
      'Royal stage + mandap design',
      'Complete floral decoration',
      'Premium lighting + effects',
      'Multi-course catering (150 guests)',
      'Photo + video coverage',
      'Bridal makeup',
      'Vendor coordination',
      'Dedicated event manager',
      'Cleanup included'
    ]
  }
];

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Features', href: '#features' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Clients', href: '#clients' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' }
];
