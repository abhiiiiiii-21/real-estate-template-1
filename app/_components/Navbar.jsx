'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'

const ChevronDown = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const rentDropdownItems = [
  { label: 'Apartments', href: '/rent/apartments' },
  { label: 'Villas', href: '/rent/villas' },
  { label: 'Townhouses', href: '/rent/townhouses' },
  { label: 'Penthouses', href: '/rent/penthouses' },
  { label: 'Commercial', href: '/rent/commercial' },
]

const offPlanDropdownItems = [
  { label: 'New Projects', href: '/off-plan/new-projects' },
  { label: 'Under Construction', href: '/off-plan/under-construction' },
  { label: 'Ready Soon', href: '/off-plan/ready-soon' },
  { label: 'Payment Plans', href: '/off-plan/payment-plans' },
]

const DropdownMenu = ({ items, isOpen }) => {
  return (
    <div
      className={`absolute top-[calc(100%+8px)] left-1/2 min-w-[200px] transition-all duration-[220ms] ease-out
        ${isOpen
          ? 'opacity-100 visible pointer-events-auto -translate-x-1/2 translate-y-0'
          : 'opacity-0 invisible pointer-events-none -translate-x-1/2 -translate-y-1'
        }`}
    >
      <div className="bg-[rgba(15,15,15,0.85)] backdrop-blur-[20px] border border-white/10 rounded-xl p-1.5 flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)]">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block px-3.5 py-2.5 text-[13.5px] font-[450] text-black/80 no-underline rounded-lg transition-all duration-[180ms] whitespace-nowrap hover:bg-black/5 hover:text-black"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef(null)
  const lenis = useLenis()

  const handleScroll = (e, href) => {
    if (!href || href.startsWith('/')) return
    e.preventDefault()
    lenis?.scrollTo(href, {
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Entrance Animation
    gsap.fromTo(navRef.current, 
      { y: '-100%', opacity: 0 },
      { 
        y: '0%', 
        opacity: 1, 
        duration: 1.2, 
        ease: 'power4.out',
        delay: 0.2,
        onComplete: () => {
          // Clear GSAP styles so CSS transitions can take over for scroll logic
          gsap.set(navRef.current, { clearProps: 'all' })
        }
      }
    )

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name))
  }

  return (
    <nav
      ref={navRef}
      className={`absolute top-0 left-0 right-0 z-[100] py-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
        isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}
      id="main-navbar"
    >
      <div className="max-w-[1280px] mx-auto px-10 flex items-center justify-between h-12 max-md:px-5">
        {/* Brand */}
        <Link
          href="/"
          className="text-[22px] font-extrabold text-black no-underline tracking-tight shrink-0 transition-opacity duration-200 hover:opacity-85 font-playfair-display"
          id="navbar-brand"
        >
          Websual
        </Link>

        {/* Desktop Navigation */}
        <ul className="font-inter flex items-center gap-1.5 list-none m-0 p-0 max-md:hidden" id="navbar-links">
          {[
            { name: 'About', href: '#about' },
            { name: 'Properties', href: '#properties' },
            { name: 'Amenities', href: '#amenities' },
            { name: 'Contact', href: '#contact' }
          ].map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="group inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-black/80 no-underline rounded-lg transition-all duration-200 whitespace-nowrap tracking-[0.01em] hover:text-black"
              >
                <div className="relative overflow-hidden leading-tight">
                  <span
                    className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full"
                    data-text={link.name}
                  >
                    {link.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="group hero-cta-button inline-flex items-center gap-2 !px-6 !py-2.5 font-inter transition-transform hover:scale-[1.02] no-underline max-md:hidden"
          id="navbar-contact-btn"
        >
          <div className="relative overflow-hidden leading-tight font-inter">
            <span 
              className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full" 
              data-text="Book a Visit"
            >
              Book a Visit
            </span>
          </div>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="hidden max-md:flex flex-col justify-center items-center gap-[5px] w-10 h-10 border-none bg-transparent cursor-pointer p-1.5 rounded-lg transition-colors duration-200 hover:bg-black/5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          id="navbar-mobile-toggle"
        >
          <span className={`block w-[22px] h-0.5 bg-black rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-0.5 bg-black rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-[22px] h-0.5 bg-black rounded-sm transition-all duration-300 ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`hidden max-md:block overflow-hidden transition-all duration-350 ease-out ${mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}
        id="navbar-mobile-menu"
      >
        <ul className="list-none m-0 px-5 pt-3 pb-5 flex flex-col gap-0.5">
          {[
            { name: 'About', href: '#about' },
            { name: 'Properties', href: '#properties' },
            { name: 'Amenities', href: '#amenities' },
            { name: 'Contact', href: '#contact' }
          ].map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="group flex items-center justify-between w-full px-3.5 py-3 text-[15px] font-medium text-black/80 no-underline rounded-[10px] transition-colors duration-[180ms] hover:bg-black/5"
                onClick={(e) => handleScroll(e, link.href)}
              >
                <div className="relative overflow-hidden leading-tight">
                  <span
                    className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full"
                    data-text={link.name}
                  >
                    {link.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link
              href="/contact"
              className="group hero-cta-button inline-flex items-center justify-center gap-2 w-full py-4 font-inter transition-transform no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative overflow-hidden leading-tight font-inter">
                <span 
                  className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full" 
                  data-text="Book a Visit"
                >
                  Book a Visit
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar