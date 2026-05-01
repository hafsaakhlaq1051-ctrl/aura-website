"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ── Constants ────────────────────────────────────────────────────────────────

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const TAB_HREFS = {
  home: '#',
  'about us': '#about',
  'why us': '#why-choose-us',
  services: '#services',
  startups: '#startups',
};

const SECTION_IDS = ['home', 'about', 'why-choose-us', 'services', 'startups'];

// ── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { number: "50+",  label: "Clients Served" },
  { number: "3",    label: "Specialized Divisions" },
  { number: "100%", label: "Client Satisfaction" },
  { number: "5+",   label: "Years of Expertise" },
];

// ✅ FIX: Added full `details` field so modal has real content to show
const differentiators = [
  {
    id: "multi-domain",
    icon: "⚡",
    title: "Multi-Domain Expertise",
    desc: "One group, three powerhouse divisions covering digital marketing, education, and creative arts.",
    details: `Aura Group functions as a fully integrated, diversified ecosystem — not a collection of isolated services. We bridge the gap between three distinct but complementary worlds: creative brand building, academic excellence, and digital business scaling.\n\nSyed Aura Agency handles your entire digital presence — from strategy and content to paid ads and automation. Aura Edu ensures that students, researchers, and professionals have a world-class academic partner in their corner. Aura Framers brings premium visual identity into your physical and digital spaces.\n\nWhat makes this powerful is the synergy. A business client can get their brand designed, their store managed, their team trained, and their space decorated — all under one trusted umbrella. No fragmented vendors. No inconsistent quality. One vision, three powerhouses delivering it.`,
  },
  {
    id: "roi-first",
    icon: "🎯",
    title: "ROI-First Approach",
    desc: "Every strategy is built around measurable, real-world results — not vanity metrics.",
    details: `At Aura, we don't chase likes, followers, or impressions for their own sake. Our philosophy is rooted in a single question: does this produce real, measurable growth for you?\n\nEvery marketing campaign we design is engineered around conversion rates, cost-per-acquisition, and revenue impact. Every automation workflow we build is measured by time saved and leads generated. Every academic service we offer is evaluated by student outcomes and satisfaction.\n\nThis means our strategies are constantly refined based on data. We audit performance weekly, identify what's working, cut what isn't, and double down on what drives results. Our clients don't just see activity — they see growth they can measure in their bank accounts and business metrics. That's the Aura standard.`,
  },
  {
    id: "local-roots",
    icon: "🤝",
    title: "Local Roots, Global Reach",
    desc: "Proudly based in Sargodha, delivering professional services to clients worldwide.",
    details: `Innovation has no geography. While Aura Group is proudly headquartered in Sargodha, our work reaches clients in the UK, USA, UAE, and beyond. We manage high-ticket international e-commerce stores, provide academic consultancy to students at global universities, and create brand identities for businesses operating in competitive global markets.\n\nThis combination — local understanding with global execution — gives our clients a rare advantage. We understand Pakistani market dynamics deeply, while simultaneously being equipped with the tools, technology, and strategic frameworks used by agencies in London and New York.\n\nOur team is built on merit, not geography. The talent we attract from Sargodha and across Pakistan is world-class, and we're proving it one client success story at a time.`,
  },
];

const startups = [
  {
    name: "Syed Aura Agency",
    desc: "Strategic Brand Scaling, High-Conversion Content Production, and Performance-Driven Digital Marketing for Global Growth.",
    logo: "/Syed_Aura_Agency Logo.png",
    link: "https://www.facebook.com/share/1DhyPbaHxd/"
  },
  {
    name: "Aura Edu",
    desc: "Premium Academic Consultancy, Advanced Research Support, and Tailored Educational Solutions for Excellence in Global Learning.",
    logo: "/Aura_Edu Logo.png",
    link: "https://www.facebook.com/share/1CCSMMZJW6/"
  },
  {
    name: "Aura Framers",
    desc: "Curating Premium Wall Art and Bespoke Interior Decor that Merges Artistic Vision with Modern Elegance.",
    logo: "/Aura_framers Logo.png",
    link: "https://www.facebook.com/share/1CaiuNWhSB/"
  }
];

