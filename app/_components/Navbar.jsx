'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

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
            className="block px-3.5 py-2.5 text-[13.5px] font-[450] text-white/80 no-underline rounded-lg transition-all duration-[180ms] whitespace-nowrap hover:bg-white/10 hover:text-white"
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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name))
  }

  return (
    <nav
      ref={navRef}
      className={`absolute top-0 left-0 right-0 z-[100] py-4 bg-gradient-to-b from-black/25 via-black/8 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
        isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}
      id="main-navbar"
    >
      <div className="max-w-[1280px] mx-auto px-10 flex items-center justify-between h-12 max-md:px-5">
        {/* Brand */}
        <Link
          href="/"
          className="text-[22px] font-extrabold text-white no-underline tracking-tight shrink-0 transition-opacity duration-200 hover:opacity-85"
          id="navbar-brand"
        >
          Websual
        </Link>

        {/* Desktop Navigation */}
        <ul className="flex items-center gap-1.5 list-none m-0 p-0 max-md:hidden" id="navbar-links">
          <li>
            <Link
              href="/buy"
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/88 no-underline rounded-lg transition-all duration-200 whitespace-nowrap tracking-[0.01em] hover:text-white hover:bg-white/10"
            >
              Buy
            </Link>
          </li>

          <li className="relative">
            <button
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/88 no-underline rounded-lg border-none bg-transparent cursor-pointer transition-all duration-200 whitespace-nowrap tracking-[0.01em] font-[inherit] select-none hover:text-white hover:bg-white/10"
              onClick={() => toggleDropdown('rent')}
              aria-expanded={activeDropdown === 'rent'}
              id="navbar-rent-toggle"
            >
              Rent
              <ChevronDown
                className={`transition-transform duration-250 ease-out opacity-70 shrink-0 ${activeDropdown === 'rent' ? 'rotate-180' : ''}`}
              />
            </button>
            <DropdownMenu
              items={rentDropdownItems}
              isOpen={activeDropdown === 'rent'}
            />
          </li>

          <li className="relative">
            <button
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/88 no-underline rounded-lg border-none bg-transparent cursor-pointer transition-all duration-200 whitespace-nowrap tracking-[0.01em] font-[inherit] select-none hover:text-white hover:bg-white/10"
              onClick={() => toggleDropdown('offplan')}
              aria-expanded={activeDropdown === 'offplan'}
              id="navbar-offplan-toggle"
            >
              Off-Plan
              <ChevronDown
                className={`transition-transform duration-250 ease-out opacity-70 shrink-0 ${activeDropdown === 'offplan' ? 'rotate-180' : ''}`}
              />
            </button>
            <DropdownMenu
              items={offPlanDropdownItems}
              isOpen={activeDropdown === 'offplan'}
            />
          </li>

          <li>
            <Link
              href="/communities"
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/88 no-underline rounded-lg transition-all duration-200 whitespace-nowrap tracking-[0.01em] hover:text-white hover:bg-white/10"
            >
              Communities
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/88 no-underline rounded-lg transition-all duration-200 whitespace-nowrap tracking-[0.01em] hover:text-white hover:bg-white/10"
            >
              About
            </Link>
          </li>
        </ul>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-[22px] py-[9px] text-sm font-semibold text-black bg-white rounded-full no-underline cursor-pointer transition-all duration-200 whitespace-nowrap tracking-[0.01em] shrink-0 font-[inherit] hover:bg-white/90 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(255,255,255,0.15)] active:translate-y-0 max-md:hidden"
          id="navbar-contact-btn"
        >
          Contact us
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="hidden max-md:flex flex-col justify-center items-center gap-[5px] w-10 h-10 border-none bg-transparent cursor-pointer p-1.5 rounded-lg transition-colors duration-200 hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          id="navbar-mobile-toggle"
        >
          <span className={`block w-[22px] h-0.5 bg-white rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-0.5 bg-white rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-[22px] h-0.5 bg-white rounded-sm transition-all duration-300 ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`hidden max-md:block overflow-hidden transition-all duration-350 ease-out ${mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}
        id="navbar-mobile-menu"
      >
        <ul className="list-none m-0 px-5 pt-3 pb-5 flex flex-col gap-0.5">
          <li>
            <Link
              href="/buy"
              className="flex items-center justify-between w-full px-3.5 py-3 text-[15px] font-medium text-white/88 no-underline rounded-[10px] transition-colors duration-[180ms] hover:bg-white/8"
              onClick={() => setMobileMenuOpen(false)}
            >
              Buy
            </Link>
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full px-3.5 py-3 text-[15px] font-medium text-white/88 no-underline rounded-[10px] border-none bg-transparent cursor-pointer transition-colors duration-[180ms] font-[inherit] hover:bg-white/8"
              onClick={() => toggleDropdown('rent-mobile')}
            >
              Rent
              <ChevronDown
                className={`transition-transform duration-250 ease-out opacity-70 shrink-0 ${activeDropdown === 'rent-mobile' ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-300 pl-3 ${activeDropdown === 'rent-mobile' ? 'max-h-[300px]' : 'max-h-0'}`}>
              {rentDropdownItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3.5 py-2.5 text-sm text-white/70 no-underline rounded-lg transition-all duration-[180ms] hover:bg-white/8 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full px-3.5 py-3 text-[15px] font-medium text-white/88 no-underline rounded-[10px] border-none bg-transparent cursor-pointer transition-colors duration-[180ms] font-[inherit] hover:bg-white/8"
              onClick={() => toggleDropdown('offplan-mobile')}
            >
              Off-Plan
              <ChevronDown
                className={`transition-transform duration-250 ease-out opacity-70 shrink-0 ${activeDropdown === 'offplan-mobile' ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-300 pl-3 ${activeDropdown === 'offplan-mobile' ? 'max-h-[300px]' : 'max-h-0'}`}>
              {offPlanDropdownItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3.5 py-2.5 text-sm text-white/70 no-underline rounded-lg transition-all duration-[180ms] hover:bg-white/8 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </li>
          <li>
            <Link
              href="/communities"
              className="flex items-center justify-between w-full px-3.5 py-3 text-[15px] font-medium text-white/88 no-underline rounded-[10px] transition-colors duration-[180ms] hover:bg-white/8"
              onClick={() => setMobileMenuOpen(false)}
            >
              Communities
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="flex items-center justify-between w-full px-3.5 py-3 text-[15px] font-medium text-white/88 no-underline rounded-[10px] transition-colors duration-[180ms] hover:bg-white/8"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full py-3.5 text-[15px] font-semibold text-black bg-white rounded-xl no-underline cursor-pointer transition-all duration-200 hover:bg-white/90"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar