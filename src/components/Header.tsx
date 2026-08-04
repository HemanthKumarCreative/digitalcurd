"use client";

import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowRight } from 'lucide-react'
import AnimatedLogo from "./AnimatedLogo"

export default function Header() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileAcc, setActiveMobileAcc] = useState<string | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.getElementById('nav');
      if (nav && !nav.contains(e.target as Node)) {
        setActivePanel(null);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setActivePanel(null)
      setIsMobileMenuOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }
  }, []);

  const handlePanelToggle = (panelId: string) => {
    setActivePanel(prev => prev === panelId ? null : panelId);
  };

  return (
    <header className={`nav nav-v9 ${activePanel ? 'has-open-panel' : ''} ${isScrolled ? 'header-bg' : ''}`} id="nav">
      <nav className="nav__bar" aria-label="Primary">
        <Link className="logo" href="/" data-nav="logo" aria-label="Digital Curd — Home">
          <AnimatedLogo className="site-logo-dark" variant="dark" />
          <AnimatedLogo className="site-logo-light" variant="light" />
        </Link>

        <div className="nav__links">
          <button className="trigger" aria-expanded={activePanel === 'p-services'} onClick={() => handlePanelToggle('p-services')}>
            Services <svg className="chev" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <Link href="/about" className="trigger" onClick={() => setActivePanel(null)}>
            About Us
          </Link>
          <Link href="/careers" className="trigger" onClick={() => setActivePanel(null)}>
            Careers
          </Link>
          <Link href="/blog" className="trigger" onClick={() => setActivePanel(null)}>
            Blogs
          </Link>
        </div>

        <div className="nav__spacer"></div>
        <div className="get-connect">
          <Link href="/contact" className="btn-circle">
            <span className="text" data-text="Contact Us">Contact Us</span>
            <span className="circle"><ArrowRight className="w-5 h-5 text-white" /></span>
          </Link>
        </div>
        <button className={`hamb ${isMobileMenuOpen ? 'is-open' : ''}`} id="hamb" aria-label="Open menu" aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><span></span><span></span><span></span></button>
      </nav>

      {/* ═══ PANEL: SERVICES ═══ */}
      <div className={`panel ${activePanel === 'p-services' ? 'is-open' : ''}`} id="p-services" role="region" aria-label="Services">
        <div className="panel__inner">
          <div className="cols">
            <div className="col rv">
              <span className="col__head">AI & Automation</span>
              <ul>
                <li><Link className="lnk" href="/ai/consulting-services-company" data-nav="link"><span className="dot"></span>AI Agents</Link></li>
                <li><Link className="lnk" href="/ai/ai-augmented-software-development" data-nav="link"><span className="dot"></span>AI Chatbots</Link></li>
                <li><Link className="lnk" href="/ai/generative-ai-services" data-nav="link"><span className="dot"></span>AI Search Optimization (AEO/GEO)</Link></li>
                <li><Link className="lnk" href="/ai/custom-ai-agent-development" data-nav="link"><span className="dot"></span>Workflow Automation</Link></li>
                <li><Link className="lnk" href="/ai/custom-ai-agent-development" data-nav="link"><span className="dot"></span>AI for Customer Support</Link></li>
              </ul>
            </div>
            <div className="col rv">
              <span className="col__head">Growth Marketing</span>
              <ul>
                <li><Link className="lnk" href="/ai/custom-ai-agent-development" data-nav="link"><span className="dot"></span>SEO</Link></li>
                <li><Link className="lnk" href="/ai/custom-ai-agent-development" data-nav="link"><span className="dot"></span>Performance Marketing</Link></li>
                <li><Link className="lnk" href="/ai/custom-ai-agent-development" data-nav="link"><span className="dot"></span>Google Ads</Link></li>
                <li><Link className="lnk" href="/ai/custom-ai-agent-development" data-nav="link"><span className="dot"></span>Meta Ads</Link></li>
                <li><Link className="lnk" href="/ai/custom-ai-agent-development" data-nav="link"><span className="dot"></span>LinkedIn Ads</Link></li>
                <li><Link className="lnk" href="/ai/custom-ai-agent-development" data-nav="link"><span className="dot"></span>Content Marketing </Link></li>
                <li><Link className="lnk" href="/ai/custom-ai-agent-development" data-nav="link"><span className="dot"></span>WhatsApp Marketing </Link></li>
              </ul>
            </div>
            <div className="col rv">
              <span className="col__head">ECommerce</span>
              <ul>
                <li><Link className="lnk" href="/data-engineering" data-nav="link"><span className="dot"></span>Shopify Development</Link></li>
                <li><Link className="lnk" href="/data-analytics" data-nav="link"><span className="dot"></span>WooCommerce </Link></li>
                <li><Link className="lnk" href="/data/warehouse" data-nav="link"><span className="dot"></span>Wordpress</Link></li>
              </ul>
            </div>
            <div className="col rv">
              <span className="col__head">Digital Engineering</span>
              <ul>
                <li><Link className="lnk" href="/salesforce" data-nav="link"><span className="dot"></span>Website Development</Link></li>
                <li><Link className="lnk" href="/hire/sap-developers" data-nav="link"><span className="dot"></span>Next.js</Link></li>
                <li><Link className="lnk" href="/servicenow-development" data-nav="link"><span className="dot"></span>React</Link></li>
                <li><Link className="lnk" href="/microsoft-dynamics" data-nav="link"><span className="dot"></span>Headless CMS</Link></li>
                <li><Link className="lnk" href="/services/system-integration" data-nav="link"><span className="dot"></span>API Integration</Link></li>
                <li><Link className="lnk" href="/services/progressive-web-apps" data-nav="link"><span className="dot"></span>Progressive Web Apps</Link></li>
              </ul>
            </div>
            <div className="col rv">
              <span className="col__head">Creative Studio</span>
              <ul>
                <li><Link className="lnk" href="/digital-transformation-services" data-nav="link"><span className="dot"></span>Brand Materials</Link></li>
                <li><Link className="lnk" href="/it-strategy-consulting-firms" data-nav="link"><span className="dot"></span>UI/UX</Link></li>
                <li><Link className="lnk" href="/services/cybersecurity" data-nav="link"><span className="dot"></span>Graphic Design</Link></li>
                <li><Link className="lnk" href="/services/quality-engineering" data-nav="link"><span className="dot"></span>Video Production</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* ═══ MOBILE DRAWER ═══ */}
      <div className={`drawer__ov ${isMobileMenuOpen ? 'is-on' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`drawer ${isMobileMenuOpen ? 'is-on' : ''}`}>
        <div className="drawer__hd">
          <Link className="logo" href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <AnimatedLogo className="site-logo-light" variant="light" />
          </Link>
          <button className="drawer__close" aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <div className="drawer__scroll">
          <button className={`acc ${activeMobileAcc === 'services' ? 'is-open' : ''}`} onClick={() => setActiveMobileAcc(activeMobileAcc === 'services' ? null : 'services')}>
            Services
            <svg viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className={`acc-body ${activeMobileAcc === 'services' ? 'is-open' : ''}`}>
            <div className="acc-sub">AI Transformation</div>
            <Link href="/ai" onClick={() => setIsMobileMenuOpen(false)}>AI Agents</Link>
            <div className="acc-sub">AI Chatbots</div>
            <Link href="/custom-software-development-services-company" onClick={() => setIsMobileMenuOpen(false)}>Custom Software</Link>
            <Link href="/web-application-development" onClick={() => setIsMobileMenuOpen(false)}>Web App</Link>
            <Link href="/mobile-application-development" onClick={() => setIsMobileMenuOpen(false)}>Mobile App</Link>
            <Link href="/services" className="acc-all" onClick={() => setIsMobileMenuOpen(false)}>View All Services →</Link>
          </div>

          <Link href="/about" className="acc" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
            About Us
          </Link>
          <Link href="/careers" className="acc" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
            Careers
          </Link>
          <Link href="/blog" className="acc" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
            Blog
          </Link>
        </div>
        <div className="drawer__ft">
          <Link href="/contact" className="drawer__cta" onClick={() => setIsMobileMenuOpen(false)}>Contact Us <span className="arr">→</span></Link>
        </div>
      </div>
    </header>
  );
}
