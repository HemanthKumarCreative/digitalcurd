"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import AnimatedLogo from "./AnimatedLogo";

export default function Header() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleMouseEnter = (panelId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActivePanel(panelId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActivePanel(null);
    }, 150);
  };

  return (
    <header className={`nav nav-v9 ${activePanel ? 'has-open-panel' : ''} ${isScrolled ? 'header-bg' : ''}`} id="nav">
      <nav className="nav__bar" aria-label="Primary">
        <Link className="logo" href="/" data-nav="logo" aria-label="ValueCoders — Home">
          <AnimatedLogo className="site-logo-dark" variant="dark" />
          <AnimatedLogo className="site-logo-light" variant="light" />
        </Link>

        <div className="nav__links">
          <button className="trigger" aria-expanded={activePanel === 'p-services'} onMouseEnter={() => handleMouseEnter('p-services')} onMouseLeave={handleMouseLeave}>
            Services <svg className="chev" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="trigger" aria-expanded={activePanel === 'p-solutions'} onMouseEnter={() => handleMouseEnter('p-solutions')} onMouseLeave={handleMouseLeave}>
            Solutions <svg className="chev" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="trigger" aria-expanded={activePanel === 'p-hire'} onMouseEnter={() => handleMouseEnter('p-hire')} onMouseLeave={handleMouseLeave}>
            Hire & Teams <svg className="chev" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="trigger" aria-expanded={activePanel === 'p-company'} onMouseEnter={() => handleMouseEnter('p-company')} onMouseLeave={handleMouseLeave}>
            Company <svg className="chev" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="nav__spacer"></div>

        <div className="search" id="search-trigger" role="button" tabIndex={0} aria-label="Search" data-nav="search">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6"/><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          <span className="search__txt">Search or describe…</span>
          <span className="kbd">⌘K</span>
        </div>
        <div className="get-connect">
          <Link href="/contact" className="btn-circle">
            <span className="text" data-text="Contact Us">Contact Us</span>
            <span className="circle"><img src="https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/images/index-v10/move-right.svg" alt="" /></span>
          </Link>
        </div>    
        <button className="hamb" id="hamb" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </nav>

      {/* ═══ PANEL: SERVICES ═══ */}
      <div className={`panel ${activePanel === 'p-services' ? 'is-open' : ''}`} onMouseEnter={() => handleMouseEnter('p-services')} onMouseLeave={handleMouseLeave} id="p-services" role="region" aria-label="Services">
        <div className="panel__inner">
          <div className="band rv">
            <div className="band__top">
              <div className="band__eyebrow">Services</div>
            </div>
            <div className="band__lead">
              <span className="band__h">Governed delivery in the AI era.</span>
              <span className="band__p">675+ senior engineers — faster than in-house, safer than ungoverned AI.</span>
            </div>
          </div>
          <div className="cols">
            <div className="col rv">
              <span className="col__head">AI & Automation</span>
              <ul>
                <li><Link className="lnk" href="/ai/consulting-services-company" data-nav="link"><span className="dot"></span>AI Consulting</Link></li>
                <li><Link className="lnk" href="/ai/ai-augmented-software-development" data-nav="link"><span className="dot"></span>AI-Augmented Development</Link></li>
                <li><Link className="lnk" href="/ai/generative-ai-services" data-nav="link"><span className="dot"></span>Generative AI & LLMs</Link></li>
                <li><Link className="lnk" href="/ai/custom-ai-agent-development" data-nav="link"><span className="dot"></span>AI Agents & Automation</Link></li>
                <li><Link className="lnk" href="/ai/production-assurance" data-nav="link"><span className="dot"></span>Production Assurance</Link></li>
              </ul>
              <Link className="viewall-col" href="/ai" data-nav="viewall">View all <span className="arr">→</span></Link>
            </div>
            <div className="col rv">
              <span className="col__head">Product Engineering</span>
              <ul>
                <li><Link className="lnk" href="/custom-software-development-services-company" data-nav="link"><span className="dot"></span>Custom Software Development</Link></li>
                <li><Link className="lnk" href="/web-application-development" data-nav="link"><span className="dot"></span>Web App Development</Link></li>
                <li><Link className="lnk" href="/mobile-application-development" data-nav="link"><span className="dot"></span>Mobile App Development</Link></li>
                <li><Link className="lnk" href="/mvp-app-development-company" data-nav="link"><span className="dot"></span>MVP Development</Link></li>
                <li><Link className="lnk" href="/outsource-software-product-development-services" data-nav="link"><span className="dot"></span>SaaS Development</Link></li>
                <li><Link className="lnk" href="/product-ui-ux-design" data-nav="link"><span className="dot"></span>UI/UX & Product Design</Link></li>
              </ul>
              <Link className="viewall-col" href="/product-engineering-process" data-nav="viewall">View all <span className="arr">→</span></Link>
            </div>
            <div className="col rv">
              <span className="col__head">Data & Cloud</span>
              <ul>
                <li><Link className="lnk" href="/data-engineering" data-nav="link"><span className="dot"></span>Data Engineering</Link></li>
                <li><Link className="lnk" href="/data-analytics" data-nav="link"><span className="dot"></span>Analytics & BI</Link></li>
                <li><Link className="lnk" href="/data/warehouse" data-nav="link"><span className="dot"></span>Data Warehouse</Link></li>
                <li><Link className="lnk" href="/cloud-services/cloud-migration" data-nav="link"><span className="dot"></span>Cloud Migration</Link></li>
                <li><Link className="lnk" href="/cloud-services/devops-automation" data-nav="link"><span className="dot"></span>DevOps & DevSecOps</Link></li>
              </ul>
              <Link className="viewall-col" href="/cloud-services" data-nav="viewall">View all <span className="arr">→</span></Link>
            </div>
            <div className="col rv">
              <span className="col__head">Enterprise & ERP</span>
              <ul>
                <li><Link className="lnk" href="/salesforce" data-nav="link"><span className="dot"></span>Salesforce</Link></li>
                <li><Link className="lnk" href="/hire/sap-developers" data-nav="link"><span className="dot"></span>SAP</Link></li>
                <li><Link className="lnk" href="/servicenow-development" data-nav="link"><span className="dot"></span>ServiceNow</Link></li>
                <li><Link className="lnk" href="/microsoft-dynamics" data-nav="link"><span className="dot"></span>Microsoft Dynamics</Link></li>
                <li><Link className="lnk" href="/services/system-integration" data-nav="link"><span className="dot"></span>System Integration</Link></li>
              </ul>
              <Link className="viewall-col" href="/enterprise-software-development-services" data-nav="viewall">View all <span className="arr">→</span></Link>
            </div>
            <div className="col rv">
              <span className="col__head">Modernise & Advisory</span>
              <ul>
                <li><Link className="lnk" href="/application-modernization" data-nav="link"><span className="dot"></span>Legacy Modernisation</Link></li>
                <li><Link className="lnk" href="/digital-transformation-services" data-nav="link"><span className="dot"></span>Digital Transformation</Link></li>
                <li><Link className="lnk" href="/it-strategy-consulting-firms" data-nav="link"><span className="dot"></span>Technology Consulting</Link></li>
                <li><Link className="lnk" href="/services/cybersecurity" data-nav="link"><span className="dot"></span>Cybersecurity & Pen Testing</Link></li>
                <li><Link className="lnk" href="/services/quality-engineering" data-nav="link"><span className="dot"></span>Quality Engineering</Link></li>
              </ul>
              <Link className="viewall-col" href="/modernization-services" data-nav="viewall">View all <span className="arr">→</span></Link>
            </div>
          </div>
        </div>
        <div className="panel__foot">
          <span className="lead"><b>Not sure where to start?</b> Project Scoping is a fixed-fee 2–4 week engagement that de-risks any build — proof before estimate.</span>
          <span className="push"></span>
          <Link className="btn2" href="/contact" data-nav="cta" data-nav-id="scope-your-project">Scope Your Project <span className="arr">→</span></Link>
        </div>
      </div>

      {/* ═══ PANEL: SOLUTIONS ═══ */}
      <div className={`panel ${activePanel === 'p-solutions' ? 'is-open' : ''}`} onMouseEnter={() => handleMouseEnter('p-solutions')} onMouseLeave={handleMouseLeave} id="p-solutions" role="region" aria-label="Solutions">
        <div className="panel__inner">
          <div className="band rv">
            <div className="band__top">
              <div className="band__eyebrow">Solutions</div>
            </div>
            <div className="band__lead">
              <span className="band__h">Start where you are.</span>
              <span className="band__p">A governed path for every situation — MVP to enterprise scale.</span>
            </div>
          </div>
          <div className="sol-wrap">
            <div className="sols rv">
              <Link className="sol" href="/solutions/ship-your-roadmap" data-nav="link"><span className="sol__icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 15l5-8 4 5 5-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></span><span><span className="sol__eyebrow">Software Product</span><h3>Ship Your Roadmap</h3><p>Behind a deadline — ship faster with senior engineers.</p></span></Link>
              <Link className="sol" href="/solutions/build-your-product" data-nav="link"><span className="sol__icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M14 3l3 3-9.5 9.5L4 17l1.5-3.5L15 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"></path></svg></span><span><span className="sol__eyebrow">Founder, Funded</span><h3>Build Your Product</h3><p>A clear vision and capital, but no team yet.</p></span></Link>
              <Link className="sol" href="/application-modernization" data-nav="link"><span className="sol__icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2l7 3v5c0 4.5-3 7.5-7 8.5C6 17.5 3 14.5 3 10V5l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"></path></svg></span><span><span className="sol__eyebrow">Established Business</span><h3>Modernise Legacy Systems</h3><p>Evolve a revenue-critical system without downtime.</p></span></Link>
              <Link className="sol" href="/offshore-software-development-center-india" data-nav="link"><span className="sol__icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 17V8l7-5 7 5v9M8 17v-5h4v5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"></path></svg></span><span><span className="sol__eyebrow">GCC / Captive</span><h3>Scale Your India Centre</h3><p>Grow your captive arm, governed to HQ standards.</p></span></Link>
              <Link className="sol" href="/solutions/build-your-mvp" data-nav="link"><span className="sol__icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 3a5 5 0 015 5c0 2-1.2 3.4-2.4 4.4l-.6 2.6H8l-.6-2.6C6.2 11.4 5 10 5 8a5 5 0 015-5zM8 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"></path></svg></span><span><span className="sol__eyebrow">Early Stage</span><h3>Build Your MVP</h3><p>Concept to a working first version, validated fast.</p></span></Link>
              <Link className="sol sol--accent" href="/solutions/ai-built-rescue" data-nav="link"><span className="sol__icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.6"></circle><path d="M10 1.5v3M10 15.5v3M1.5 10h3M15.5 10h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></path></svg></span><span><span className="sol__eyebrow">AI-Built</span><h3>AI-Built Rescue</h3><p>Built with AI tools and hitting scaling or audit walls.</p></span></Link>
            </div>
            <div className="siderail rv">
              <div className="siderail__head">Not sure where to start</div>
              <ul>
                <li><Link className="lnk" href="/project-discovery-phase" data-nav="link"><span className="dot"></span>Project Scoping</Link></li>
              </ul>
              <div className="siderail__head">By industry</div>
              <div className="chips">
                <Link className="chip" href="/industries/fintech/bfsi" data-nav="link">FinTech & BFSI</Link><Link className="chip" href="/industries/healthcare" data-nav="link">Healthcare</Link><Link className="chip" href="/industries/insurance" data-nav="link">Insurance</Link><Link className="chip" href="/industries/retail-ecommerce" data-nav="link">eCommerce</Link><Link className="chip" href="/industries/edtech" data-nav="link">EdTech</Link><Link className="chip" href="/industries/logistics" data-nav="link">Logistics</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="panel__foot">
          <span className="lead"><b>Unsure which fits?</b> Project Scoping is the universal first step.</span>
          <span className="push"></span>
          <Link className="btn2" href="/project-discovery-phase" data-nav="cta" data-nav-id="start-project-scoping">Start Project Scoping <span className="arr">→</span></Link>
        </div>
      </div>

      {/* ═══ PANEL: HIRE & TEAMS ═══ */}
      <div className={`panel ${activePanel === 'p-hire' ? 'is-open' : ''}`} onMouseEnter={() => handleMouseEnter('p-hire')} onMouseLeave={handleMouseLeave} id="p-hire" role="region" aria-label="Hire and Teams">
        <div className="panel__inner">
          <div className="band rv">
            <div className="band__top">
              <div className="band__eyebrow">Hire & Teams</div>
              <Link className="band__viewall" href="/hire-developers" data-nav="link" data-nav-id="hire-all">Browse all 60+ roles <span className="arr">→</span></Link>
            </div>
            <div className="band__lead">
              <span className="band__h">Pre-vetted engineers, governed from day one.</span>
              <span className="band__p">Not a marketplace — senior talent, shortlisted in 48 hours.</span>
            </div>
          </div>
          <div className="cols">
            <div className="col rv"><span className="col__head">Frontend & Mobile</span><ul>
              <li><Link className="lnk" href="/hire-developers/hire-reactjs-developers" data-nav="link"><span className="dot"></span>React Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-react-native-developers" data-nav="link"><span className="dot"></span>React Native Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-angularjs-developers" data-nav="link"><span className="dot"></span>Angular Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-vuejs-developers" data-nav="link"><span className="dot"></span>Vue.js Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-android-developers" data-nav="link"><span className="dot"></span>Android Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-flutter-developers" data-nav="link"><span className="dot"></span>Flutter Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-ios-developers" data-nav="link"><span className="dot"></span>iOS Developers</Link></li>
            </ul></div>
            <div className="col rv"><span className="col__head">Backend & Full-Stack</span><ul>
              <li><Link className="lnk" href="/hire-developers/hire-php-developers" data-nav="link"><span className="dot"></span>PHP Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-python-developers" data-nav="link"><span className="dot"></span>Python Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-java-developers" data-nav="link"><span className="dot"></span>Java Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-dotnet-developers" data-nav="link"><span className="dot"></span>.NET Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-full-stack-developers" data-nav="link"><span className="dot"></span>Full-Stack Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-golang-web-developers" data-nav="link"><span className="dot"></span>Go Developers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-nodejs-developers" data-nav="link"><span className="dot"></span>Node.js Developers</Link></li>
            </ul></div>
            <div className="col rv"><span className="col__head">AI, Cloud & QA</span><ul>
              <li><Link className="lnk" href="/hire-developers/hire-ai-engineers" data-nav="link"><span className="dot"></span>AI Engineers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-azure-developers" data-nav="link"><span className="dot"></span>Azure Engineers</Link></li>
              <li><Link className="lnk" href="/hire/salesforce-developer" data-nav="link"><span className="dot"></span>Salesforce Developers</Link></li>
              <li><Link className="lnk" href="/hire/sap-developers" data-nav="link"><span className="dot"></span>SAP Consultants</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-aws-developers" data-nav="link"><span className="dot"></span>AWS Engineers</Link></li>
              <li><Link className="lnk" href="/hire/data-engineers" data-nav="link"><span className="dot"></span>Data Engineers</Link></li>
              <li><Link className="lnk" href="/hire-developers/hire-devops-developers" data-nav="link"><span className="dot"></span>DevOps Engineers</Link></li>
              <li><Link className="lnk" href="/hire-developers/software-qa-testers-india" data-nav="link"><span className="dot"></span>QA Engineers</Link></li>
            </ul></div>
            <div className="col rv">
              <span className="col__head">Engagement Models</span>            
              <ul>
                <li><Link className="lnk" href="/it-staff-augmentation-services" data-nav="link"><span className="dot"></span>Team Extension</Link></li>
                <li><Link className="lnk" href="/dedicated-development-teams/product-pods" data-nav="link"><span className="dot"></span>Delivery Pods</Link></li>
                <li><Link className="lnk" href="/offshore-software-development-center-india" data-nav="link"><span className="dot"></span>Development Centres</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="panel__foot">
          <span className="lead"><b>Know the stack you need?</b> Get matched to pre-vetted engineers in days.</span>
          <span className="push"></span>
          <Link className="btn2" href="/contact" data-nav="cta" data-nav-id="get-matched">Get Matched <span className="arr">→</span></Link>
        </div>
      </div>

      {/* ═══ PANEL: COMPANY ═══ */}
      <div className={`panel ${activePanel === 'p-company' ? 'is-open' : ''}`} onMouseEnter={() => handleMouseEnter('p-company')} onMouseLeave={handleMouseLeave} id="p-company" role="region" aria-label="Company">
        <div className="panel__inner">
          <div className="band rv">
            <div className="band__top">
              <div className="band__eyebrow">Company</div>
              <Link className="band__viewall" href="/about" data-nav="link" data-nav-id="company-about">About ValueCoders <span className="arr">→</span></Link>
            </div>
            <div className="band__lead">
              <span className="band__h">Two decades of software that ships.</span>
              <span className="band__p">ISO 27001 · CMMi Level 3 — not a body shop.</span>
            </div>
          </div>
          <div className="cols">
            <div className="col rv"><span className="col__head">About ValueCoders</span><ul>
              <li><Link className="lnk" href="/how-it-works" data-nav="link"><span className="dot"></span>How We Work</Link></li>
              <li><Link className="lnk" href="/gdpr-compliance" data-nav="link"><span className="dot"></span>Security & Compliance</Link></li>
              <li><Link className="lnk" href="/in-media" data-nav="link"><span className="dot"></span>Credentials & Awards</Link></li>
              <li><Link className="lnk" href="/about" data-nav="link"><span className="dot"></span>Life at ValueCoders</Link></li>
              <li><Link className="lnk" href="/careers" data-nav="link"><span className="dot"></span>Careers</Link></li>
            </ul></div>
            <div className="col rv"><span className="col__head">Case Studies & Proof</span><ul>
              <li><Link className="lnk" href="/case-studies" data-nav="link"><span className="dot"></span>Case Studies</Link></li>
              <li><Link className="lnk" href="/testimonials" data-nav="link"><span className="dot"></span>Client Reviews</Link></li>
            </ul></div>
            <div className="col rv"><span className="col__head">Guides & Insights</span><ul>
              <li><Link className="lnk" href="/blog" data-nav="link"><span className="dot"></span>Blog</Link></li>
              <li><Link className="lnk" href="/partnership-program" data-nav="link"><span className="dot"></span>Partner Programme</Link></li>
              <li><Link className="lnk" href="/contact" data-nav="link"><span className="dot"></span>Contact Us</Link></li>
            </ul></div>
          </div>
        </div>
        <div className="panel__foot">
          <span className="trust-foot"><span><b><i>4.8</i> on Clutch</b> across <i>19k+</i> reviews</span><span className="sep"></span><span>ISO 27001</span><span className="sep"></span><span>CMMi Level 3</span><span className="sep"></span><span>NASSCOM member</span></span>
          <span className="push"></span>
          <Link className="btn2" href="/contact" data-nav="cta" data-nav-id="talk-to-us-panel">Talk to Us <span className="arr">→</span></Link>
        </div>
      </div>
    </header>
  );
}
