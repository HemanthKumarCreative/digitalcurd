'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import AnimatedLogo from './AnimatedLogo'
import {
  getServicesByCategory,
  serviceCategories,
} from '@/sanity/lib/catalog'
import type { ServiceMeta } from '@/types/content'

type HeaderProps = {
  services?: ServiceMeta[]
}

const isLightSurfacePath = (pathname: string) => {
  if (pathname === '/') return false
  return (
    pathname.startsWith('/articles') ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/careers') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/privacy') ||
    pathname.startsWith('/disclaimer') ||
    pathname.startsWith('/terms')
  )
}

export default function Header({ services = [] }: HeaderProps) {
  const pathname = usePathname() || '/'
  const forceSolidHeader = isLightSurfacePath(pathname)
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMobileAcc, setActiveMobileAcc] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.getElementById('nav')
      if (nav && !nav.contains(e.target as Node)) {
        setActivePanel(null)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setActivePanel(null)
      setIsMobileMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handlePanelToggle = (panelId: string) => {
    setActivePanel((prev) => (prev === panelId ? null : panelId))
  }

  const handleCloseMobile = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={`nav nav-v9 ${activePanel ? 'has-open-panel' : ''} ${isScrolled || forceSolidHeader ? 'header-bg' : ''}`}
      id="nav"
    >
      <nav className="nav__bar" aria-label="Primary">
        <Link className="logo" href="/" data-nav="logo" aria-label="Digital Curd — Home">
          <AnimatedLogo className="site-logo-dark" variant="dark" />
          <AnimatedLogo className="site-logo-light" variant="light" />
        </Link>

        <div className="nav__links">
          <button
            className="trigger"
            aria-expanded={activePanel === 'p-services'}
            onClick={() => handlePanelToggle('p-services')}
          >
            Services{' '}
            <svg className="chev" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2.5 4.5L6 8l3.5-3.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link href="/about" className="trigger" onClick={() => setActivePanel(null)}>
            About Us
          </Link>
          <Link href="/careers" className="trigger" onClick={() => setActivePanel(null)}>
            Careers
          </Link>
          <Link href="/articles" className="trigger" onClick={() => setActivePanel(null)}>
            Articles
          </Link>
        </div>

        <div className="nav__spacer"></div>
        <div className="get-connect">
          <Link href="/contact" className="btn-circle">
            <span className="text" data-text="Contact Us">
              Contact Us
            </span>
            <span className="circle">
              <ArrowRight className="w-5 h-5 text-white" />
            </span>
          </Link>
        </div>
        <button
          className={`hamb ${isMobileMenuOpen ? 'is-open' : ''}`}
          id="hamb"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div
        className={`panel ${activePanel === 'p-services' ? 'is-open' : ''}`}
        id="p-services"
        role="region"
        aria-label="Services"
      >
        <div className="panel__inner">
          <div className="cols">
            {serviceCategories.map((category) => (
              <div key={category} className="col rv">
                <span className="col__head">{category}</span>
                <ul>
                  {getServicesByCategory(services, category).map((service) => (
                    <li key={service.slug}>
                      <Link
                        className="lnk"
                        href={`/services/${service.slug}`}
                        data-nav="link"
                        onClick={() => setActivePanel(null)}
                      >
                        <span className="dot"></span>
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`drawer__ov ${isMobileMenuOpen ? 'is-on' : ''}`}
        onClick={handleCloseMobile}
      ></div>
      <div className={`drawer ${isMobileMenuOpen ? 'is-on' : ''}`}>
        <div className="drawer__hd">
          <Link className="logo" href="/" onClick={handleCloseMobile}>
            <AnimatedLogo className="site-logo-light" variant="light" />
          </Link>
          <button
            className="drawer__close"
            aria-label="Close menu"
            onClick={handleCloseMobile}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="drawer__scroll">
          {serviceCategories.map((category) => {
            const isOpen = activeMobileAcc === category
            return (
              <div key={category}>
                <button
                  className={`acc ${isOpen ? 'is-open' : ''}`}
                  onClick={() => setActiveMobileAcc(isOpen ? null : category)}
                >
                  {category}
                  <svg viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 4.5L6 8l3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className={`acc-body ${isOpen ? 'is-open' : ''}`}>
                  {getServicesByCategory(services, category).map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={handleCloseMobile}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}

          <Link
            href="/services"
            className="acc"
            style={{ textDecoration: 'none' }}
            onClick={handleCloseMobile}
          >
            View All Services
          </Link>
          <Link
            href="/about"
            className="acc"
            style={{ textDecoration: 'none' }}
            onClick={handleCloseMobile}
          >
            About Us
          </Link>
          <Link
            href="/careers"
            className="acc"
            style={{ textDecoration: 'none' }}
            onClick={handleCloseMobile}
          >
            Careers
          </Link>
          <Link
            href="/articles"
            className="acc"
            style={{ textDecoration: 'none' }}
            onClick={handleCloseMobile}
          >
            Articles
          </Link>
        </div>
        <div className="drawer__ft">
          <Link href="/contact" className="drawer__cta" onClick={handleCloseMobile}>
            Contact Us <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
