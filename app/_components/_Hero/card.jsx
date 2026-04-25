'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const PropertyCard = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null)
  const cardRef = useRef(null)
  const dropdownRef = useRef(null)
  const [dealType, setDealType] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
      
      const tl = gsap.timeline()
      tl.to(overlayRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.4,
        ease: 'power2.out'
      })
      tl.fromTo(cardRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out' },
        '-=0.2'
      )
    } else {
      document.body.style.overflow = 'unset'
      
      const tl = gsap.timeline()
      tl.to(cardRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in'
      })
      tl.to(overlayRef.current, {
        opacity: 0,
        visibility: 'hidden',
        duration: 0.3,
        ease: 'power2.inOut'
      }, '-=0.2')
    }
  }, [isOpen])

  if (!isOpen && typeof window !== 'undefined') {
      // We still render it but it's hidden via GSAP visibility/opacity
  }

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 invisible px-4"
      onClick={onClose}
    >
      <div 
        ref={cardRef}
        className="bg-white w-full max-w-[700px] rounded-[4px] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-black/80 hover:text-black transition-colors border-none bg-transparent cursor-pointer"
          aria-label="Close dialog"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="p-8 md:p-12">
          <h2 className="text-black text-3xl md:text-4xl font-medium leading-tight mb-3 font-playfair-display">
            Find properties
          </h2>
          <p className="text-black text-base md:text-lg font-medium mb-10 font-inter opacity-90">
            Buy, rent, or sell - we are here to help you.
          </p>

          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 font-inter">
              {/* Email */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[#999] text-[10px] font-semibold uppercase tracking-wider font-inter">
                  Email Address*
                </label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-0 border-b border-[#eee] pb-2.5 text-base text-black placeholder:text-[#999] focus:outline-none focus:border-black focus:ring-0 transition-colors font-inter rounded-none"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[#999] text-[10px] font-semibold uppercase tracking-wider font-inter">
                  Phone Number*
                </label>
                <input 
                  type="tel" 
                  placeholder="Enter your phone"
                  className="w-full bg-transparent border-0 border-b border-[#eee] pb-2.5 text-base text-black placeholder:text-[#999] focus:outline-none focus:border-black focus:ring-0 transition-colors font-inter rounded-none"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[#999] text-[10px] font-semibold uppercase tracking-wider font-inter">
                  Price*
                </label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="Min price"
                    className="w-full bg-transparent border-0 border-b border-[#eee] pb-2.5 text-base text-black placeholder:text-[#999] focus:outline-none focus:border-black focus:ring-0 transition-colors font-inter rounded-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Max price"
                    className="w-full bg-transparent border-0 border-b border-[#eee] pb-2.5 text-base text-black placeholder:text-[#999] focus:outline-none focus:border-black focus:ring-0 transition-colors font-inter rounded-none"
                  />
                </div>
              </div>

              {/* Deal Type */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[#999] text-[10px] font-semibold uppercase tracking-wider font-inter">
                  Deal Type*
                </label>
                <div className="relative" ref={dropdownRef}>
                  <div 
                    className="w-full bg-transparent border-0 border-b border-[#eee] pb-2.5 text-base text-black flex justify-between items-center cursor-pointer transition-colors font-inter rounded-none"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className={dealType ? "text-black" : "text-[#999]"}>
                      {dealType ? dealType.charAt(0).toUpperCase() + dealType.slice(1) : "Choose your deal type"}
                    </span>
                    <svg 
                      width="10" 
                      height="10" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-[#eee] shadow-xl rounded-[4px] z-20 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {['Buy', 'Sell', 'Rent'].map((option) => (
                        <div
                          key={option}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-base text-black transition-colors font-inter"
                          onClick={() => {
                            setDealType(option.toLowerCase())
                            setIsDropdownOpen(false)
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="group inline-flex items-center justify-center gap-2.5 w-full py-5 px-7 font-inter text-sm font-medium tracking-[0.01em] no-underline border-none bg-[rgba(0,0,0,0.88)] hover:bg-black text-white cursor-pointer rounded-full mt-2 transition-[background-color] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <div className="relative overflow-hidden leading-tight font-inter">
                <span 
                  className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full" 
                  data-text="Next"
                >
                  Next
                </span>
              </div>
              <span className="hero-cta-arrow transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4">
                  <path fill="currentColor" d="m20.78 12.531-6.75 6.75a.75.75 0 1 1-1.06-1.061l5.47-5.47H3.75a.75.75 0 1 1 0-1.5h14.69l-5.47-5.469a.75.75 0 1 1 1.06-1.061l6.75 6.75a.75.75 0 0 1 0 1.061"></path>
                </svg>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard