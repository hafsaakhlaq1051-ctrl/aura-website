"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from "next/image";
// ── Constants ────────────────────────────────────────────────────────────────

import type { Variants } from "framer-motion";

const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // ✅ FIXED
    }
  }
};
const scaleVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const TAB_HREFS = {
  home: '#home',
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
    logo: "/Syed_Aura_Agency-Logo.png",
    link: "https://www.facebook.com/share/1DhyPbaHxd/"
  },
  {
    name: "Aura Edu",
    desc: "Premium Academic Consultancy, Advanced Research Support, and Tailored Educational Solutions for Excellence in Global Learning.",
    logo: "/Aura_Edu-Logo.png",
    link: "https://www.facebook.com/share/1CCSMMZJW6/"
  },
  {
    name: "Aura Framers",
    desc: "Curating Premium Wall Art and Bespoke Interior Decor that Merges Artistic Vision with Modern Elegance.",
    logo: "/Aura_framers-Logo.png",
    link: "https://www.facebook.com/share/1CaiuNWhSB/"
  }
];

const servicesData = [
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
  const [selectedItem, setSelectedItem] = useState<typeof differentiators[0] | null>(null);
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
    const sectionTabMap: Record<string, string> = {
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
            if (id in sectionTabMap) {
              setActiveTab(sectionTabMap[id]);
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
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full -z-10 animate-pulse" />

      {/* ── Navigation ── */}
      <nav className={`fixed top-0 w-full z-[100] backdrop-blur-md border-b border-white/[0.05] bg-black/60 transition-transform duration-500 ease-in-out ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 md:h-24 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform">
          <Image src="/Logo.png" alt="Aura Logo" width={120} height={40} />          
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.4em]">
            {Object.keys(TAB_HREFS).map((tab) => (
              <a key={tab} href={TAB_HREFS[tab as keyof typeof TAB_HREFS]} onClick={() => setActiveTab(tab)}
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

            <button
            className="md:hidden flex flex-col justify-center items-center gap-5[px] w-10 h-10 rounded-lg border border-white/10 bg-white/5"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            title="Toggle Menu"
            aria-expanded={menuOpen}
            >
          <span className="w-5 h-[2px] bg-white"></span>
          <span className="w-5 h-[2px] bg-white"></span>
          <span className="w-5 h-[2px] bg-white"></span>
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
              className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md border-t border-white/5"
            >
              <div className="flex flex-col items-center gap-6 py-8 text-[11px] font-bold uppercase tracking-[0.4em]">
                {Object.keys(TAB_HREFS).map((tab) => (
                  <a key={tab} href={TAB_HREFS[tab as keyof typeof TAB_HREFS]}
                    onClick={() => { setActiveTab(tab); setMenuOpen(false); }}
                    className={`transition-colors ${activeTab === tab ? 'text-purple-500' : 'text-gray-400 hover:text-white'}`}>
                    {tab}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="relative flex flex-col items-center justify-center min-h-screen pt-32 pb-10 px-6 text-center overflow-hidden">
        <motion.div initial="hidden" animate="visible" variants={fadeInVariant} className="max-w-7xl relative z-10 flex flex-col items-center text-center">
          <span className="text-purple-500 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.5em] mb-6">Sargodha's Digital Powerhouse</span>
          <h1 className="text-4xl md:text-[120px] font-black tracking-tight leading-tight md:leading-[0.9] uppercase bg-gradient-to-b from-white via-white to-purple-500/50 bg-clip-text text-transparent">
            Aura Group
          </h1>
          <div className="h-[1px] w-16 md:w-24 bg-purple-500/30 my-8 md:my-12" />
          <div className="space-y-4 mb-10 md:mb-16">
            <p className="text-gray-300 text-xs md:text-xl font-light tracking-wide uppercase">Innovation · Services · Excellence.</p>
            <p className="text-purple-400 font-medium text-[10px] md:text-lg uppercase tracking-wider">Empowering Brands · IT Hub · Creative Art</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center w-full max-w-xs md:max-w-none">
            <a href="#services" className="bg-white text-black px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-xl text-center">Explore Services</a>
            <a href="#startups" className="bg-white text-black px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-xl text-center">Our Ecosystem</a>
          </div>
        </motion.div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="border-t border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial="hidden"
               whileInView="visible"
               variants={fadeInVariant}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex flex-col items-center text-center gap-2">
                <span className="text-4xl md:text-6xl font-black bg-gradient-to-b from-white to-purple-400 bg-clip-text text-transparent tracking-tight">{stat.number}</span>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20 md:py-32 border-t border-white/5 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="md:sticky md:top-24">
            <h2 className="text-3xl md:text-7xl font-black tracking-tighter leading-tight uppercase">
              Your Partner for <br /><span className="text-purple-500 italic font-serif">Trust & Growth</span>
            </h2>
          </div>
          <div className="space-y-10">
            <p className="text-base md:text-xl font-normal text-gray-200 leading-relaxed tracking-wide text-justify">
              Aura Group of Companies is a dynamic and innovative business network committed to empowering businesses,
              education, and creative industries through modern digital solutions. Our diverse ecosystem specializes in providing cutting-edge IT services, creative digital art, and strategic branding solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10 text-[9px] uppercase tracking-[0.3em] text-gray-500">
              <div className="flex flex-col gap-1.5"><span className="text-purple-500 font-black text-base tracking-tighter uppercase">Syed Aura</span>Digital Scaling</div>
              <div className="flex flex-col gap-1.5"><span className="text-purple-500 font-black text-base tracking-tighter uppercase">Aura Edu</span>Global Learning</div>
              <div className="flex flex-col gap-1.5"><span className="text-purple-500 font-black text-base tracking-tighter uppercase">Aura Framers</span>Modern Elegance</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Aura ── */}
      <section id="why-choose-us" className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-t border-white/5">
        <div className="text-center mb-14">
          <span className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">Our Edge</span>
          <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">Why Choose Aura</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map((item, i) => (
            <motion.div key={item.id}
           initial="hidden"
           whileInView="visible"
           variants={fadeInVariant}
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
        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <span className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.6em] mb-4">Our Expertise</span>
          <h3 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-none">Core Services</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {servicesData.map((s, i) => (
            <motion.div key={s.id}
              initial="hidden" whileInView="visible" variants={fadeInVariant} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2.5rem] hover:bg-white/[0.07] transition-all duration-700 shadow-2xl hover:border-purple-500/40 flex flex-col h-full">
              <div className="w-full h-48 md:h-56 mb-8 overflow-hidden rounded-2xl border border-white/5">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-white group-hover:text-purple-400 transition-colors">{s.title}</h4>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light mb-8 flex-grow">{s.desc}</p>
              <Link href={`/services/${s.slug}`}
                className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-purple-500/60 group-hover:text-purple-400 transition-all hover:gap-3 duration-300">
                Service Details →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-lg"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-2xl rounded-[2.5rem] p-8 md:p-14 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-7 text-gray-400 hover:text-white text-lg">✕</button>
              <div className="text-5xl mb-6">{selectedItem.icon}</div>
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-8 text-white">{selectedItem.title}</h2>
              <div className="space-y-5 mb-10 border-l-2 border-purple-500/20 pl-6">
                {selectedItem.details.split('\n\n').map((para: string, i: number) => (
                  <p key={i} className="text-gray-300 text-sm md:text-base leading-relaxed font-light">{para}</p>
                ))}
              </div>
              <button onClick={() => setSelectedItem(null)} className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ecosystem ── */}
      <section id="startups" className="max-w-7xl mx-auto px-6 py-20 md:py-32 border-t border-white/5 relative">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">The Powerhouses</span>
          <h3 className="text-3xl md:text-7xl font-black tracking-tighter uppercase leading-none">OUR ECOSYSTEM</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-stretch">
          {startups.map((item, index) => (
            <motion.div key={item.name}
              initial="hidden" whileInView="visible" variants={scaleVariant} transition={{ delay: index * 0.1 }} viewport={{ once: true }}
              className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-700 flex flex-col h-full">
              <div className="h-16 md:h-24 w-full mb-10 flex items-start">
                <img src={item.logo} alt={item.name} className="h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-white group-hover:text-purple-400 transition-colors">{item.name}</h4>
              <p className="text-gray-400 text-xs md:text-sm mb-10 font-light leading-relaxed flex-grow">{item.desc}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-auto text-[10px] font-bold tracking-[0.2em] uppercase text-purple-500/60 group-hover:text-purple-500 transition-all">Explore More →</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 border-t border-white/5">
        <div className="mb-16 md:mb-24 text-center">
          <span className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">Client Stories</span>
          <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">What They Say</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial="hidden" whileInView="visible" variants={fadeInVariant} transition={{ delay: i * 0.15 }} viewport={{ once: true }}
              className="group bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-10 hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-500 flex flex-col">
              <span className="text-7xl font-black text-purple-500/20 leading-none mb-4 select-none italic">"</span>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed flex-grow mb-8 italic">{t.quote}</p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black text-sm">{t.initial}</div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-20 md:py-32 border-t border-white/5">
        <div className="relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 p-10 md:p-24 rounded-[3.5rem] text-center backdrop-blur-xl shadow-2xl">
          <h2 className="text-3xl md:text-7xl font-black mb-12 tracking-tighter uppercase text-white">Let's build your <br /> digital legacy.</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5">
            <a href="mailto:aura.group.ofcompanies.official@gmail.com" className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-purple-600 hover:text-white transition-all text-center w-full md:w-auto shadow-2xl">Email Inquiry</a>
            <a href="https://wa.me/923097819011" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-green-600 hover:text-white transition-all text-center w-full md:w-auto shadow-2xl">WhatsApp Chat</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
<footer className="bg-black border-t border-white/5 pt-20 pb-10">
<div className="max-w-7xl mx-auto px-6 md:px-8">
{/* Top Grid */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-10 mb-20">

  {/* Brand */}
  <div>
    <img src="/Logo.png" alt="Aura Group Logo" className="h-12 mb-6 opacity-90" />
    <p className="text-gray-500 text-sm leading-relaxed mb-6">
      Building brands, empowering education, and scaling digital businesses with innovation and precision.
    </p>

    {/* Socials */}
    <div className="flex gap-3">
      <a href="https://www.facebook.com/share/1EeuDi4LKY/" target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#1877F2] transition-all">
        FB
      </a>
      <a href="https://www.instagram.com/aura.group.of.companies" target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#E4405F] transition-all">
        IG
      </a>
    </div>
  </div>

  {/* Navigation */}
  <div>
    <h4 className="text-white text-[11px] font-black uppercase mb-8 tracking-widest">Navigation</h4>
    <ul className="space-y-4 text-gray-500 text-xs uppercase tracking-widest">
      <li><a href="#home" className="hover:text-purple-500 transition-colors">Home</a></li>
      <li><a href="#about" className="hover:text-purple-500 transition-colors">About</a></li>
      <li><a href="#services" className="hover:text-purple-500 transition-colors">Services</a></li>
      <li><a href="#startups" className="hover:text-purple-500 transition-colors">Ecosystem</a></li>
    </ul>
  </div>

  {/* Services */}
  <div>
    <h4 className="text-white text-[11px] font-black uppercase mb-8 tracking-widest">Services</h4>
    <ul className="space-y-4 text-gray-500 text-xs uppercase tracking-widest">
      <li><a href="/services/digital-marketing" className="hover:text-purple-500">Digital Marketing</a></li>
      <li><a href="/services/branding-design" className="hover:text-purple-500">Branding</a></li>
      <li><a href="/services/ecommerce-management" className="hover:text-purple-500">E-commerce</a></li>
      <li><a href="/services/ai-automation" className="hover:text-purple-500">AI Automation</a></li>
    </ul>
  </div>

  {/* Contact */}
  <div>
    <h4 className="text-white text-[11px] font-black uppercase mb-8 tracking-widest">Contact</h4>
    <div className="space-y-4 text-gray-500 text-xs">
      <p>📍 Sargodha, Punjab, Pakistan</p>
      <p>📞 +92 309 7819011</p>
      <p>✉️ aura.group.ofcompanies.official@gmail.com</p>
    </div>

    {/* CTA */}
    <a href="https://wa.me/923097819011" target="_blank" rel="noopener noreferrer"
      className="inline-block mt-6 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">
      WhatsApp Us →
    </a>
  </div>

</div>

{/* Bottom Bar */}
<div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 text-[10px] uppercase tracking-[0.3em]">
  <p>© 2026 Aura Group</p>
  <p className="opacity-50">Innovation · Services · Excellence</p>
</div>
  </div>
      </footer>
    </main>
  );
}