// ✅ FIX: slug-based routing (not id-based) — matches /services/[slug] file structure
const services = [
  {
    id: "01",
    slug: "digital-marketing",
    title: "Digital Marketing",
    desc: "Build a brand, not just content. Performance marketing for exponential brand ROI.",
    image: "/marketing.jpg",
  },
  {
    id: "02",
    slug: "branding-design",
    title: "Branding & Design",
    desc: "Crafting iconic visual identities. From logos to complete premium brand aesthetics.",
    image: "/branding.jpg",
  },
  {
    id: "03",
    slug: "academic-support",
    title: "Academic Support",
    desc: "Your complete academic success partner. Learn, Grow, and Succeed with expert guidance.",
    image: "/academic.jpg",
  },
  {
    id: "04",
    slug: "ecommerce-management",
    title: "E-commerce Management",
    desc: "Your all-in-one growth system for Shopify, eBay, and TikTok Shop management.",
    image: "/ecommerce.jpg",
  },
  {
    id: "05",
    slug: "it-expertise",
    title: "IT & Web Solutions",
    desc: "Architecting future-ready digital ecosystems and high-performance web systems.",
    image: "/it-solutions.jpg",
  },
  {
    id: "06",
    slug: "ai-automation",
    title: "AI & Automation",
    desc: "Smart growth with AI. Custom chatbots, YouTube automation, and intelligent workflows.",
    image: "/web-dev.jpg",
  }
];

