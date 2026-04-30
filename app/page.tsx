'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef, memo } from 'react';
import {
  Building2, TrendingUp, Shield, Award, Users, MapPin, Phone, Mail,
  MessageSquare, CheckCircle, ArrowRight, Star, Globe, Target, Zap,
  DollarSign, BarChart3, FileText, Key, Wrench, ClipboardCheck,
  Plus, Menu, X, ChevronRight, Eye, Home, Layers, BedDouble, Maximize2
} from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

// ─────────────────────────────────────────────
// FADE‑UP / SLIDE REVEAL
// ─────────────────────────────────────────────
const Reveal = ({
  children,
  dir = 'up',
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  dir?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}) => {
  const offsets = { up: { y: 50, x: 0 }, down: { y: -50, x: 0 }, left: { x: -60, y: 0 }, right: { x: 60, y: 0 } };
  const { x, y } = offsets[dir];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// STAGGER CHILDREN
// ─────────────────────────────────────────────
const Stagger = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } }
    }}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────
// COUNTER ANIMATION
// ─────────────────────────────────────────────
const AnimCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(false);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !ref.current) {
        ref.current = true;
        let start = 0;
        const duration = 1800;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

// ─────────────────────────────────────────────
// FAQ ITEM
// ─────────────────────────────────────────────
const FAQItem = memo(({ q, a, idx }: { q: string; a: string; idx: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: idx * 0.07, duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? 'border-amber-400 shadow-lg shadow-amber-100' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-7 py-5 text-left bg-white hover:bg-gray-50/70 transition-colors"
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-[15px] font-semibold text-gray-900 pr-6">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
            open ? 'border-amber-500 bg-amber-500 text-white' : 'border-gray-300 text-gray-400'
          }`}
        >
          <Plus className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="px-7 pb-6 text-gray-600 text-[14px] leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
FAQItem.displayName = 'FAQItem';

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function AFS() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [bgLoaded, setBgLoaded] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'Property Valuation', message: '' });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'management', label: 'Management' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  // ── FIX: Close nav first, then scroll after drawer animation completes ──
  const scroll = (id: string) => {
    setNavOpen(false);
    setActiveNav(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 320);
  };

  useEffect(() => {
    const onScroll = () => {
      const sections = navLinks.map(l => l.id);
      const pos = window.scrollY + 300;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stats = [
    { n: 1200, suf: '+', label: 'Properties Sold', icon: Building2 },
    { n: 4, suf: '.2B AED', label: 'Total Transactions', icon: DollarSign },
    { n: 98, suf: '%', label: 'Client Satisfaction', icon: Star },
    { n: 15, suf: '+', label: 'Years in Dubai', icon: Award },
  ];

  const coreServices = [
    {
      icon: FileText,
      title: 'Property Valuation',
      desc: 'Precision-driven market analysis and comprehensive property valuations, leveraging 15 years of Dubai market intelligence to deliver numbers you can trust.',
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=700&fit=crop&q=90',
    },
    {
      icon: Building2,
      title: 'Property Management',
      desc: 'End-to-end property management—tenant acquisition, rent collection, maintenance, and detailed financial reporting—so your investment works effortlessly.',
      img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&h=700&fit=crop&q=90',
    },
    {
      icon: TrendingUp,
      title: 'Investment Advisory',
      desc: 'Strategic portfolio consulting backed by live market data. We identify high-yield opportunities across Dubai, Abu Dhabi, and the wider UAE.',
      img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=700&fit=crop&q=90',
    },
  ];

  const mgmtServices = [
    { icon: Key, title: 'Tenant Management', desc: 'Rigorous tenant screening—credit checks, employment verification, and reference validation—so only the right occupants enter your property.' },
    { icon: Wrench, title: 'Maintenance & Repairs', desc: '24/7 maintenance coordination with our vetted contractor network. Emergency or routine, every issue is resolved with urgency.' },
    { icon: DollarSign, title: 'Rent Collection', desc: 'Automated collection systems with real-time payment tracking and transparent owner disbursements—every dirham accounted for.' },
    { icon: FileText, title: 'Legal Compliance', desc: 'Full RERA compliance management, Ejari registration, tenancy renewals, and all documentation handled by certified specialists.' },
    { icon: BarChart3, title: 'Financial Reporting', desc: 'Detailed monthly P&L statements, occupancy analytics, and portfolio dashboards accessible via our secure client portal.' },
    { icon: ClipboardCheck, title: 'Property Inspections', desc: 'Scheduled move-in, mid-tenancy, and move-out inspections with photographic records to protect your asset value.' },
  ];

  const testimonials = [
    { name: 'Ahmed Al-Rashid', role: 'Property Investor, Dubai', content: 'AFS transformed my scattered portfolio into a seamlessly managed income machine. Their tenant screening is unmatched—zero vacancies in 18 months.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80' },
    { name: 'Sarah Mitchell', role: 'Overseas Villa Owner, London', content: 'As a London-based investor, I needed complete peace of mind. AFS handles everything flawlessly. The monthly reports are detailed and crystal clear.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80' },
    { name: 'Khalid bin Mohammed', role: 'Real Estate Developer, Abu Dhabi', content: 'Their market intelligence is exceptional. AFS identified an off-plan opportunity with 22% projected ROI before anyone else in the market.', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80' },
    { name: 'Maria Fernandez', role: 'Villa Owner, Dubai Marina', content: 'From zero property management knowledge to a stress-free investment experience. AFS made the impossible simple and completely transparent.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80' },
    { name: 'Robert Chen', role: 'Apartment Owner, Downtown Dubai', content: 'Financial transparency is outstanding. I can see every dirham through the portal. Honestly the best property management team in the UAE.', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80' },
    { name: 'Fatima Al-Qassimi', role: 'Property Investor, Sharjah', content: 'AFS found premium tenants for all three of my properties within a fortnight. Their legal documentation process is seamless and worry-free.', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80' },
  ];

  const faqs = [
    { q: 'Do you assist with off-plan property investments?', a: 'Yes, we provide comprehensive advisory services for off-plan investments including developer due diligence, payment plan analysis, market research, and future value projections. We work with reputable developers across Dubai, Abu Dhabi, and other emirates to ensure you make informed investment decisions.' },
    { q: 'Can you help first-time buyers in Dubai?', a: 'Absolutely! We specialize in guiding first-time buyers through the entire process. Our services include property search assistance, mortgage broker connections, legal documentation support, RERA registration, and post-purchase property management. We make your first property purchase smooth and stress-free.' },
    { q: 'Do you handle both residential and commercial properties?', a: 'Yes, we manage both residential properties (apartments, villas, townhouses) and commercial properties (offices, retail spaces, warehouses). Our team has specialized expertise in each sector to maximize your property\'s potential and ensure optimal returns.' },
    { q: 'Do you provide property management services?', a: 'Yes, comprehensive property management is our core service. We handle tenant placement, rent collection, maintenance coordination, legal compliance, financial reporting, and regular property inspections. Our goal is to maximize your rental income while minimizing your involvement.' },
    { q: 'How do you help property investors?', a: 'We provide end-to-end support including market analysis, property valuation, investment strategy consulting, acquisition support, financing assistance, and ongoing portfolio management. Our data-driven approach helps investors identify high-yield opportunities and optimize their real estate portfolios for maximum returns.' },
    { q: 'Can you help landlords find tenants?', a: 'Yes, tenant sourcing is one of our key services. We conduct thorough tenant screening including credit checks, employment verification, and reference checks. We market your property through multiple channels, conduct viewings, negotiate lease terms, and handle all documentation to ensure quality tenants.' },
  ];

  // ── UPDATED HEADING FONT (Inter / SF Pro Display) ──
  const G = "'Inter', 'SF Pro Display', -apple-system, sans-serif";
  const S = "'DM Sans', -apple-system, sans-serif";

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">

      {/* ── Google Fonts – Inter & DM Sans ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: auto; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #fafafa; }
        ::-webkit-scrollbar-thumb { background: #d97706; border-radius: 4px; }

        .grad-text {
          background: linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .grain::before {
          content: '';
          position: absolute; inset: 0; z-index: 1;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
          pointer-events: none;
        }

        .img-hover { overflow: hidden; }
        .img-hover img { transition: transform 0.7s cubic-bezier(0.22,0.61,0.36,1); }
        .img-hover:hover img { transform: scale(1.06); }

        .card-lift { transition: box-shadow 0.3s ease, transform 0.3s ease; }
        .card-lift:hover { transform: translateY(-6px); box-shadow: 0 24px 64px rgba(0,0,0,0.12); }

        .nav-link-ul::after {
          content: '';
          display: block;
          height: 2px; background: #d97706;
          width: 0; transition: width 0.25s ease;
          margin-top: 2px;
        }
        .nav-link-ul:hover::after,
        .nav-link-ul.active::after { width: 100%; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes scrollBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        .float-anim { animation: float 4s ease-in-out infinite; }
        .scroll-bob { animation: scrollBob 1.6s ease-in-out infinite; }

        input, textarea, select {
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #d97706 !important;
          box-shadow: 0 0 0 3px rgba(217,119,6,0.12);
        }

        /* Mobile touch scroll fix */
        @media (max-width: 1023px) {
          html { scroll-behavior: auto; }
        }
      `}</style>

      {/* ─── PROGRESS BAR ─── */}
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-gradient-to-r from-amber-700 via-amber-500 to-amber-400"
      />

      {/* ─── NAVBAR ─── */}
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: 'rgba(8,8,8,0.88)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-[1340px] mx-auto px-6 py-[14px] flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scroll('home')} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-400 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span style={{ fontFamily: G, fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '0.01em' }}>
              AFS <span style={{ color: '#f59e0b' }}>Real Estate</span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scroll(l.id)}
                className={`nav-link-ul ${activeNav === l.id ? 'active' : ''}`}
                style={{ fontFamily: S, fontSize: 13, fontWeight: 500, color: activeNav === l.id ? '#f59e0b' : 'rgba(255,255,255,0.65)', letterSpacing: '0.03em', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scroll('contact')}
              style={{ fontFamily: S, fontSize: 13, fontWeight: 600, background: 'linear-gradient(135deg,#b45309,#f59e0b)', color: '#0a0a0a', padding: '10px 22px', borderRadius: 10, border: 'none', cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 4px 20px rgba(217,119,6,0.35)' }}
            >
              Let's Talk →
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button onClick={() => setNavOpen(v => !v)} className="lg:hidden p-2 rounded-lg" style={{ color: '#fff', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="lg:hidden overflow-hidden"
              style={{ background: 'rgba(6,6,6,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map(l => (
                  <button
                    key={l.id}
                    onClick={() => scroll(l.id)}
                    style={{ fontFamily: S, fontSize: 15, fontWeight: 500, color: activeNav === l.id ? '#f59e0b' : 'rgba(255,255,255,0.7)', textAlign: 'left', padding: '12px 16px', borderRadius: 10, background: activeNav === l.id ? 'rgba(245,158,11,0.08)' : 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => scroll('contact')}
                  style={{ fontFamily: S, fontSize: 14, fontWeight: 600, background: 'linear-gradient(135deg,#b45309,#f59e0b)', color: '#0a0a0a', padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer', marginTop: 8 }}
                >
                  Let's Talk →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ─── SECTION 1 · HERO ─── */}
      <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden grain pt-20">
        {/* BG */}
        <div className="absolute inset-0 z-0">
          <img
      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop&q=90"
      alt="Dubai luxury real estate skyline"
      onLoad={() => setBgLoaded(true)}
      className={`w-full h-full object-cover transition-opacity duration-1000 ${bgLoaded ? 'opacity-100' : 'opacity-100'}`}
      style={{ filter: 'brightness(0.85) saturate(0.6) contrast(1.09)' }}
    />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg,rgba(3,3,3,0.96) 0%,rgba(3,3,3,0.80) 45%, rgba(3,3,3,0.42) 100%)' }} />
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top,rgba(3,3,3,0.75),transparent)' }} />
  </div>

        <div className="relative z-10 max-w-[1340px] mx-auto px-6 pt-20 pb-16 flex-1 flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-20 items-center min-h-[75vh]">
            <div>
              <Reveal dir="left" delay={0.15}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
                  <Award className="w-4 h-4 text-amber-400" />
                  <span style={{ fontFamily: S, fontSize: 12, fontWeight: 600, color: '#f59e0b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Dubai's Premier Real Estate Partner</span>
                </div>
              </Reveal>

              <Reveal dir="left" delay={0.25}>
                <h1 style={{ fontFamily: G, fontSize: 'clamp(46px,5.8vw,88px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, marginBottom: 28, letterSpacing: '-0.02em' }}>
                  Your Gateway to<br />
                  <span style={{ color: '#f59e0b' }}>Smart Property</span><br />
                  Solutions
                </h1>
              </Reveal>

              <Reveal dir="left" delay={0.35}>
                <p style={{ fontFamily: S, fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, maxWidth: 480, marginBottom: 40 }}>
                  Navigate Dubai's dynamic real estate market with confidence. Expert property management and investment advisory services that maximize returns and eliminate complexity.
                </p>
              </Reveal>

              <Reveal dir="left" delay={0.45}>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => scroll('services')}
                    style={{ fontFamily: S, fontSize: 14, fontWeight: 600, background: 'linear-gradient(135deg,#b45309,#f59e0b)', color: '#0a0a0a', padding: '15px 34px', borderRadius: 12, border: 'none', cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 8px 32px rgba(217,119,6,0.4)', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    Explore Services <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => scroll('contact')}
                    style={{ fontFamily: S, fontSize: 14, fontWeight: 500, background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.85)', padding: '15px 34px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.18)', cursor: 'pointer', backdropFilter: 'blur(10px)' }}
                  >
                    Book Consultation
                  </motion.button>
                </div>
              </Reveal>

              <Reveal dir="left" delay={0.55}>
                <div className="flex flex-wrap gap-6 mt-12">
                  {[['RERA Licensed', Shield], ['15+ Years', Award], ['AED 4.2B Portfolio', TrendingUp]].map(([label, Icon]: any, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span style={{ fontFamily: S, fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <Reveal key={i} dir="right" delay={0.3 + i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}
                    className="rounded-2xl p-6"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}
                  >
                    <s.icon className="w-9 h-9 text-amber-400 mb-4" />
                    <div style={{ fontFamily: G, fontSize: 36, fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 6 }}>
                      <AnimCounter target={s.n} suffix={s.suf} />
                    </div>
                    <div style={{ fontFamily: S, fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center pb-10 gap-2">
          <span style={{ fontFamily: S, fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll to explore</span>
          <div className="scroll-bob w-6 h-10 rounded-full border border-white/20 flex justify-center items-start pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>
        </div>
      </section>

      {/* ─── STATS RIBBON ─── */}
      <section className="py-14 px-6" style={{ background: 'linear-gradient(135deg,#92400e,#b45309,#d97706)' }}>
        <div className="max-w-[1340px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <Reveal key={i} dir="up" delay={i * 0.08}>
              <div>
                <s.icon className="w-8 h-8 mx-auto mb-3 text-amber-200 opacity-80" />
                <div style={{ fontFamily: G, fontSize: 38, fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 6 }}>
                  <AnimCounter target={s.n} suffix={s.suf} />
                </div>
                <div style={{ fontFamily: S, fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── SECTION 2 · ABOUT ─── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-[1340px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <Reveal dir="left" delay={0.1}>
              <div className="relative">
                <div className="img-hover rounded-3xl overflow-hidden shadow-2xl" style={{ height: 520 }}>
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=700&fit=crop&q=90" alt="Dubai towers" className="w-full h-full object-cover" />
                </div>
                <motion.div
                  className="float-anim absolute -bottom-8 -right-8 rounded-2xl p-6 shadow-2xl"
                  style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', minWidth: 180 }}
                >
                  <div style={{ fontFamily: G, fontSize: 40, fontWeight: 800, color: '#d97706' }}>98%</div>
                  <div style={{ fontFamily: S, fontSize: 12, fontWeight: 600, color: '#374151', letterSpacing: '0.04em', marginTop: 2 }}>CLIENT RETENTION</div>
                </motion.div>
                <motion.div
                  className="absolute -top-6 -left-6 w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-xl"
                  style={{ background: 'linear-gradient(135deg,#92400e,#f59e0b)' }}
                  animate={{ rotate: [0, 3, 0, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <Award className="w-7 h-7 text-white" />
                  <span style={{ fontFamily: S, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em', marginTop: 2 }}>RERA</span>
                </motion.div>
              </div>
            </Reveal>

            <div>
              <Reveal dir="right" delay={0.1}>
                <div className="inline-block px-4 py-1.5 rounded-full mb-5" style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                  <span style={{ fontFamily: S, fontSize: 11, fontWeight: 700, color: '#92400e', letterSpacing: '0.12em', textTransform: 'uppercase' }}>About AFS Real Estate</span>
                </div>
              </Reveal>
              <Reveal dir="right" delay={0.2}>
                <h2 style={{ fontFamily: G, fontSize: 'clamp(34px,3.8vw,56px)', fontWeight: 800, color: '#111', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.02em' }}>
                  Your Trusted <span style={{ color: '#d97706' }}>Property Management</span> Partner
                </h2>
              </Reveal>
              <Reveal dir="right" delay={0.3}>
                <p style={{ fontFamily: S, fontSize: 15, fontWeight: 300, color: '#4b5563', lineHeight: 1.85, marginBottom: 16 }}>
                  Founded in 2013, AFS Real Estate has emerged as Dubai's most trusted property management firm. With deep understanding of UAE market dynamics, we help owners maximize investments while eliminating day-to-day management burdens.
                </p>
                <p style={{ fontFamily: S, fontSize: 15, fontWeight: 300, color: '#4b5563', lineHeight: 1.85, marginBottom: 32 }}>
                  Our team of certified specialists combines local market expertise with cutting-edge technology to deliver exceptional, measurable results—not just promises.
                </p>
              </Reveal>
              <Stagger className="space-y-3 mb-10">
                {[
                  'Licensed & regulated by RERA Dubai',
                  'Transparent monthly financial reporting',
                  'Vetted contractor network for all maintenance',
                  '24/7 emergency support for owners & tenants',
                  'Dedicated portfolio manager for every client',
                ].map((item, i) => (
                  <StaggerItem key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span style={{ fontFamily: S, fontSize: 14, fontWeight: 400, color: '#374151' }}>{item}</span>
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal dir="right" delay={0.5}>
                <div className="grid grid-cols-2 gap-4">
                  {[{ icon: Globe, title: 'Dubai-Based', desc: 'Strategic office in Business Bay' }, { icon: Shield, title: 'Fully Licensed', desc: 'RERA registered & insured' }, { icon: Target, title: 'Client-First', desc: 'Personalized for every investor' }, { icon: Zap, title: 'Market Intel', desc: 'Live data-driven decisions' }].map((c, i) => (
                    <motion.div key={i} whileHover={{ y: -4 }} className="p-4 rounded-2xl card-lift" style={{ border: '1px solid #e5e7eb' }}>
                      <c.icon className="w-7 h-7 text-amber-500 mb-2" />
                      <div style={{ fontFamily: S, fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 2 }}>{c.title}</div>
                      <div style={{ fontFamily: S, fontSize: 12, fontWeight: 400, color: '#6b7280' }}>{c.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 · CORE SERVICES ─── */}
      <section id="services" className="py-28 px-6" style={{ background: '#fafafa' }}>
        <div className="max-w-[1340px] mx-auto">
          <div className="text-center mb-20">
            <Reveal dir="up" delay={0.1}>
              <div className="inline-block px-4 py-1.5 rounded-full mb-5" style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                <span style={{ fontFamily: S, fontSize: 11, fontWeight: 700, color: '#92400e', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Our Core Services</span>
              </div>
            </Reveal>
            <Reveal dir="up" delay={0.2}>
              <h2 style={{ fontFamily: G, fontSize: 'clamp(36px,4vw,64px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.05, marginBottom: 18, letterSpacing: '-0.03em' }}>
                Comprehensive{' '}
                <span style={{ color: '#f59e0b' }}>Property Solutions</span>
              </h2>
            </Reveal>
            <Reveal dir="up" delay={0.3}>
              <p style={{ fontFamily: S, fontSize: 16, fontWeight: 300, color: '#6b7280', maxWidth: 600, margin: '0 auto' }}>
                From valuation to investment, we provide end-to-end property services tailored precisely to your needs.
              </p>
            </Reveal>
          </div>

          <div className="space-y-28">
            {coreServices.map((svc, i) => (
              <div key={i} className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <Reveal dir={i % 2 === 0 ? 'left' : 'right'} delay={0.15}>
                  <div className="img-hover rounded-3xl overflow-hidden shadow-2xl" style={{ height: 480 }}>
                    <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
                  </div>
                </Reveal>
                <Reveal dir={i % 2 === 0 ? 'right' : 'left'} delay={0.25}>
                  <div>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg,#92400e,#f59e0b)' }}>
                      <svc.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 style={{ fontFamily: G, fontSize: 'clamp(28px,3.2vw,48px)', fontWeight: 800, color: '#111', lineHeight: 1.1, marginBottom: 18, letterSpacing: '-0.02em' }}>{svc.title}</h3>
                    <p style={{ fontFamily: S, fontSize: 15, fontWeight: 300, color: '#4b5563', lineHeight: 1.85, marginBottom: 28 }}>{svc.desc}</p>
                    <Stagger className="space-y-3 mb-8">
                      {['Expert market analysis & live data', 'Personalized investment strategies', 'Transparent financial reporting', '24/7 dedicated client support'].map((f, fi) => (
                        <StaggerItem key={fi} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#fef3c7' }}>
                            <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                          </div>
                          <span style={{ fontFamily: S, fontSize: 14, fontWeight: 400, color: '#374151' }}>{f}</span>
                        </StaggerItem>
                      ))}
                    </Stagger>
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      onClick={() => scroll('contact')}
                      className="flex items-center gap-2"
                      style={{ fontFamily: S, fontSize: 13, fontWeight: 600, background: 'linear-gradient(135deg,#b45309,#f59e0b)', color: '#0a0a0a', padding: '13px 28px', borderRadius: 12, border: 'none', cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 6px 24px rgba(217,119,6,0.3)' }}
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MANAGEMENT SERVICES GRID ─── */}
      <section id="management" className="py-28 px-6 bg-white">
        <div className="max-w-[1340px] mx-auto">
          <div className="text-center mb-20">
            <Reveal dir="up" delay={0.1}>
              <div className="inline-block px-4 py-1.5 rounded-full mb-5" style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                <span style={{ fontFamily: S, fontSize: 11, fontWeight: 700, color: '#92400e', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Property Management</span>
              </div>
            </Reveal>
            <Reveal dir="up" delay={0.2}>
              <h2 style={{ fontFamily: G, fontSize: 'clamp(36px,4vw,64px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.025em' }}>
                Complete <span style={{ color: '#d97706' }}>Management Solutions</span>
              </h2>
            </Reveal>
            <Reveal dir="up" delay={0.3}>
              <p style={{ fontFamily: S, fontSize: 16, fontWeight: 300, color: '#6b7280', maxWidth: 600, margin: '0 auto' }}>
                From tenant placement to financial reporting—every aspect handled so you can focus on growing your portfolio.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mgmtServices.map((s, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(0,0,0,0.1)', borderColor: '#fcd34d' }}
                  className="p-7 rounded-3xl bg-white card-lift"
                  style={{ border: '1px solid #f3f4f6', transition: 'all 0.3s ease' }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: '#fef3c7' }}>
                    <s.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 style={{ fontFamily: G, fontSize: 'clamp(18px,2vw,22px)', fontWeight: 600, color: '#1f2937', marginBottom: 8, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                    {s.title}
                  </h4>
                  <p style={{ fontFamily: S, fontSize: 14, fontWeight: 300, color: '#4b5563', lineHeight: 1.75 }}>{s.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES ─── */}
      <section className="py-28 px-6" style={{ background: 'linear-gradient(to bottom,#fafafa,#fff)' }}>
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <Reveal dir="left" delay={0.1}>
                <div className="inline-block px-4 py-1.5 rounded-full mb-5" style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                  <span style={{ fontFamily: S, fontSize: 11, fontWeight: 700, color: '#92400e', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Featured Listings</span>
                </div>
              </Reveal>
              <Reveal dir="left" delay={0.2}>
                <h2 style={{ fontFamily: G, fontSize: 'clamp(36px,4vw,60px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 16 }}>
                  Curated <span style={{ color: '#d97706' }}>Properties</span>
                </h2>
              </Reveal>
            </div>
            <Reveal dir="right" delay={0.2}>
              <button onClick={() => scroll('contact')} style={{ fontFamily: S, fontSize: 13, fontWeight: 600, color: '#d97706', background: 'none', border: '1.5px solid #d97706', padding: '10px 24px', borderRadius: 10, cursor: 'pointer', flexShrink: 0 }}>
                View All Properties →
              </button>
            </Reveal>
          </div>

          <Stagger className="grid md:grid-cols-3 gap-6">
            {[
              { img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&h=500&fit=crop&q=90', type: 'Villa', loc: 'Palm Jumeirah', beds: 5, area: '7,200 sqft' },
              { img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&h=500&fit=crop&q=90', type: 'Apartment', loc: 'Downtown Dubai', beds: 2, area: '1,450 sqft' },
              { img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&h=500&fit=crop&q=90', type: 'Penthouse', loc: 'Dubai Marina', beds: 4, area: '5,800 sqft' },
            ].map((p, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="rounded-3xl overflow-hidden bg-white card-lift"
                  style={{ border: '1px solid #f3f4f6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
                >
                  <div className="img-hover relative" style={{ height: 240 }}>
                    <img src={p.img} alt={p.type} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full" style={{ background: 'linear-gradient(135deg,#92400e,#f59e0b)', fontFamily: S, fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>{p.type}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      <span style={{ fontFamily: S, fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{p.loc}</span>
                    </div>
                    <div className="flex gap-5 mb-5">
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-amber-400" />
                        <span style={{ fontFamily: S, fontSize: 13, color: '#374151', fontWeight: 500 }}>{p.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4 text-amber-400" />
                        <span style={{ fontFamily: S, fontSize: 13, color: '#374151', fontWeight: 500 }}>{p.area}</span>
                      </div>
                    </div>
                    <button onClick={() => scroll('contact')} style={{ width: '100%', fontFamily: S, fontSize: 13, fontWeight: 600, background: 'transparent', color: '#d97706', border: '1.5px solid #d97706', padding: '10px', borderRadius: 10, cursor: 'pointer' }}>
                      Enquire Now
                    </button>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="py-28 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[1340px] mx-auto">
          <div className="text-center mb-20">
            <Reveal dir="up" delay={0.1}>
              <div className="inline-block px-4 py-1.5 rounded-full mb-5" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
                <span style={{ fontFamily: S, fontSize: 11, fontWeight: 700, color: '#f59e0b', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Client Stories</span>
              </div>
            </Reveal>
            <Reveal dir="up" delay={0.2}>
              <h2 style={{ fontFamily: G, fontSize: 'clamp(34px,4vw,60px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
                Trusted by <span style={{ color: '#f59e0b' }}>450+ Clients</span>
              </h2>
            </Reveal>
            <Reveal dir="up" delay={0.3}>
              <p style={{ fontFamily: S, fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto' }}>
                Real results from property owners across Dubai and the wider UAE
              </p>
            </Reveal>
          </div>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="p-7 rounded-3xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}
                >
                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, si) => <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p style={{ fontFamily: S, fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 24 }}>
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/30" />
                    <div>
                      <div style={{ fontFamily: S, fontSize: 14, fontWeight: 600, color: '#fff' }}>{t.name}</div>
                      <div style={{ fontFamily: S, fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.45)' }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section id="faq" className="py-28 px-6 bg-white">
        <div className="max-w-[900px] mx-auto">
          <Reveal dir="up" delay={0.1}>
            <div className="mb-2" style={{ fontFamily: S, fontSize: 12, fontWeight: 700, color: '#d97706', letterSpacing: '0.12em', textTransform: 'uppercase' }}>NEED HELP</div>
          </Reveal>
          <Reveal dir="up" delay={0.15}>
            <h2 style={{ fontFamily: G, fontSize: 'clamp(32px,4vw,56px)', fontWeight: 800, color: '#111', lineHeight: 1.1, marginBottom: 6, letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h2>
          </Reveal>
          <Reveal dir="up" delay={0.2}>
            <div style={{ fontFamily: S, fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 40 }}>Buying And Renting</div>
          </Reveal>

          <div className="space-y-3 mb-12">
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} idx={i} />
            ))}
          </div>

          <Reveal dir="up" delay={0.15}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-3xl p-10"
              style={{ background: 'linear-gradient(135deg,#d97706,#f59e0b,#fbbf24)' }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h4 style={{ fontFamily: G, fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Still have a question?</h4>
                  <p style={{ fontFamily: S, fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.85)' }}>
                    Get in touch with AFS Properties today, and let us assist you with confidence and transparency.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  onClick={() => scroll('contact')}
                  style={{ fontFamily: S, fontSize: 13, fontWeight: 700, background: '#fff', color: '#d97706', padding: '14px 32px', borderRadius: 999, border: 'none', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
                >
                  CONTACT US
                </motion.button>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="relative py-28 px-6 overflow-hidden grain">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1920&h=700&fit=crop&q=85" alt="Luxury property" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3) saturate(0.7)' }} />
        </div>
        <div className="relative z-10 max-w-[860px] mx-auto text-center">
          <Reveal dir="up" delay={0.1}>
            <h2 style={{ fontFamily: G, fontSize: 'clamp(34px,5vw,68px)', fontWeight: 900, color: '#fff', lineHeight: 1.08, marginBottom: 20, letterSpacing: '-0.02em' }}>
              Ready to <span style={{ color: '#f59e0b' }}>Elevate</span> Your Investment Portfolio?
            </h2>
          </Reveal>
          <Reveal dir="up" delay={0.2}>
            <p style={{ fontFamily: S, fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.6)', maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.8 }}>
              Schedule a private consultation with our senior advisors. Discover how AFS can maximize your returns and simplify property ownership—completely.
            </p>
          </Reveal>
          <Reveal dir="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={() => scroll('contact')} style={{ fontFamily: S, fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg,#b45309,#f59e0b)', color: '#0a0a0a', padding: '16px 40px', borderRadius: 14, border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(217,119,6,0.45)', display: 'flex', alignItems: 'center', gap: 8 }}>
                Book Consultation <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={() => window.open('https://wa.me/971501234567', '_blank')} style={{ fontFamily: S, fontSize: 14, fontWeight: 600, background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '16px 32px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FaWhatsapp className="w-5 h-5 text-green-400" /> WhatsApp Us
              </motion.button>
            </div>
          </Reveal>
          <Reveal dir="up" delay={0.4}>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {['No obligation consultation', 'Personalized strategy session', 'Live market insights report'].map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  <span style={{ fontFamily: S, fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-28 px-6 bg-white">
        <div className="max-w-[1340px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <Reveal dir="left" delay={0.1}>
                <div className="inline-block px-4 py-1.5 rounded-full mb-5" style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                  <span style={{ fontFamily: S, fontSize: 11, fontWeight: 700, color: '#92400e', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Get In Touch</span>
                </div>
              </Reveal>
              <Reveal dir="left" delay={0.15}>
                <h2 style={{ fontFamily: G, fontSize: 'clamp(30px,3.5vw,50px)', fontWeight: 800, color: '#111', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
                  Let's Discuss Your <span style={{ color: '#d97706' }}>Property Needs</span>
                </h2>
              </Reveal>
              <Reveal dir="left" delay={0.2}>
                <p style={{ fontFamily: S, fontSize: 15, fontWeight: 300, color: '#4b5563', lineHeight: 1.85, marginBottom: 36 }}>
                  Our expert team responds to all inquiries within 4 business hours. Reach us through your preferred channel.
                </p>
              </Reveal>
              <Stagger className="space-y-6">
                {[
                  { icon: MapPin, title: 'Dubai Office', desc: 'Business Bay, Dubai, UAE' },
                  { icon: Phone, title: 'Phone', desc: '+971 4 XXX XXXX\n+971 50 XXX XXXX' },
                  { icon: Mail, title: 'Email', desc: 'info@afsrealestate.com' },
                  { icon: MessageSquare, title: 'WhatsApp', desc: '+971 50 XXX XXXX\n9 AM – 9 PM GST' },
                ].map((c, i) => (
                  <StaggerItem key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#fef3c7' }}>
                      <c.icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div style={{ fontFamily: S, fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 3 }}>{c.title}</div>
                      <div style={{ fontFamily: S, fontSize: 13, fontWeight: 300, color: '#6b7280', whiteSpace: 'pre-line' }}>{c.desc}</div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal dir="left" delay={0.5}>
                <div className="mt-10 p-5 rounded-2xl" style={{ background: '#fafafa', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontFamily: S, fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 8 }}>Office Hours</div>
                  <div style={{ fontFamily: S, fontSize: 13, fontWeight: 300, color: '#4b5563' }}>
                    <div className="flex justify-between mb-1"><span>Sunday – Thursday</span><span className="font-medium">9:00 AM – 7:00 PM</span></div>
                    <div className="flex justify-between"><span>Friday – Saturday</span><span className="font-medium">By Appointment</span></div>
                  </div>
                </div>
              </Reveal>

              <Reveal dir="left" delay={0.6}>
                <div className="flex gap-3 mt-8">
                  {[FaLinkedin, FaInstagram, FaFacebook, FaTwitter].map((Icon, i) => (
                    <motion.a key={i} href="#" whileHover={{ scale: 1.12, y: -3 }} className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: '#fef3c7', color: '#d97706', border: '1px solid #fcd34d' }}>
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-3">
              <Reveal dir="right" delay={0.2}>
                <div className="rounded-3xl p-10" style={{ background: '#fafafa', border: '1px solid #e5e7eb', boxShadow: '0 8px 48px rgba(0,0,0,0.06)' }}>
                  <h4 style={{ fontFamily: G, fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 28, letterSpacing: '-0.01em' }}>Send Us a Message</h4>
                  <form className="space-y-5" onSubmit={e => { e.preventDefault(); alert('Thank you! We\'ll be in touch within 4 hours.'); }}>
                    <div className="grid md:grid-cols-2 gap-5">
                      {[{ label: 'Full Name', name: 'name', type: 'text', ph: 'Your full name' }, { label: 'Email Address', name: 'email', type: 'email', ph: 'email@example.com' }].map(f => (
                        <div key={f.name}>
                          <label style={{ fontFamily: S, fontSize: 12, fontWeight: 700, color: '#374151', letterSpacing: '0.06em', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>{f.label}</label>
                          <input type={f.type} placeholder={f.ph} value={(formData as any)[f.name]} onChange={e => setFormData(p => ({ ...p, [f.name]: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border bg-white" style={{ borderColor: '#e5e7eb', fontFamily: S, fontSize: 14 }} />
                        </div>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label style={{ fontFamily: S, fontSize: 12, fontWeight: 700, color: '#374151', letterSpacing: '0.06em', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>Phone Number</label>
                        <input type="tel" placeholder="+971 XX XXX XXXX" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border bg-white" style={{ borderColor: '#e5e7eb', fontFamily: S, fontSize: 14 }} />
                      </div>
                      <div>
                        <label style={{ fontFamily: S, fontSize: 12, fontWeight: 700, color: '#374151', letterSpacing: '0.06em', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>Service Interest</label>
                        <select value={formData.service} onChange={e => setFormData(p => ({ ...p, service: e.target.value }))} className="w-full px-4 py-3 rounded-xl border bg-white" style={{ borderColor: '#e5e7eb', fontFamily: S, fontSize: 14 }}>
                          <option>Property Valuation</option>
                          <option>Property Management</option>
                          <option>Investment Advisory</option>
                          <option>Tenant Placement</option>
                          <option>Maintenance Services</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label style={{ fontFamily: S, fontSize: 12, fontWeight: 700, color: '#374151', letterSpacing: '0.06em', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>Message</label>
                      <textarea rows={5} placeholder="Tell us about your property needs..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border bg-white resize-none" style={{ borderColor: '#e5e7eb', fontFamily: S, fontSize: 14 }} />
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl" style={{ background: 'linear-gradient(135deg,#b45309,#f59e0b)', color: '#0a0a0a', fontFamily: S, fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(217,119,6,0.35)', letterSpacing: '0.02em' }}>
                      Send Message <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#080808' }} className="pt-20 pb-10 px-6">
        <div className="max-w-[1340px] mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-14">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-600 to-amber-400 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span style={{ fontFamily: G, fontSize: 22, fontWeight: 800, color: '#fff' }}>
                  AFS <span style={{ color: '#f59e0b' }}>Real Estate</span>
                </span>
              </div>
              <p style={{ fontFamily: S, fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, maxWidth: 300, marginBottom: 20 }}>
                Dubai's premier property management firm. RERA licensed, client focused, result driven.
              </p>
              <div className="flex gap-3">
                {[FaLinkedin, FaInstagram, FaFacebook, FaTwitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: 'Services', links: ['Property Valuation', 'Property Management', 'Investment Advisory', 'Tenant Placement', 'Maintenance'] },
              { title: 'Company', links: ['About Us', 'Our Team', 'Careers', 'Press & Media', 'Testimonials'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Legal Disclaimer', 'RERA License'] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontFamily: S, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>{col.title}</div>
                <ul className="space-y-3">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" style={{ fontFamily: S, fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.45)' }} className="hover:text-amber-400 transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28 }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p style={{ fontFamily: S, fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.25)' }}>
                © 2026 AFS Real Estate. All rights reserved. Licensed by RERA Dubai.
              </p>
              <p style={{ fontFamily: S, fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
                Investment involves risk. Past performance does not guarantee future results.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}