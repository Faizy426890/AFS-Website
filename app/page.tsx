'use client';

import { motion, useReducedMotion, MotionValue, HTMLMotionProps, Variants } from 'framer-motion';
import React, { useState, useEffect, memo, FormEvent, ChangeEvent, useRef } from 'react';
import {
  ChevronRight,
  Building2,
  TrendingUp,
  Shield,
  Award,
  Users,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Star,
  Search,
  Globe,
  Target,
  Zap,
  DollarSign,
  BarChart3,
  FileText,
  Key,
  Wrench,
  ClipboardCheck,
  ChevronDown,
  Plus
} from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useScroll, useTransform } from 'framer-motion';

// ========== TYPE DEFINITIONS ==========
interface Stat {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PropertyService {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface ManagementService {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  title: string;
  content: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// ========== COMPONENT PROPS TYPES ==========
interface StatCardProps {
  stat: Stat;
  idx: number;
}

interface PropertyCardProps {
  property: PropertyService;
  idx: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  idx: number;
}

interface FAQItemProps {
  faq: FAQ;
  idx: number;
}

// ========== OPTIMIZED ANIMATION VARIANTS ==========
const createFadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay }
  }
});

const slideVariants: { left: Variants; right: Variants } = {
  left: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  },
  right: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  }
};

// ========== MEMOIZED COMPONENTS ==========
const StatCard = memo<StatCardProps>(({ stat, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: idx * 0.08, duration: 0.4 }}
    className="text-white"
  >
    <stat.icon className="w-9 h-9 mx-auto mb-2 opacity-90" />
    <div className="text-3xl font-semibold mb-1 tracking-tight">{stat.number}</div>
    <div className="text-amber-100/80 font-light text-sm">{stat.label}</div>
  </motion.div>
));

StatCard.displayName = 'StatCard';

const PropertyCard = memo<PropertyCardProps>(({ property, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: idx * 0.06, duration: 0.4 }}
    className="bg-white p-7 rounded-3xl border border-gray-200 hover:border-amber-200 hover:shadow-xl transition-all duration-300 group"
  >
    <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <property.icon className="w-7 h-7 text-white" />
    </div>
    <h4 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">{property.title}</h4>
    <p className="text-gray-600 leading-relaxed font-light text-[15px]">{property.description}</p>
  </motion.div>
));

PropertyCard.displayName = 'PropertyCard';

const TestimonialCard = memo<TestimonialCardProps>(({ testimonial, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: idx * 0.06, duration: 0.4 }}
    className="bg-white p-7 rounded-3xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
  >
    <div className="flex mb-3">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
      ))}
    </div>
    <p className="text-gray-600 mb-5 leading-relaxed font-light text-[15px] italic">"{testimonial.content}"</p>
    <div className="flex items-center space-x-3">
      <div className="w-11 h-11 bg-amber-500 rounded-full flex items-center justify-center text-white font-medium text-base">
        {testimonial.name.charAt(0)}
      </div>
      <div>
        <div className="font-semibold text-gray-900 text-sm tracking-tight">{testimonial.name}</div>
        <div className="text-xs text-gray-500 font-light">{testimonial.title}</div>
      </div>
    </div>
  </motion.div>
));

TestimonialCard.displayName = 'TestimonialCard';

const FAQItem = memo<FAQItemProps>(({ faq, idx }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.05, duration: 0.4 }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        type="button"
      >
        <span className="font-semibold text-gray-900 text-base tracking-tight pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <Plus className={`w-5 h-5 ${isOpen ? 'text-amber-600' : 'text-gray-400'}`} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-gray-600 leading-relaxed font-light text-[15px]">
          {faq.answer}
        </div>
      </motion.div>
    </motion.div>
  );
});

FAQItem.displayName = 'FAQItem';