const testimonials = [
  {
    quote: "Aura Group completely transformed our brand presence online. Professional, creative, and results-driven — exactly what we needed.",
    name: "Ahmed Raza",
    role: "CEO, TechVentures PK",
    initial: "A"
  },
  {
    // ✅ FIX: Closed the unclosed string that caused a syntax error
    quote: "Aura Edu helped me achieve my academic goals with expert guidance. Their support was personalised and truly impactful.",
    name: "Fatima Malik",
    role: "Graduate Student, UK",
    initial: "F"
  },
  {
    quote: "The Aura Framers team curated beautiful artwork for our office. Every piece was perfectly matched to our space.",
    name: "Usman Sheikh",
    role: "Director, Sheikh Interiors",
    initial: "U"
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab]       = useState('home');
  const [showNav, setShowNav]           = useState(true);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const lastScrollY                     = useRef(0);

  // Navbar hide/show
  useEffect(() => {
    const controlNavbar = () => {
      const currentY = window.scrollY;
      setShowNav(currentY <= lastScrollY.current || currentY <= 150);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const closeMenu = () => { if (menuOpen) setMenuOpen(false); };
    window.addEventListener('scroll', closeMenu, { passive: true });
    return () => window.removeEventListener('scroll', closeMenu);
  }, [menuOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedItem]);

  // IntersectionObserver for active nav tab
  useEffect(() => {
    const sectionTabMap = {
      home: 'home', 
      about: 'about us',
      'why-choose-us': 'why us', 
      services: 'services', 
      startups: 'startups',
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            // ✅ FIX: Checking if ID exists in our map to satisfy TypeScript
            if (id in sectionTabMap) {
              setActiveTab(sectionTabMap[id as keyof typeof sectionTabMap]);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-purple-500/30 font-sans scroll-smooth overflow-x-hidden">

      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full -z-10" style={{ animation: 'pulse 6s ease-in-out infinite' }} />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full -z-10" style={{ animation: 'pulse 8s ease-in-out infinite' }} />

      {/* ── Navigation ── */}
      <nav className={`fixed top-0 w-full z-[100] backdrop-blur-md border-b border-white/[0.05] bg-black/60 transition-transform duration-500 ease-in-out ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 md:h-24 flex items-center justify-between">

          <a href="#" className="flex items-center gap-3 active:scale-95 transition-transform">
            <img src="/Logo.png" alt="Aura Group Logo" className="h-10 md:h-14 w-auto drop-shadow-[0_0_8px_rgba(168,85,247,0.2)]" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.4em]">
            {Object.keys(TAB_HREFS).map((tab) => (
              <a key={tab} href={TAB_HREFS[tab]} onClick={() => setActiveTab(tab)}
                className={`relative py-2 transition-all duration-300 group ${activeTab === tab ? 'text-purple-500' : 'text-gray-400 hover:text-white'}`}>
                {tab}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-purple-500 transition-all duration-300 ${activeTab === tab ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact"
              className="hidden md:block bg-purple-600 hover:bg-purple-500 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-purple-500/20">
              Get in Touch
            </a>

            {/* ✅ RESTORED: Mobile hamburger menu */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-lg border border-white/10 bg-white/5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md border-t border-white/5"
            >
              <div className="flex flex-col items-center gap-6 py-8 text-[11px] font-bold uppercase tracking-[0.4em]">
                {Object.keys(TAB_HREFS).map((tab) => (
                  <a key={tab} href={TAB_HREFS[tab]}
                    onClick={() => { setActiveTab(tab); setMenuOpen(false); }}
                    className={`transition-colors ${activeTab === tab ? 'text-purple-500' : 'text-gray-400 hover:text-white'}`}>
                    {tab}
                  </a>
                ))}
                <a href="#contact" onClick={() => setMenuOpen(false)}
                  className="mt-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all">
                  Get in Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="relative flex flex-col items-center justify-center min-h-screen pt-32 pb-10 px-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] bg-purple-600/[0.05] blur-[120px] rounded-full pointer-events-none" />
        <motion.div initial="hidden" animate="visible" variants={fadeInVariant} className="max-w-7xl relative z-10 flex flex-col items-center">
          <span className="text-purple-500 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.5em] mb-6">Sargodha's Digital Powerhouse</span>
          <h1 className="text-4xl md:text-[120px] font-black tracking-tight leading-tight md:leading-[0.9] uppercase bg-gradient-to-b from-white via-white to-purple-500/50 bg-clip-text text-transparent" style={{ overflowWrap: 'anywhere' }}>
            Aura Group
          </h1>
          <div className="h-[1px] w-16 md:w-24 bg-purple-500/30 my-8 md:my-12" />
          <div className="space-y-4 mb-10 md:mb-16">
            <p className="text-gray-300 text-xs md:text-xl font-light tracking-wide uppercase">Innovation · Services · Excellence.</p>
            <p className="text-purple-400 font-medium text-[10px] md:text-lg uppercase tracking-wider">Empowering Brands · IT Hub · Creative Art</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center w-full max-w-xs md:max-w-none">
            <a href="#services" className="bg-white text-black px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-xl">Explore Services</a>
            <a href="#startups" className="bg-white text-black px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-xl">Our Ecosystem</a>
          </div>
        </motion.div>
      </section>

      {/* ── Stats Strip ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInVariant}
        className="border-t border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-2">
                <span className="text-4xl md:text-6xl font-black bg-gradient-to-b from-white to-purple-400 bg-clip-text text-transparent tracking-tight">{stat.number}</span>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── About ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInVariant}
        id="about" className="max-w-7xl mx-auto px-6 py-20 md:py-32 border-t border-white/5 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="md:sticky md:top-24">
            <h2 className="text-3xl md:text-7xl font-black tracking-tighter leading-tight uppercase">
              Your Partner for <br /><span className="text-purple-500 italic font-serif">Trust & Growth</span>
            </h2>
          </div>
          <div className="space-y-10">
            <p className="text-base md:text-xl font-normal text-gray-200 leading-relaxed tracking-wide text-justify">
              Aura Group of Companies is a dynamic and innovative business network committed to empowering businesses,
              education, and creative industries through modern digital solutions and impactful services.
              With a vision to support growth in the digital era, the group focuses on providing professional services
              that help individuals, startups, and organizations build a strong presence both online and offline.
              Through innovation, creativity, and commitment to excellence, Aura Group aims to deliver impactful
              services that help businesses and individuals grow in the modern world.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10 text-[9px] uppercase tracking-[0.3em] text-gray-500">
              <div className="flex flex-col gap-1.5"><span className="text-purple-500 font-black text-base tracking-tighter uppercase">Syed Aura</span>Digital Scaling</div>
              <div className="flex flex-col gap-1.5"><span className="text-purple-500 font-black text-base tracking-tighter uppercase">Aura Edu</span>Global Learning</div>
              <div className="flex flex-col gap-1.5"><span className="text-purple-500 font-black text-base tracking-tighter uppercase">Aura Framers</span>Modern Elegance</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Why Choose Aura ── */}
      <section id="why-choose-us" className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-t border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant} className="text-center mb-14">
          <span className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">Our Edge</span>
          <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">Why Choose Aura</h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-500">
              <div className="text-4xl mb-6">{item.icon}</div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.desc}</p>
              <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Learn More →</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20 md:py-32 border-t border-white/5 relative overflow-hidden">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant}
          className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <span className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.6em] mb-4">Our Expertise</span>
          <h3 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-none">Core Services</h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {services.map((s, i) => (
            <motion.div key={s.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2.5rem] hover:bg-white/[0.07] transition-all duration-700 shadow-2xl hover:border-purple-500/40 flex flex-col h-full">
              <div className="w-full h-48 md:h-56 mb-8 overflow-hidden rounded-2xl border border-white/5">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-700" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-white group-hover:text-purple-400 transition-colors">{s.title}</h4>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light mb-8 flex-grow">{s.desc}</p>
              {/* ✅ FIX: Correct slug-based routing */}
              <Link href={`/services/${s.slug}`}
                className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-purple-500/60 group-hover:text-purple-400 transition-all hover:gap-3 duration-300">
                Service Details →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── "Why Choose Us" Detail Modal ── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-lg"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 24, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-2xl rounded-[2.5rem] p-8 md:p-14 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Close"
                className="absolute top-6 right-7 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-lg font-light border border-white/10"
              >
                ✕
              </button>

              {/* Icon */}
              <div className="text-5xl mb-6">{selectedItem.icon}</div>

              <span className="text-purple-500 text-[9px] font-bold uppercase tracking-[0.6em] mb-4 block">Aura Edge</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-8 leading-tight tracking-tighter text-white">
                {selectedItem.title}
              </h2>

              {/* ✅ FIX: Renders multi-paragraph details properly */}
              <div className="space-y-5 mb-10 border-l-2 border-purple-500/20 pl-6">
                {selectedItem.details.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                    {para}
                  </p>
                ))}
              </div>

              {/* ✅ FIX: Only "Close" button — "Partner With Us" removed */}
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ecosystem ── */}
      <section id="startups" className="max-w-7xl mx-auto px-6 py-20 md:py-32 border-t border-white/5 relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant} className="text-center mb-16 md:mb-24">
          <span className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">The Powerhouses</span>
          <h3 className="text-3xl md:text-7xl font-black tracking-tighter uppercase leading-none">OUR ECOSYSTEM</h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-stretch">
          {startups.map((item, index) => (
            <motion.div key={item.name}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}
              className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-700 flex flex-col h-full">
              <div className="h-16 md:h-24 w-full mb-10 flex items-start">
                <img src={item.logo} alt={`${item.name} logo`} className="h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-white group-hover:text-purple-400 transition-colors">{item.name}</h4>
              <p className="text-gray-400 text-xs md:text-sm mb-10 font-light leading-relaxed flex-grow">{item.desc}</p>
              {/* ✅ FIX: rel="noopener noreferrer" added */}
              <a href={item.link} target="_blank" rel="noopener noreferrer"
                aria-label={`Explore ${item.name} on WhatsApp`}
                className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-purple-500/60 group-hover:text-purple-500 transition-all hover:gap-3 duration-300">
                Explore More →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInVariant}
        className="max-w-7xl mx-auto px-6 py-20 md:py-32 border-t border-white/5">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">Client Stories</span>
          <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">What They Say</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }}
              className="group bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-10 hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-500 flex flex-col">
              <span className="text-7xl font-black text-purple-500/20 leading-none mb-4 select-none" aria-hidden="true">"</span>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed flex-grow mb-8 italic">{t.quote}</p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black text-sm flex-shrink-0" aria-hidden="true">{t.initial}</div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Contact ── */}
      <motion.section id="contact"
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-20 md:py-32 border-t border-white/5">
        <div className="relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 p-10 md:p-24 rounded-[3.5rem] text-center overflow-hidden backdrop-blur-xl shadow-2xl">
          {/* Animated Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
          
          <div className="relative z-10">
            <span className="text-purple-500 text-[10px] font-black uppercase tracking-[0.6em] mb-6 block opacity-80">Start a Conversation</span>
            <h2 className="text-3xl md:text-7xl font-black mb-12 tracking-tighter uppercase leading-[1.1] text-white">
              Let's build your <br className="hidden md:block" /> digital legacy.
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
              <a href="mailto:aura.group.ofcompanies.official@gmail.com"
                className="group w-full md:w-auto bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl">
                <span className="text-lg group-hover:scale-110 transition-transform">✉</span>
                Email Inquiry
              </a>
              <a href="https://wa.me/923097819011" target="_blank" rel="noopener noreferrer"
                className="group w-full md:w-auto bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-green-600 hover:border-green-600 transition-all duration-500 flex items-center justify-center gap-3">
                <span className="text-lg group-hover:scale-110 transition-transform">WhatsApp</span>
                Direct Chat
              </a>
            </div>

            <div className="mt-16 pt-10 border-t border-white/5 flex flex-col items-center gap-4">
               <p className="text-gray-500 text-[9px] uppercase tracking-[0.4em] font-medium">Official Correspondence</p>
               <span className="text-purple-400/80 text-xs md:text-sm font-light tracking-wider hover:text-purple-400 transition-colors cursor-pointer selection:bg-purple-500/30">
                 aura.group.ofcompanies.official@gmail.com
               </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Professional Multi-Column Footer ── */}
      <footer className="bg-black border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
            
            {/* Column 1: Brand Social Links Update */}
<div className="flex gap-4">
  {/* Facebook Icon */}
  <a href="https://www.facebook.com/share/1EeuDi4LKY/" target="_blank" rel="noopener noreferrer" 
     className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all group"
     aria-label="Facebook">
    <svg className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>

  {/* Instagram Icon */}
  <a href="https://www.instagram.com/aura.group.of.companies" target="_blank" rel="noopener noreferrer" 
     className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E4405F] hover:border-[#E4405F] transition-all group"
     aria-label="Instagram">
    <svg className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  </a>
</div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8">Navigation</h4>
              <ul className="space-y-4 text-gray-500 text-xs font-medium uppercase tracking-widest">
                <li><a href="#home" className="hover:text-purple-500 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-purple-500 transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-purple-500 transition-colors">Services</a></li>
                <li><a href="#startups" className="hover:text-purple-500 transition-colors">Ecosystem</a></li>
              </ul>
            </div>

            {/* Column 3: Divisions */}
            <div>
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8">Divisions</h4>
              <ul className="space-y-4 text-gray-500 text-xs font-medium uppercase tracking-widest">
                <li className="hover:text-white transition-colors cursor-default">Syed Aura Agency</li>
                <li className="hover:text-white transition-colors cursor-default">Aura Edu</li>
                <li className="hover:text-white transition-colors cursor-default">Aura Framers</li>
              </ul>
            </div>

            {/* Column 4: Location */}
            <div>
              <h4 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8">Contact</h4>
              <ul className="space-y-4 text-gray-500 text-xs leading-relaxed tracking-wider">
                <li className="flex gap-3">
                  <span className="text-purple-500">📍</span>
                  Sargodha, Punjab, Pakistan
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-500">📞</span>
                  +92 309 7819011
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 text-[9px] tracking-[0.4em] uppercase font-bold">
              © 2026 Aura Group · Innovation · Excellence
            </p>
            <div className="flex gap-8 text-[8px] tracking-[0.3em] uppercase font-black text-gray-600">
              <span className="hover:text-purple-500 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-purple-500 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}