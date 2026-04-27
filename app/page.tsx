'use client';

import { motion, useReducedMotion, MotionValue, HTMLMotionProps, Variants } from 'framer-motion';
import React, { useState, memo, FormEvent, ChangeEvent } from 'react';
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
  Globe,
  Target,
  Zap,
  DollarSign,
  BarChart3,
  FileText,
  Key,
  Wrench,
  ClipboardCheck,
  Plus
} from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

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
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: 'Property Valuation',
    message: ''
  });

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
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/971501234567', '_blank');
  };

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

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900 tracking-tight">
                AFS Real Estate
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-7">
              <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors font-light text-[15px]">About</a>
              <a href="#services" className="text-gray-700 hover:text-amber-600 transition-colors font-light text-[15px]">Services</a>
              <a href="#management" className="text-gray-700 hover:text-amber-600 transition-colors font-light text-[15px]">Management</a>
              <a href="#faq" className="text-gray-700 hover:text-amber-600 transition-colors font-light text-[15px]">FAQ</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors font-light text-[15px]">Contact</a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookConsultation}
              className="bg-amber-500 text-white px-5 py-2 rounded-full font-medium text-sm shadow-md hover:bg-amber-600 transition-all"
              type="button"
            >
              Book Consultation
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideVariants.left}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block mb-4"
              >
                <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide">
                  Premium Property Management
                </span>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-5 leading-[1.1] tracking-tight">
                Your Gateway to
                <span className="block text-amber-500">
                  Smart Property Solutions
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-7 leading-relaxed font-light">
                Navigate Dubai's dynamic real estate market with confidence. We deliver expert 
                property management and investment advisory services to help you maximize returns 
                and minimize hassle.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBookConsultation}
                  className="bg-amber-500 text-white px-7 py-3.5 rounded-full font-medium text-base shadow-lg hover:bg-amber-600 transition-all flex items-center space-x-2"
                  type="button"
                >
                  <span>Schedule Consultation</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="bg-white border border-amber-500/20 text-amber-600 px-7 py-3.5 rounded-full font-medium text-base hover:bg-amber-50 transition-all flex items-center space-x-2 shadow-sm"
                  type="button"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideVariants.right}
              className="relative"
            >
              <div className="relative bg-gray-50 rounded-3xl p-7 shadow-xl">
                <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 font-light">Portfolio Growth</span>
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-4xl font-semibold text-gray-900 mb-1 tracking-tight">+127%</div>
                  <div className="text-sm text-amber-600 font-medium">Average ROI 2023-2025</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-4 shadow-md">
                    <Building2 className="w-7 h-7 text-amber-500 mb-2" />
                    <div className="text-2xl font-semibold text-gray-900 tracking-tight">$2.8B+</div>
                    <div className="text-xs text-gray-600 font-light">Assets Managed</div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 shadow-md">
                    <Users className="w-7 h-7 text-amber-500 mb-2" />
                    <div className="text-2xl font-semibold text-gray-900 tracking-tight">450+</div>
                    <div className="text-xs text-gray-600 font-light">HNW Clients</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - solid amber background */}
      <section className="py-14 px-6 bg-amber-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
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
      <section id="faq" className="py-20 px-6">
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
              onClick={handleBookConsultation}
              className="bg-white text-amber-600 px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
              type="button"
            >
              CONTACT US
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-amber-500 relative overflow-hidden">
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
                onClick={handleBookConsultation}
                className="bg-white text-amber-700 px-8 py-4 rounded-full font-semibold text-base shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2"
                type="button"
              >
                <span>Book Your Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="bg-amber-600 text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-base hover:bg-amber-700 transition-all flex items-center space-x-2"
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
                    <p className="text-gray-600 text-sm font-light">Business Bay, Dubai<br/>United Arab Emirates</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm tracking-tight">Phone</h4>
                    <p className="text-gray-600 text-sm font-light">UAE: +971 4 XXX XXXX<br/>Mobile: +971 50 XXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm tracking-tight">Email</h4>
                    <p className="text-gray-600 text-sm font-light">info@afsrealestate.com<br/>management@afsrealestate.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-11 h-11 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm tracking-tight">WhatsApp</h4>
                    <p className="text-gray-600 text-sm font-light">+971 50 XXX XXXX<br/>Available 9 AM - 9 PM GST</p>
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