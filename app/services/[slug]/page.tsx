"use client";

import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";

// ── Service Data ─────────────────────────────────────────────────────────────
// ✅ FIX: "Why Choose Us" entries removed — they don't belong in serviceData.
// ✅ FIX: slug-based keys to match /services/[slug] routing.
// ✅ FIX: Each service has rich description, detailed features with icons+desc, and a process array.

const serviceData = {

  "digital-marketing": {
    title: "Digital Marketing",
    subtitle: "Build a Brand. Not Just Content.",
    bg: "/marketing.jpg",
    badge: "Syed Aura Agency",
    waLink: "https://wa.me/923097819011?text=Hi%2C%20I'm%20interested%20in%20Digital%20Marketing%20services.",
    overview: `In today's digital-first world, visibility is everything. But visibility without strategy is just noise. At Syed Aura Agency, we don't just run ads — we build complete brand ecosystems that attract, convert, and retain customers at scale.\n\nOur approach is rooted in data. Before we spend a single rupee on advertising, we study your market, your competitors, and your ideal customer. We then craft a strategy that puts the right message in front of the right person at the right time — on Meta, Google, TikTok, and beyond.\n\nFrom startups launching their first product to established brands looking to scale globally, our performance marketing team has delivered measurable growth across every industry.`,
    features: [
      {
        icon: "📊",
        title: "Meta & Google Ads",
        desc: "Precision-targeted paid campaigns on Facebook, Instagram, and Google — engineered for maximum ROI and minimum wasted spend."
      },
      {
        icon: "🔍",
        title: "SEO Strategy",
        desc: "Long-term organic growth through keyword research, on-page optimization, and content strategies that rank and convert."
      },
      {
        icon: "🎬",
        title: "Content Production",
        desc: "High-conversion videos, reels, and written content that tells your brand story and drives action across all platforms."
      },
      {
        icon: "🎯",
        title: "Lead Generation",
        desc: "End-to-end lead funnels — from ad creative to landing page to follow-up sequence — that consistently fill your pipeline."
      },
      {
        icon: "📱",
        title: "Social Media Management",
        desc: "Strategic posting, community engagement, and brand voice consistency across Instagram, TikTok, LinkedIn, and more."
      },
      {
        icon: "📈",
        title: "Analytics & Reporting",
        desc: "Weekly performance dashboards that show you exactly what's working, what's not, and where to scale next."
      },
    ],
    process: [
      { title: "Discovery & Audit", desc: "We deep-dive into your brand, audience, competitors, and current digital footprint to identify gaps and opportunities." },
      { title: "Strategy Build", desc: "A custom 90-day growth roadmap is built — covering channels, budget allocation, content themes, and KPIs." },
      { title: "Launch & Execute", desc: "Campaigns go live with full creative assets, A/B testing frameworks, and real-time optimization." },
      { title: "Analyse & Scale", desc: "We review performance weekly, cut what doesn't work, and reinvest in what drives the best return." },
    ],
  },

  "branding-design": {
    title: "Branding & Design",
    subtitle: "Identities That Command Attention.",
    bg: "/branding.jpg",
    badge: "Syed Aura Agency",
    waLink: "https://wa.me/923097819011?text=Hi%2C%20I'm%20interested%20in%20Branding%20%26%20Design%20services.",
    overview: `Your brand is not your logo. It's the feeling someone gets when they interact with your business — the colors they see, the words they read, the trust they feel. A powerful brand doesn't just look good; it communicates who you are and why you matter.\n\nAt Aura, we approach branding with the precision of a strategist and the eye of an artist. We start with your story — your values, your audience, your ambition — and we build a visual identity that carries all of that with confidence into every touchpoint.\n\nFrom a local business establishing its first professional identity to a global startup launching into competitive markets, we've built brands that people remember, trust, and choose.`,
    features: [
      {
        icon: "✏️",
        title: "Logo Design",
        desc: "Original, versatile logo concepts developed through a structured creative process — from initial sketches to final production files."
      },
      {
        icon: "📋",
        title: "Brand Guidelines",
        desc: "A comprehensive brand book covering typography, color palette, tone of voice, logo usage, and visual rules for consistency."
      },
      {
        icon: "📱",
        title: "Social Media Kits",
        desc: "Ready-to-use post templates, story formats, highlight covers, and profile assets that keep your social presence polished."
      },
      {
        icon: "🎨",
        title: "Visual Identity System",
        desc: "Business cards, letterheads, email signatures, and all brand collateral aligned to a single cohesive aesthetic."
      },
      {
        icon: "🤖",
        title: "AI-Powered Design",
        desc: "We use cutting-edge AI tools alongside human creativity to deliver faster iterations and sharper visual concepts."
      },
      {
        icon: "🌐",
        title: "Brand Strategy",
        desc: "Market positioning, brand messaging, and audience profiling to ensure your identity connects with the right people."
      },
    ],
    process: [
      { title: "Brand Discovery", desc: "We run a structured discovery session to understand your vision, values, target market, and competitive landscape." },
      { title: "Concept Development", desc: "Our designers develop multiple visual directions, each grounded in strategy and tailored to your audience." },
      { title: "Refinement", desc: "You choose a direction, we refine it through collaborative rounds of feedback until it's exactly right." },
      { title: "Delivery & Handoff", desc: "Final files delivered in all formats — print, digital, vector — with a full brand guidelines document." },
    ],
  },

  "academic-support": {
    title: "Academic Support",
    subtitle: "Your Complete Success Partner.",
    bg: "/academic.jpg",
    badge: "Aura Edu",
    waLink: "https://wa.me/923056485598?text=Hi%2C%20I'm%20interested%20in%20Academic%20Support%20services.",
    overview: `Education is the foundation of every ambition. Whether you're a student struggling with deadlines, a professional looking to upskill, or a parent seeking the right academic environment for your child — Aura Edu is built for you.\n\nWe are not a tutoring center. We are a complete academic ecosystem offering support at every stage — from school-level assignments and board exam preparation to university-level research, IELTS coaching, and career development.\n\nWith 500+ students trained and a 98% satisfaction rate, our team of expert educators and trainers delivers personalized guidance that produces real academic outcomes. We meet students where they are and take them where they want to go.`,
    features: [
      {
        icon: "📝",
        title: "Assignments & Research",
        desc: "Expert support for university and school assignments, presentations, and plagiarism-free research papers across all subjects."
      },
      {
        icon: "🎓",
        title: "Exam Preparation",
        desc: "Structured study plans, past papers, and targeted coaching for board exams, entry tests, O/A Levels, Matric, and Inter."
      },
      {
        icon: "🗣️",
        title: "IELTS & Language Courses",
        desc: "Comprehensive IELTS preparation, English Spoken courses, Arabic writing, and calligraphy — all taught by certified trainers."
      },
      {
        icon: "💼",
        title: "Career Development",
        desc: "CV writing, interview preparation, internship guidance, and career counselling to help students transition into professionals."
      },
      {
        icon: "💻",
        title: "Skill-Based Courses",
        desc: "Hands-on training in Graphic Design, Video Editing, Digital Marketing, Freelancing, MS Office, and E-Commerce."
      },
      {
        icon: "👦",
        title: "Kids Programs",
        desc: "Early education, phonics, basic computer skills, and creative learning activities designed for young learners."
      },
    ],
    process: [
      { title: "Free Consultation", desc: "We start with a free session to understand your specific academic needs, challenges, and goals." },
      { title: "Custom Plan", desc: "A personalized learning plan is created — covering schedule, resources, and milestones." },
      { title: "Expert Guidance", desc: "Sessions are delivered one-on-one or in small groups, live via Zoom/Google Meet or recorded for flexibility." },
      { title: "Track & Improve", desc: "We monitor your progress, adjust the plan as needed, and provide ongoing support until you achieve your target." },
    ],
  },

  "ecommerce-management": {
    title: "E-commerce Management",
    subtitle: "Hands-Free. Revenue-Driven.",
    bg: "/ecommerce.jpg",
    badge: "Syed Aura Agency",
    waLink: "https://wa.me/923097819011?text=Hi%2C%20I'm%20interested%20in%20E-commerce%20Management%20services.",
    overview: `E-commerce is one of the most powerful ways to build a passive income stream — but only if it's managed with the right strategy, systems, and expertise. Most people fail because they try to figure it out alone.\n\nAura's e-commerce team has built and managed stores generating consistent monthly revenue across different e-commerce platforms. We handle everything: product research, supplier sourcing, store setup, listing optimization, customer service, and scaling — so you can own a profitable store without running it yourself.\n\nWhether you're starting from zero or looking to scale an existing store, our hands-free management model is designed to maximize profitability while minimizing your time investment.`,
    features: [
      {
        icon: "🛒",
        title: "TikTok Shop Management",
        desc: "Full-service TikTok Shop setup, product listing, content strategy, and affiliate management to drive viral sales."
      },
      {
        icon: "🏪",
        title: "Shopify Store Setup",
        desc: "Professional store design, product importing, payment gateway setup, and conversion optimization for your Shopify brand."
      },
      {
        icon: "📦",
        title: "Product Research & Sourcing",
        desc: "Data-driven product discovery and supplier sourcing from US, UK, and global marketplaces to find winning products."
      },
      {
        icon: "🔄",
        title: "eBay Store Management",
        desc: "End-to-end eBay account management including listing creation, repricing strategy, and order fulfillment."
      },
      {
        icon: "📊",
        title: "Revenue Scaling",
        desc: "Systematic growth strategies to increase average order value, repeat customers, and monthly revenue benchmarks."
      },
      {
        icon: "🤖",
        title: "Automation & Systems",
        desc: "Order management automation, inventory sync, and workflow tools that reduce manual effort and prevent costly errors."
      },
    ],
    process: [
      { title: "Store Audit / Setup", desc: "We audit your existing store or build a new one from scratch — optimized for conversion from day one." },
      { title: "Product Strategy", desc: "We identify winning products through market research, trend analysis, and competitive benchmarking." },
      { title: "Launch & Optimize", desc: "Listings go live with optimized titles, images, and descriptions. We monitor and improve daily." },
      { title: "Scale & Report", desc: "Monthly revenue reports with clear insights and a scaling roadmap to grow your store month on month." },
    ],
  },

  "it-expertise": {
    title: "IT & Web Solutions",
    subtitle: "The Backbone of Your Digital Business.",
    bg: "/it-solutions.jpg",
    badge: "Syed Aura Agency",
    waLink: "https://wa.me/923097819011?text=Hi%2C%20I'm%20interested%20in%20IT%20Expertise%20services.",
    overview: `Every successful digital business runs on a foundation of reliable, secure, and high-performance technology. Whether it's a fast-loading website, a secure server configuration, or a custom software solution — the technology you use either powers your growth or limits it.\n\nAura's IT team specializes in building that foundation. We develop modern web applications using Next.js and React — frameworks used by the world's leading tech companies. We configure RDP environments for remote teams, set up secure server infrastructure, and build custom digital tools that solve real business problems.\n\nWe don't just deliver code. We deliver working systems that perform under real-world conditions and scale as your business grows.`,
    features: [
      {
        icon: "🌐",
        title: "Web Development",
        desc: "Modern, fast, and responsive websites and web applications built with Next.js, React, and Tailwind CSS."
      },
      {
        icon: "🖥️",
        title: "RDP Configuration",
        desc: "High-performance Remote Desktop Protocol environments for remote teams — secure, fast, and always available."
      },
      {
        icon: "🔒",
        title: "Security Infrastructure",
        desc: "Firewall setup, SSL installation, secure access management, and vulnerability assessments to protect your systems."
      },
      {
        icon: "⚙️",
        title: "Custom Software",
        desc: "Tailored tools and dashboards built to your exact workflow requirements — no bloated off-the-shelf software."
      },
      {
        icon: "☁️",
        title: "Server Management",
        desc: "Cloud server setup, maintenance, monitoring, and optimization across AWS, VPS, and dedicated hosting environments."
      },
      {
        icon: "📱",
        title: "UI/UX Design",
        desc: "Clean, intuitive interfaces designed to reduce friction and guide users toward the actions that matter most."
      },
    ],
    process: [
      { title: "Requirements Gathering", desc: "We start with a detailed discovery session to map out your technical needs, goals, and existing infrastructure." },
      { title: "Architecture & Planning", desc: "A technical blueprint is created — covering tech stack, timelines, milestones, and integration points." },
      { title: "Build & Test", desc: "Development happens in sprints with regular check-ins. Every feature is tested before it goes to production." },
      { title: "Deploy & Support", desc: "We handle deployment, monitor performance post-launch, and provide ongoing technical support." },
    ],
  },

  "ai-automation": {
    title: "AI & Automation",
    subtitle: "Work Smarter. Grow Faster.",
    bg: "/web-dev.jpg",
    badge: "Syed Aura Agency",
    waLink: "https://wa.me/923097819011?text=Hi%2C%20I'm%20interested%20in%20AI%20%26%20Automation%20services.",
    overview: `The businesses that will dominate the next decade are the ones building AI into their operations today. Not as a gimmick — but as a genuine competitive advantage that saves time, reduces costs, and scales output without scaling headcount.\n\nAt Aura, we help businesses implement practical AI solutions that deliver real results. From custom chatbots that handle customer inquiries 24/7 to YouTube automation systems that grow channels on autopilot, to intelligent workflows that eliminate repetitive manual tasks — we turn AI from a buzzword into a business asset.\n\nOur automation solutions are built for businesses of all sizes. Whether you're a solopreneur looking to reclaim your time or a growing company trying to scale without hiring, we design systems that fit your exact needs and integrate seamlessly into your existing workflow.`,
    features: [
      {
        icon: "🤖",
        title: "Custom AI Chatbots",
        desc: "Intelligent chatbots trained on your business data — handling FAQs, lead qualification, and customer support 24/7."
      },
      {
        icon: "▶️",
        title: "YouTube Automation",
        desc: "Full-stack YouTube channel automation — from niche selection and scriptwriting to voiceover, editing, and publishing."
      },
      {
        icon: "⚡",
        title: "Workflow Automation",
        desc: "End-to-end business process automation using Make, Zapier, and custom APIs to eliminate repetitive manual tasks."
      },
      {
        icon: "📧",
        title: "AI Lead Generation",
        desc: "Automated outreach sequences, lead scoring systems, and CRM integrations that fill your pipeline without manual effort."
      },
      {
        icon: "🧠",
        title: "AI-Powered Content",
        desc: "Scalable content production pipelines using AI tools — generating blogs, social posts, and scripts at volume."
      },
      {
        icon: "📊",
        title: "Reporting & Analytics",
        desc: "Automated dashboards and reporting systems that surface the insights you need without manually pulling data."
      },
    ],
    process: [
      { title: "Automation Audit", desc: "We map your current workflows to identify the highest-impact automation opportunities — quick wins and long-term plays." },
      { title: "Solution Design", desc: "A custom automation architecture is designed, selecting the right AI tools and integration layers for your stack." },
      { title: "Build & Integrate", desc: "We build, test, and integrate the automation into your existing systems with zero disruption to current operations." },
      { title: "Train & Hand Off", desc: "Your team is trained on how to use and maintain the systems, with documentation and ongoing support available." },
    ],
  },

};

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function ServiceDetailPage() {
  const params  = useParams();
  const router  = useRouter();

  // ✅ FIX: No TypeScript casting — plain JS
  const slug    = params.slug;
  const service = serviceData[slug];

  // ✅ FIX: Features are hidden by default, revealed on button click
  const [showFeatures, setShowFeatures] = useState(false);
  const featuresRef = useRef(null);

  const handleViewFeatures = () => {
    setShowFeatures(true);
    // Small delay so state updates before scroll
    setTimeout(() => {
      featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (!service) {
    return (
      <div className="bg-[#020202] min-h-screen text-white flex flex-col items-center justify-center gap-6 font-sans">
        <p className="text-6xl font-black text-white/10">404</p>
        <p className="text-gray-400 uppercase tracking-widest text-sm">Service not found</p>
        <Link href="/#services" className="mt-4 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
          ← Back to Services
        </Link>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden selection:bg-purple-500/30">

      {/* Ambient glow */}
      <div className="fixed top-0 left-0 w-[60%] h-[60%] bg-purple-900/8 blur-[180px] rounded-full -z-10 pointer-events-none" />

      {/* ── Top Nav ── */}
      <nav className="fixed top-0 w-full z-[100] backdrop-blur-md bg-black/70 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="active:scale-95 transition-transform">
            <img src="/Logo.png" alt="Aura Group" className="h-10 w-auto drop-shadow-[0_0_8px_rgba(168,85,247,0.2)]" />
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/#services"
              className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors hidden sm:block">
              ← All Services
            </Link>
            <a href={service.waLink} target="_blank" rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-500 text-white px-5 md:px-7 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-purple-500/20">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO — Cinematic full-bleed with image background ── */}
      <section className="relative min-h-screen flex items-end pb-20 md:pb-32 overflow-hidden">

        {/* Background image — ✅ FIX: lighter overlay so image is actually visible */}
        <div className="absolute inset-0 z-0">
          <img src={service.bg} alt={service.title}
            className="w-full h-full object-cover object-center scale-[1.03]" />
          {/* Gradient: strong from bottom-left, subtle at top-right — image visible top-right */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/90 via-[#020202]/50 to-transparent" />
        </div>

        {/* Subtle grid texture */}
        <div className="absolute inset-0 z-[1] opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-40 w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger}>

            <motion.span variants={fadeUp}
              className="inline-block text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] mb-6 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400">
              {service.badge}
            </motion.span>

            <motion.h1 variants={fadeUp}
              className="text-5xl md:text-[90px] lg:text-[110px] font-black uppercase tracking-tighter leading-[0.88] max-w-4xl mb-6"
              style={{ background: 'linear-gradient(135deg,#fff 0%,#fff 55%,rgba(168,85,247,0.65) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {service.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-gray-300 text-base md:text-2xl font-light mb-12 max-w-xl leading-relaxed">
              {service.subtitle}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <a href={service.waLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 active:scale-95">
                Start Your Journey →
              </a>
              {/* ✅ FIX: View Features scrolls AND reveals hidden feature section */}
              <button
                onClick={handleViewFeatures}
                className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all backdrop-blur-md">
                View Features ↓
              </button>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors py-4 px-2">
                ← Back
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020202] to-transparent z-10" />
      </section>

      {/* ── Overview ── */}
      <section className="border-t border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto">
            {service.overview.split('\n\n').map((para, i) => (
              <motion.p key={i} variants={fadeUp}
                className={`leading-relaxed font-light mb-6 last:mb-0 ${i === 0 ? 'text-lg md:text-2xl text-gray-200' : 'text-base md:text-lg text-gray-400'}`}>
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features — ✅ FIX: Hidden until "View Features" is clicked ── */}
      <section ref={featuresRef} className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-32 border-t border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.span variants={fadeUp} className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">What We Offer</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Our Capabilities</motion.h2>
        </motion.div>

        {/* Teaser state — shown before user clicks */}
        <AnimatePresence mode="wait">
          {!showFeatures ? (
            <motion.div
              key="teaser"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-8"
            >
              {/* Preview — blurred bottom cards */}
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {service.features.slice(0, 3).map((f, i) => (
                  <div key={f.title}
                    className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 opacity-60">
                    <div className="text-3xl mb-5">{f.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{f.desc}</p>
                  </div>
                ))}
                {/* Fade-out gradient at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020202] to-transparent pointer-events-none" />
              </div>
              <button
                onClick={handleViewFeatures}
                className="relative z-10 bg-purple-600 hover:bg-purple-500 text-white px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95">
                Reveal All {service.features.length} Features ↓
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="features"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {service.features.map((f, i) => (
                <motion.div key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-500">
                  <div className="text-3xl mb-5">{f.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Process ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-32 border-t border-white/5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
          <motion.span variants={fadeUp} className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block">How It Works</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Our Process</motion.h2>
        </motion.div>
        <div className="space-y-5">
          {service.process.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }} viewport={{ once: true }}
              className="group flex gap-6 md:gap-10 items-start bg-white/[0.02] border border-white/5 hover:border-purple-500/20 hover:bg-white/[0.04] rounded-[1.5rem] p-6 md:p-8 transition-all duration-500">
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black text-sm md:text-base group-hover:bg-purple-600/30 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="pt-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <motion.section
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-32 border-t border-white/5">
        <div className="relative bg-gradient-to-br from-purple-900/20 via-black to-black border border-purple-500/20 p-10 md:p-20 rounded-[3rem] text-center overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/15 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-800/10 blur-[100px] rounded-full" />
          <div className="relative z-10">
            <span className="text-purple-400 text-[10px] font-bold uppercase tracking-[0.6em] mb-6 block">Ready to Begin?</span>
            <h2 className="text-2xl md:text-6xl font-black mb-6 tracking-tighter uppercase text-white leading-tight">
              Let's build something<br className="hidden md:block" /> extraordinary.
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Contact us today and our team will respond within 24 hours with a tailored strategy for your goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href={service.waLink} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl hover:shadow-purple-500/30 hover:scale-105 active:scale-95">
                WhatsApp Us Now
              </a>
              <Link href="/#services"
                className="w-full sm:w-auto text-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                Explore Other Services
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="py-12 text-center opacity-20 text-[8px] md:text-[9px] tracking-[0.5em] uppercase border-t border-white/5">
        © 2026 Aura Group · Innovation · Services · Excellence
      </footer>
    </main>
  );
}