// ========== MAIN COMPONENT ==========
export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: 'Property Valuation',
    message: ''
  });

  // Scroll helpers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 4 business hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Property Valuation',
      message: ''
    });
  };

  const handleBookConsultation = () => {
    scrollToSection('contact');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/971501234567', '_blank');
  };

  const [location, setLocation] = useState<string>("Dubai");
  const [propertyType, setPropertyType] = useState<string>("Apartment");
  const [priceRange, setPriceRange] = useState<string>("Max Price");

  const navLinks = ["About", "Services", "Management", "FAQ", "Contact"];
  const suggestions = ["Apartment", "Duplexes", "Mannor", "Commercial", "Swimming pool"];

  // Data arrays with proper typing
  const stats: Stat[] = [
    { number: '12+', label: 'Years Excellence', icon: Award },
    { number: '450+', label: 'Satisfied Clients', icon: Users },
    { number: '$2.8B+', label: 'Portfolio Value', icon: TrendingUp },
    { number: '98%', label: 'Client Retention', icon: Star }
  ];

  const propertyManagement: PropertyService[] = [
    {
      icon: FileText,
      title: 'Property Valuation',
      description: 'All-inclusive real estate services to facilitate the easy and confident purchase, sale, and management of your properties.'
    },
    {
      icon: Building2,
      title: 'Property Management',
      description: 'Business consulting involves providing expert advice and services to real estate improve performance services and achieve.'
    },
    {
      icon: TrendingUp,
      title: 'Invest Opportunities',
      description: 'Real estate services facilitate the easy and confident purchase, sale, and management of your properties experiencing growth.'
    }
  ];

  const managementServices: ManagementService[] = [
    {
      icon: Key,
      title: 'Tenant Management',
      description: 'Comprehensive tenant screening, placement, and relationship management to ensure reliable occupancy and timely rent collection.'
    },
    {
      icon: Wrench,
      title: 'Maintenance & Repairs',
      description: '24/7 maintenance coordination with vetted contractors. We handle everything from routine inspections to emergency repairs.'
    },
    {
      icon: DollarSign,
      title: 'Rent Collection',
      description: 'Automated rent collection systems with transparent financial reporting. Direct deposits to your account on schedule.'
    },
    {
      icon: FileText,
      title: 'Legal Compliance',
      description: 'Stay compliant with all local regulations, RERA requirements, and tenant laws. We handle all documentation and renewals.'
    },
    {
      icon: BarChart3,
      title: 'Financial Reporting',
      description: 'Detailed monthly reports covering income, expenses, and property performance metrics accessible through our client portal.'
    },
    {
      icon: ClipboardCheck,
      title: 'Property Inspections',
      description: 'Regular property inspections to maintain asset value. Detailed reports with photos and recommended actions.'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Ahmed Al-Rashid',
      title: 'Property Investor, Dubai',
      content: 'AFS Real Estate has been managing my portfolio for 3 years. Their tenant screening is excellent and I receive my rent on time every month without any hassle.',
      rating: 5
    },
    {
      name: 'Sarah Mitchell',
      title: 'Property Owner, London',
      content: 'As an overseas investor, I needed a team I could trust completely. AFS handles everything professionally and their monthly reports are very detailed.',
      rating: 5
    },
    {
      name: 'Khalid bin Mohammed',
      title: 'Real Estate Developer, Abu Dhabi',
      content: 'Their property management service is exceptional. They take care of all maintenance issues promptly and keep my properties in top condition.',
      rating: 5
    },
    {
      name: 'Maria Fernandez',
      title: 'Villa Owner, Dubai Marina',
      content: 'I was worried about managing my villa while living abroad. AFS made it completely stress-free with their comprehensive management services.',
      rating: 5
    },
    {
      name: 'Robert Chen',
      title: 'Apartment Owner, Downtown Dubai',
      content: 'The financial transparency is outstanding. I can see exactly where every dirham goes through their online portal. Highly recommend their services.',
      rating: 5
    },
    {
      name: 'Fatima Al-Qassimi',
      title: 'Property Investor, Sharjah',
      content: 'AFS found excellent tenants for my properties and handles all the legal paperwork. Their service has exceeded my expectations.',
      rating: 5
    }
  ];

  const faqs: FAQ[] = [
    {
      question: 'Do you assist with off-plan property investments?',
      answer: 'Yes, we provide comprehensive advisory services for off-plan investments including developer due diligence, payment plan analysis, market research, and future value projections. We work with reputable developers across Dubai, Abu Dhabi, and other emirates to ensure you make informed investment decisions.'
    },
    {
      question: 'Can you help first-time buyers in Dubai?',
      answer: 'Absolutely! We specialize in guiding first-time buyers through the entire process. Our services include property search assistance, mortgage broker connections, legal documentation support, RERA registration, and post-purchase property management. We make your first property purchase smooth and stress-free.'
    },
    {
      question: 'Do you handle both residential and commercial properties?',
      answer: 'Yes, we manage both residential properties (apartments, villas, townhouses) and commercial properties (offices, retail spaces, warehouses). Our team has specialized expertise in each sector to maximize your property\'s potential and ensure optimal returns.'
    },
    {
      question: 'Do you provide property management services?',
      answer: 'Yes, comprehensive property management is our core service. We handle tenant placement, rent collection, maintenance coordination, legal compliance, financial reporting, and regular property inspections. Our goal is to maximize your rental income while minimizing your involvement in day-to-day operations.'
    },
    {
      question: 'How do you help property investors?',
      answer: 'We provide end-to-end support including market analysis, property valuation, investment strategy consulting, acquisition support, financing assistance, and ongoing portfolio management. Our data-driven approach helps investors identify high-yield opportunities and optimize their real estate portfolios for maximum returns.'
    },
    {
      question: 'Can you help landlords find tenants?',
      answer: 'Yes, tenant sourcing is one of our key services. We conduct thorough tenant screening including credit checks, employment verification, and reference checks. We market your property through multiple channels, conduct viewings, negotiate lease terms, and handle all documentation to ensure you get reliable, quality tenants.'
    }
  ];

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const faqRef = useRef<HTMLElement>(null);

  // Background image loaded state
  const [loaded, setLoaded] = useState(false);

  const [activeNav, setActiveNav] = useState<string>("Home");

  const locations = ["Los Angeles", "Dubai Marina", "Downtown Dubai", "Palm Jumeirah", "Beverly Hills"];
  const propertyTypes = ["Apartment", "Duplex", "Mansion", "Commercial", "Villa"];
  const priceRanges = ["Max Price", "Below AED 1M", "AED 1M - 2M", "AED 2M - 4M", "Above AED 4M"];

  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  const handleExplore = () => scrollToSection('services');
  const handleConsult = () => scrollToSection('contact');
  const handleLetstalk = () => scrollToSection('contact');
  const handleSearch = () => alert(`🔍 Searching: Location: ${location}, Type: ${propertyType}, Price: ${priceRange}\n(Interactive demo — full listing integration ready)`);
  const handleChipClick = (chip: string) => alert(`🔍 Filtering by "${chip}" properties`);

  const handleNavClick = (link: string) => {
    setActiveNav(link);
    if (link === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const id = link.toLowerCase();
      scrollToSection(id);
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Navigation */}
      <div
        onClick={closeAllDropdowns}
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          position: "relative",
          minHeight: "88vh",
          overflow: "hidden",
          background: "#0a0d06",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

          .af-ui { font-family: 'Inter', sans-serif; }

          /* BG image */
          .af-bg {
            position: absolute; inset: 0; z-index: 0;
          }
          .af-bg img {
            width: 100%; height: 100%; object-fit: cover;
            filter: brightness(0.78) saturate(0.9) contrast(1.02);
            transform: scale(1.04);
            transition: transform 8s ease;
          }
          .af-bg img.loaded { transform: scale(1); }

          /* Cinematic overlays - softer, brighter fade (like reference image) */
          .af-overlay-left {
            position: absolute; inset: 0;
            background: linear-gradient(105deg, rgba(5,8,3,0.88) 0%, rgba(5,8,3,0.72) 45%, transparent 80%);
          }
          .af-overlay-bottom {
            position: absolute; bottom: 0; left: 0; right: 0; height: 35%;
            background: linear-gradient(to top, rgba(5,8,3,0.55), transparent 70%);
          }

          /* Noise texture */
          .af-noise {
            position: absolute; inset: 0; opacity: 0.02; z-index: 1;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            background-size: 200px 200px;
          }

          /* Animations */
          @keyframes af-up {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes af-fade { from { opacity: 0; } to { opacity: 1; } }

          .af-a1 { animation: af-up 0.9s cubic-bezier(.22,.68,0,1) 0.1s both; }
          .af-a2 { animation: af-up 0.9s cubic-bezier(.22,.68,0,1) 0.28s both; }
          .af-a3 { animation: af-up 0.9s cubic-bezier(.22,.68,0,1) 0.44s both; }
          .af-a4 { animation: af-up 0.9s cubic-bezier(.22,.68,0,1) 0.58s both; }
          .af-a5 { animation: af-up 0.9s cubic-bezier(.22,.68,0,1) 0.72s both; }
          .af-nav-anim { animation: af-fade 0.7s ease 0.05s both; }

          /* Nav */
          .af-nav {
            position: relative; z-index: 50;
            padding: 22px 32px 0;
          }
          .af-nav-inner {
            max-width: 1240px; margin: 0 auto;
            display: flex; align-items: center; justify-content: space-between;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 14px;
            padding: 14px 28px;
            background: rgba(8,11,5,0.35);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
          .af-logo {
            font-size: 17px; font-weight: 600;
            letter-spacing: 0.18em; text-transform: uppercase;
            color: #fff;
          }
          .af-logo span { color: #c98a02; }

          .af-navlinks { display: flex; align-items: center; gap: 36px; }
          .af-navlink {
            background: none; border: none; cursor: pointer;
            font-family: 'Inter', sans-serif;
            font-size: 13px; font-weight: 400;
            color: rgba(255,255,255,0.6);
            letter-spacing: 0.04em;
            padding: 0; position: relative;
            transition: color 0.2s;
          }
          .af-navlink::after {
            content: '';
            position: absolute; bottom: -3px; left: 0;
            width: 0; height: 1px; background: #c98a02;
            transition: width 0.25s ease;
          }
          .af-navlink:hover { color: #fff; }
          .af-navlink:hover::after { width: 100%; }
          .af-navlink.af-active { color: #c98a02; }
          .af-navlink.af-active::after { width: 100%; }

          .af-cta-btn {
            font-family: 'Inter', sans-serif;
            font-size: 13px; font-weight: 500;
            background: #c98a02; color: #0a0d06;
            border: none; cursor: pointer;
            padding: 10px 22px; border-radius: 8px;
            letter-spacing: 0.04em;
            transition: background 0.2s, transform 0.15s;
          }
          .af-cta-btn:hover { background: #ffd51a; transform: scale(1.02); }

          /* Hamburger */
          .af-hamburger {
            display: none; flex-direction: column; gap: 5px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 8px; padding: 10px 12px; cursor: pointer;
          }
          .af-hamburger span {
            display: block; height: 1.5px; background: #fff;
            border-radius: 2px; transition: all 0.2s;
          }
          .af-hamburger span:nth-child(2) { width: 14px; background: #c98a02; }

          /* Mobile sidebar */
          .af-sidebar {
            position: fixed; inset: 0; z-index: 200;
            pointer-events: none;
          }
          .af-sidebar.open { pointer-events: all; }
          .af-sidebar-scrim {
            position: absolute; inset: 0;
            background: rgba(0,0,0,0); transition: background 0.35s;
          }
          .af-sidebar.open .af-sidebar-scrim { background: rgba(0,0,0,0.6); }
          .af-sidebar-panel {
            position: absolute; top: 0; left: 0; bottom: 0;
            width: 280px; background: #0c0f07;
            border-right: 1px solid rgba(201,240,0,0.12);
            padding: 0; display: flex; flex-direction: column;
            transform: translateX(-100%);
            transition: transform 0.38s cubic-bezier(.4,0,.2,1);
          }
          .af-sidebar.open .af-sidebar-panel { transform: translateX(0); }
          .af-sidebar-header {
            padding: 24px 24px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            display: flex; align-items: center; justify-content: space-between;
          }
          .af-sidebar-close {
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.1);
            color: rgba(255,255,255,0.7); border-radius: 7px;
            width: 34px; height: 34px; cursor: pointer;
            font-size: 16px; display: flex; align-items: center; justify-content: center;
            transition: background 0.15s;
          }
          .af-sidebar-close:hover { background: rgba(255,255,255,0.12); }
          .af-sidebar-links { padding: 16px 16px; flex: 1; }
          .af-sidebar-link {
            display: block; width: 100%; text-align: left;
            background: none; border: none;
            font-family: 'Inter', sans-serif;
            font-size: 15px; font-weight: 400;
            color: rgba(255,255,255,0.65);
            padding: 13px 16px; border-radius: 9px; cursor: pointer;
            transition: background 0.15s, color 0.15s;
            letter-spacing: 0.02em;
          }
          .af-sidebar-link:hover { background: rgba(255,255,255,0.05); color: #fff; }
          .af-sidebar-link.af-active-s {
            background: rgba(201,240,0,0.08);
            color: #c98a02;
            border-left: 2px solid #c98a02;
            padding-left: 14px;
          }
          .af-sidebar-footer {
            padding: 20px 24px 28px;
            border-top: 1px solid rgba(255,255,255,0.06);
          }

          /* Hero */
          .af-hero-content {
            position: relative; z-index: 10;
            max-width: 1240px; margin: 0 auto;
            padding: 64px 32px 56px;
            display: flex; flex-direction: column;
            min-height: calc(88vh - 90px);
            justify-content: space-between;
          }

          /* Eyebrow */
          .af-eyebrow {
            display: inline-flex; align-items: center; gap: 10px;
            margin-bottom: 28px;
          }
          .af-eyebrow-line {
            width: 32px; height: 1px; background: #c98a02;
          }
          .af-eyebrow-text {
            font-family: 'Inter', sans-serif;
            font-size: 11px; font-weight: 500;
            letter-spacing: 0.2em; text-transform: uppercase;
            color: rgba(255,255,255,0.5);
          }

          /* Headline */
          .af-h1 {
            font-size: clamp(46px, 6.5vw, 88px);
            font-weight: 300;
            line-height: 1.02;
            letter-spacing: -0.01em;
            color: #fff;
            margin: 0 0 24px;
          }
          .af-h1 em {
            font-style: italic;
            font-weight: 600;
            color: #c98a02;
          }

          .af-body {
            font-family: 'Inter', sans-serif;
            font-size: clamp(14px, 1.5vw, 16px);
            line-height: 1.8;
            color: rgba(255,255,255,0.5);
            max-width: 460px;
            margin: 0 0 36px;
            font-weight: 300;
          }

          /* Hero CTAs */
          .af-hero-btns {
            display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 0;
          }
          .af-btn-primary {
            font-family: 'Inter', sans-serif;
            font-size: 13px; font-weight: 500;
            background: #c98a02; color: #0a0d06;
            border: none; cursor: pointer;
            padding: 13px 28px; border-radius: 8px;
            letter-spacing: 0.05em;
            transition: background 0.2s, transform 0.15s;
          }
          .af-btn-primary:hover { background: #ffd51a; transform: scale(1.02); }

          .af-btn-ghost {
            font-family: 'Inter', sans-serif;
            font-size: 13px; font-weight: 400;
            background: transparent;
            color: rgba(255,255,255,0.7);
            border: 1px solid rgba(255,255,255,0.18);
            cursor: pointer;
            padding: 13px 28px; border-radius: 8px;
            letter-spacing: 0.04em;
            transition: border-color 0.2s, color 0.2s;
          }
          .af-btn-ghost:hover { border-color: rgba(255,255,255,0.4); color: #fff; }

          /* Search panel */
          .af-search {
            background: rgba(8,11,5,0.55);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 14px;
            padding: 6px;
            display: flex; flex-wrap: wrap;
            gap: 0;
            max-width: 860px;
            margin-bottom: 0;
          }

          .af-search-field {
            flex: 1 1 160px;
            padding: 16px 22px;
            border-right: 1px solid rgba(255,255,255,0.08);
            cursor: pointer; position: relative;
            min-width: 130px;
            transition: background 0.15s;
            border-radius: 10px;
          }
          .af-search-field:last-of-type { border-right: none; }
          .af-search-field:hover { background: rgba(255,255,255,0.04); }

          .af-field-label {
            font-family: 'Inter', sans-serif;
            font-size: 10px; font-weight: 500;
            letter-spacing: 0.12em; text-transform: uppercase;
            color: rgba(255,255,255,0.35);
            margin-bottom: 5px;
          }
          .af-field-value {
            font-family: 'Inter', sans-serif;
            font-size: 14px; font-weight: 500;
            color: #fff;
            display: flex; align-items: center; gap: 6px;
          }
          .af-chevron {
            color: rgba(255,255,255,0.3); font-size: 10px; margin-left: auto;
          }

          /* Dropdown */
          .af-dropdown {
            position: absolute; top: calc(100% + 8px); left: 0;
            min-width: 200px;
            background: #111507;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 12px;
            padding: 6px;
            z-index: 100;
            box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          }
          .af-dropdown-item {
            font-family: 'Inter', sans-serif;
            font-size: 14px; font-weight: 400;
            color: rgba(255,255,255,0.7);
            padding: 10px 14px;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.12s, color 0.12s;
          }
          .af-dropdown-item:hover { background: rgba(201,240,0,0.1); color: #c98a02; }

          /* Search button */
          .af-search-btn-wrap { padding: 6px; }
          .af-search-btn {
            font-family: 'Inter', sans-serif;
            font-size: 13px; font-weight: 600;
            background: #c98a02; color: #0a0d06;
            border: none; cursor: pointer;
            padding: 16px 28px;
            border-radius: 10px;
            white-space: nowrap;
            letter-spacing: 0.04em;
            transition: background 0.2s;
            display: flex; align-items: center; gap: 8px;
          }
          .af-search-btn:hover { background: #ffd51a; }

          /* Chips */
          .af-chips {
            display: flex; flex-wrap: wrap;
            align-items: center; gap: 8px;
            margin-top: 16px;
          }
          .af-chip-label {
            font-family: 'Inter', sans-serif;
            font-size: 12px; font-weight: 500;
            color: rgba(255,255,255,0.35);
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }
          .af-chip {
            font-family: 'Inter', sans-serif;
            font-size: 12px; font-weight: 400;
            background: transparent;
            color: rgba(255,255,255,0.55);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 99px;
            padding: 6px 14px;
            cursor: pointer;
            transition: border-color 0.2s, color 0.2s;
          }
          .af-chip:hover { border-color: #c98a02; color: #c98a02; }

          /* Vertical stat stripe */
          .af-stats-stripe {
            position: absolute; right: 32px; top: 50%;
            transform: translateY(-50%);
            display: flex; flex-direction: column; gap: 1px;
            z-index: 20;
          }
          .af-stat-item {
            padding: 18px 20px;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 10px;
            background: rgba(8,11,5,0.45);
            backdrop-filter: blur(14px);
            text-align: center;
            min-width: 92px;
          }
          .af-stat-item + .af-stat-item { margin-top: 8px; }
          .af-stat-num {
            font-size: 22px; font-weight: 600;
            color: #c98a02; line-height: 1;
            margin-bottom: 4px;
          }
          .af-stat-lbl {
            font-family: 'Inter', sans-serif;
            font-size: 10px; font-weight: 400;
            color: rgba(255,255,255,0.4);
            line-height: 1.3;
            text-transform: uppercase; letter-spacing: 0.06em;
          }

          /* FAQ Section */
          .af-faq-section {
            position: relative; z-index: 10;
            max-width: 1060px; margin: 60px auto 80px;
            padding: 0 32px;
          }
          .af-faq-wrapper {
            background: rgba(8,11,5,0.5);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 28px;
            padding: 44px 48px;
          }
          .af-faq-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 38px; font-weight: 400;
            color: #fff; letter-spacing: -0.3px;
            margin-bottom: 12px;
          }
          .af-faq-title span { color: #c98a02; font-weight: 600; }
          .af-faq-sub {
            font-family: 'Inter', sans-serif;
            font-size: 14px; color: rgba(255,255,255,0.5);
            margin-bottom: 40px;
          }
          .faq-item {
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding: 20px 0;
          }
          .faq-question {
            font-family: 'Inter', sans-serif;
            font-weight: 500; font-size: 18px;
            color: #fff; display: flex;
            justify-content: space-between;
            cursor: pointer;
            letter-spacing: -0.2px;
          }
          .faq-answer {
            font-family: 'Inter', sans-serif;
            font-size: 14px; color: rgba(255,255,255,0.65);
            line-height: 1.6; margin-top: 12px;
            padding-right: 20px;
          }
          .faq-icon {
            color: #c98a02; font-size: 20px;
            transition: transform 0.2s;
          }

          /* Responsive */
          @media (max-width: 900px) {
            .af-stats-stripe { display: none; }
          }
          @media (max-width: 768px) {
            .af-navlinks, .af-cta-btn { display: none !important; }
            .af-hamburger { display: flex !important; }
            .af-hero-content { padding: 36px 20px 44px; }
            .af-nav { padding: 16px 16px 0; }
            .af-nav-inner { padding: 12px 18px; }
            .af-search { flex-direction: column; }
            .af-search-field { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
            .af-search-field:last-of-type { border-bottom: none; }
            .af-search-btn-wrap { padding: 6px 6px 6px; }
            .af-search-btn { width: 100%; justify-content: center; }
            .af-faq-wrapper { padding: 32px 24px; }
            .faq-question { font-size: 16px; }
          }
        `}</style>

        {/* BG with softer fade */}
        <div className="af-bg">
          <img
            src="https://res.cloudinary.com/daxjhteb5/image/upload/v1777258170/ChatGPT_Image_Apr_27_2026_07_48_28_AM_g1otb5.png"
            alt="Luxury real estate skyline"
            className={loaded ? "loaded" : ""}
            onLoad={() => setLoaded(true)}
          />
          <div className="af-overlay-left" />
          <div className="af-overlay-bottom" />
          <div className="af-noise" />
        </div>

        {/* Mobile sidebar */}
        <div className={`af-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="af-sidebar-scrim" onClick={() => setSidebarOpen(false)} />
          <div className="af-sidebar-panel">
            <div className="af-sidebar-header">
              <span className="af-logo">AFS <span>RE</span></span>
              <button className="af-sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
            </div>
            <div className="af-sidebar-links">
              <button
                className={`af-sidebar-link ${activeNav === "Home" ? "af-active-s" : ""}`}
                onClick={() => handleNavClick("Home")}
              >
                Home
              </button>
              {navLinks.map((link) => (
                <button
                  key={link}
                  className={`af-sidebar-link ${activeNav === link ? "af-active-s" : ""}`}
                  onClick={() => handleNavClick(link)}
                >
                  {link}
                </button>
              ))}
            </div>
            <div className="af-sidebar-footer">
              <button className="af-btn-primary" style={{ width: "100%", padding: "14px 0" }} onClick={handleConsult}>
                Let's Talk
              </button>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="af-nav af-nav-anim">
          <div className="af-nav-inner">
            <span className="af-logo">AFS <span>Real Estate</span></span>

            <nav className="af-navlinks">
              <button onClick={() => handleNavClick("Home")} className={`af-navlink ${activeNav === "Home" ? "af-active" : ""}`}>
                Home
              </button>
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className={`af-navlink ${activeNav === link ? "af-active" : ""}`}
                >
                  {link}
                </button>
              ))}
            </nav>

            <button className="af-cta-btn" onClick={handleConsult}>Let's Talk →</button>

            <button
              className="af-hamburger"
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(true); }}
            >
              <span style={{ width: 20 }} />
              <span />
              <span style={{ width: 20 }} />
            </button>
          </div>
        </div>

        {/* Hero section */}
        <div className="af-hero-content">
          <div style={{ maxWidth: 680 }}>
            <div className="af-eyebrow af-a1">
              <div className="af-eyebrow-line" />
              <span className="af-eyebrow-text">Dubai's Premier Real Estate Partner</span>
            </div>

            <h1 className="af-h1 af-a2">
              Your Gateway to<br />
              <em>Smart Property</em><br />
              Solutions
            </h1>

            <p className="af-body af-a3">
              Navigate Dubai's dynamic real estate market with confidence. We deliver expert property management and investment advisory services to help you maximize returns and minimize hassle.
            </p>

            <div className="af-hero-btns af-a4">
              <button className="af-btn-primary" onClick={handleExplore}>Explore Properties →</button>
              <button className="af-btn-ghost" onClick={handleConsult}>Book Consultation</button>
            </div>
          </div>

          {/* Search bar + chips */}
          <div className="af-a5" style={{ marginTop: 52 }}>
            <div
              className="af-search"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Location */}
              <div className="af-search-field" onClick={(e) => toggleDropdown("loc", e)}>
                <div className="af-field-label">Location</div>
                <div className="af-field-value">
                  {location}
                  <span className="af-chevron">▾</span>
                </div>
                {openDropdown === "loc" && (
                  <div className="af-dropdown">
                    {locations.map((l) => (
                      <div key={l} className="af-dropdown-item" onClick={() => { setLocation(l); setOpenDropdown(null); }}>{l}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Type */}
              <div className="af-search-field" onClick={(e) => toggleDropdown("type", e)}>
                <div className="af-field-label">Property Type</div>
                <div className="af-field-value">
                  {propertyType}
                  <span className="af-chevron">▾</span>
                </div>
                {openDropdown === "type" && (
                  <div className="af-dropdown">
                    {propertyTypes.map((t) => (
                      <div key={t} className="af-dropdown-item" onClick={() => { setPropertyType(t); setOpenDropdown(null); }}>{t}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="af-search-field" onClick={(e) => toggleDropdown("price", e)}>
                <div className="af-field-label">Price Range</div>
                <div className="af-field-value">
                  {priceRange}
                  <span className="af-chevron">▾</span>
                </div>
                {openDropdown === "price" && (
                  <div className="af-dropdown">
                    {priceRanges.map((p) => (
                      <div key={p} className="af-dropdown-item" onClick={() => { setPriceRange(p); setOpenDropdown(null); }}>{p}</div>
                    ))}
                  </div>
                )}
              </div>

              <div className="af-search-btn-wrap">
                <button className="af-search-btn" onClick={handleSearch}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Search
                </button>
              </div>
            </div>

            {/* Suggestion chips */}
            <div className="af-chips">
              <span className="af-chip-label">Popular:</span>
              {suggestions.map((s) => (
                <button key={s} className="af-chip" onClick={() => handleChipClick(s)}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical stats stripe */}
        <div className="af-stats-stripe af-a3">
          {[["1,200+", "Properties Sold"], ["AED 4.2B", "Transactions"], ["98%", "Satisfaction"], ["15 Yrs", "In Dubai"]].map(([n, l]) => (
            <div key={l} className="af-stat-item">
              <div className="af-stat-num">{n}</div>
              <div className="af-stat-lbl">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section - solid amber background */}
      <section className="py-14 px-6 bg-amber-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <StatCard key={idx} stat={stat} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Property Management Cards */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={createFadeIn()}
            className="text-center mb-14"
          >
            <h2 className="text-xs font-semibold text-amber-500 mb-3 uppercase tracking-widest">Our Core Services</h2>
            <h3 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-5 tracking-tight">
              Comprehensive Property Solutions
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
              From valuation to investment opportunities, we provide end-to-end property services
              tailored to your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {propertyManagement.map((property, idx) => (
              <PropertyCard key={idx} property={property} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideVariants.left}
            >
              <h2 className="text-xs font-semibold text-amber-500 mb-3 uppercase tracking-widest">About AFS Real Estate</h2>
              <h3 className="text-4xl font-semibold text-gray-900 mb-5 tracking-tight">
                Your Trusted Property Management Partner
              </h3>
              <p className="text-gray-600 mb-5 leading-relaxed font-light text-[15px]">
                Founded in 2013, AFS Real Estate has emerged as Dubai's premier property management
                firm. With a deep understanding of the UAE real estate market, we help property owners
                maximize their investments while minimizing day-to-day management responsibilities.
              </p>
              <p className="text-gray-600 mb-7 leading-relaxed font-light text-[15px]">
                Our team of experienced professionals combines local market expertise with innovative
                technology to deliver exceptional results. We don't just manage properties—we build
                long-term wealth for our clients.
              </p>

              <div className="space-y-3">
                {[
                  'Licensed and regulated by RERA Dubai',
                  'Transparent monthly financial reporting',
                  'Vetted contractor network for maintenance',
                  '24/7 emergency support for tenants and owners'
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className="flex items-start space-x-2"
                  >
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-light text-[15px]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideVariants.right}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-5">
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <Globe className="w-9 h-9 text-amber-500 mb-3" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">Dubai-Based</h4>
                    <p className="text-gray-600 text-sm font-light">Strategic office in the heart of Dubai</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mt-8">
                    <Shield className="w-9 h-9 text-amber-500 mb-3" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">Trust & Security</h4>
                    <p className="text-gray-600 text-sm font-light">Fully licensed and insured operations</p>
                  </div>
                </div>
                <div className="space-y-5 mt-12">
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <Target className="w-9 h-9 text-amber-500 mb-3" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">Client-Focused</h4>
                    <p className="text-gray-600 text-sm font-light">Personalized service for every client</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <Zap className="w-9 h-9 text-amber-500 mb-3" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">Market Expertise</h4>
                    <p className="text-gray-600 text-sm font-light">12+ years of Dubai real estate mastery</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Property Management Services */}
      <section id="management" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={createFadeIn()}
            className="text-center mb-14"
          >
            <h2 className="text-xs font-semibold text-amber-500 mb-3 uppercase tracking-widest">Property Management</h2>
            <h3 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-5 tracking-tight">
              Complete Management Solutions
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
              From tenant placement to financial reporting, we handle every aspect of property
              management so you can focus on growing your portfolio.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {managementServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="bg-white p-7 rounded-3xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-amber-200 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-amber-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed font-light text-[15px]">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={createFadeIn()}
            className="text-center mb-14"
          >
            <h2 className="text-xs font-semibold text-amber-500 mb-3 uppercase tracking-widest">Client Success Stories</h2>
            <h3 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-5 tracking-tight">
              What Our Clients Say
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} testimonial={testimonial} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={faqRef} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={createFadeIn()}
            className="mb-14"
          >
            <div className="text-left mb-8">
              <h2 className="text-xs font-semibold text-amber-500 mb-3 uppercase tracking-widest">NEED HELP</h2>
              <h3 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2 tracking-tight">
                Frequently <span className="italic font-light">Asked Questions</span>
              </h3>
              <p className="text-2xl font-semibold text-gray-900 tracking-tight">Buying And Renting</p>
            </div>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} idx={idx} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-12 bg-amber-500 rounded-3xl p-8 text-white"
          >
            <h4 className="text-2xl font-semibold mb-2 tracking-tight">Still have a questions?</h4>
            <p className="text-amber-100 mb-6 font-light">Get in touch with AFS Properties today, and let us assist you with confidence and transparency.</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConsult}
              className="bg-white text-amber-600 px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
              type="button"
            >
              CONTACT US
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#1752bf] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={createFadeIn()}
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-5 tracking-tight">
              Ready to Optimize Your Property Investment?
            </h2>
            <p className="text-lg text-amber-100 mb-9 leading-relaxed font-light">
              Schedule a consultation with our property management experts. Discover how we can help
              you maximize returns and minimize the hassle of property ownership.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConsult}
                className="bg-white text-[#1752bf] px-8 py-4 rounded-full font-semibold text-base shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2"
                type="button"
              >
                <span>Book Your Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="bg-[#265bbd] text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-base hover:bg-[#1752bf] transition-all flex items-center space-x-2"
                type="button"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: +971 50 XXX XXXX</span>
              </motion.button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/90">
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-light">No obligation consultation</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-light">Personalized strategy session</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-light">Market insights report</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideVariants.left}
            >
              <h2 className="text-xs font-semibold text-amber-500 mb-3 uppercase tracking-widest">Get In Touch</h2>
              <h3 className="text-4xl font-semibold text-gray-900 mb-5 tracking-tight">
                Let's Discuss Your Property Needs
              </h3>
              <p className="text-gray-600 mb-7 leading-relaxed font-light text-[15px]">
                Our property management team is ready to help you optimize your real estate investments.
                Reach out through your preferred channel—we respond to all inquiries within 4 business hours.
              </p>

              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm tracking-tight">Dubai Office</h4>
                    <p className="text-gray-600 text-sm font-light">Business Bay, Dubai<br />United Arab Emirates</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm tracking-tight">Phone</h4>
                    <p className="text-gray-600 text-sm font-light">UAE: +971 4 XXX XXXX<br />Mobile: +971 50 XXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm tracking-tight">Email</h4>
                    <p className="text-gray-600 text-sm font-light">info@afsrealestate.com<br />management@afsrealestate.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-11 h-11 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm tracking-tight">WhatsApp</h4>
                    <p className="text-gray-600 text-sm font-light">+971 50 XXX XXXX<br />Available 9 AM - 9 PM GST</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-5 bg-gray-50 rounded-2xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm tracking-tight">Office Hours</h4>
                <div className="space-y-1 text-gray-600 text-sm font-light">
                  <p><span className="font-medium">Sunday - Thursday:</span> 9:00 AM - 7:00 PM</p>
                  <p><span className="font-medium">Friday - Saturday:</span> By Appointment</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideVariants.right}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-7"
            >
              <h4 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Send Us a Message</h4>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-light"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-light"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-light"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service of Interest</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-light"
                  >
                    <option>Property Valuation</option>
                    <option>Property Management</option>
                    <option>Investment Opportunities</option>
                    <option>Tenant Placement</option>
                    <option>Maintenance Services</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none font-light"
                    placeholder="Tell us about your property needs..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-amber-500 text-white py-3.5 rounded-2xl font-semibold text-base shadow-lg hover:bg-amber-600 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold tracking-tight">AFS Real Estate</span>
              </div>
              <p className="text-gray-400 mb-5 font-light text-sm">
                Your trusted partner for premium property management and investment advisory in Dubai.
              </p>
              <div className="flex space-x-3">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-4 tracking-tight">Services</h4>
              <ul className="space-y-2 text-gray-400 font-light text-sm">
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Property Valuation</a></li>
                <li><a href="#management" className="hover:text-amber-400 transition-colors">Property Management</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Investment Opportunities</a></li>
                <li><a href="#management" className="hover:text-amber-400 transition-colors">Tenant Placement</a></li>
                <li><a href="#management" className="hover:text-amber-400 transition-colors">Maintenance Services</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-4 tracking-tight">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 font-light text-sm">
                <li><a href="#about" className="hover:text-amber-400 transition-colors">About Us</a></li>
                <li><a href="#management" className="hover:text-amber-400 transition-colors">Our Services</a></li>
                <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-4 tracking-tight">Company</h4>
              <ul className="space-y-2 text-gray-400 font-light text-sm">
                <li><a href="#about" className="hover:text-amber-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Press & Media</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-7">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <p className="text-gray-400 text-sm font-light">
                © 2026 AFS Real Estate. All rights reserved.
              </p>
              <div className="flex space-x-5 text-sm text-gray-400 font-light">
                <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Legal Disclaimer</a>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-5 text-center font-light">
              AFS Real Estate is a licensed property management firm operating under RERA Dubai regulations.
              Investment involves risk. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}