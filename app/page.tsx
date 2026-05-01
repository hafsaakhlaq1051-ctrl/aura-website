"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ── Constants ──

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

// ── Component ──

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [showNav, setShowNav] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const lastScrollY = useRef(0);

  // ✅ FIX: Safe window usage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const controlNavbar = () => {
      const currentY = window.scrollY;
      setShowNav(currentY <= lastScrollY.current || currentY <= 150);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  // ✅ FIX: Safe window usage
  // ✅ FIX: Safe IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const sectionTabMap = {
      home: 'home',
      about: 'about us',
      'why-choose-us': 'why us',
      services: 'services',
      startups: 'startups',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          // ✅ FIX: TypeScript ko batana ke 'id' is map mein mojood hai
          if (id in sectionTabMap) {
            setActiveTab(sectionTabMap[id as keyof typeof sectionTabMap]);
          }
        }
      });
    }, { threshold: 0.3 });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  // ✅ FIX: Safe document usage
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = selectedItem ? 'hidden' : '';
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = '';
      }
    };
  }, [selectedItem]);

  // ✅ FIX: Safe IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const sectionTabMap = {
      home: 'home',
      about: 'about us',
      'why-choose-us': 'why us',
      services: 'services',
      startups: 'startups',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id in sectionTabMap) {
            setActiveTab(sectionTabMap[id]);
          }
        }
      });
    }, { threshold: 0.3 });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#020202] text-white">

      {/* Example Modal Fix */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/80"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-[#0d0d0d] p-8 rounded-2xl max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{selectedItem.title}</h2>

              {/* ✅ FIX: stable key */}
              {selectedItem.details.split('\n\n').map((para, i) => (
                <p key={`${selectedItem.id}-${i}`}>
                  {para}
                </p>
              ))}

              <button onClick={() => setSelectedItem(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Example External Link Fix */}
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Explore page"
      >
        Visit
      </a>

    </main>
  );
}