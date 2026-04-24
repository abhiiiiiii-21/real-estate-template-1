'use client'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const reviews = [
  {
    "id": 1,
    "name": "Rajesh Sharma",
    "location": "Delhi NCR",
    "rating": 5,
    "review": "We had been searching for our dream home for over a year. The team at Websual made the entire process so smooth — from property visits to paperwork. We moved into our new 3BHK in Gurgaon within 45 days. Highly recommended!",
    "property": "3BHK, Gurgaon"
  },
  {
    "id": 2,
    "name": "Priya Mehta",
    "location": "Mumbai",
    "rating": 5,
    "review": "As a working woman buying my first home alone in Mumbai, I was nervous about the legal process. Websual's team was transparent, patient, and guided me at every step. Zero hidden charges — exactly what they promised!",
    "property": "2BHK, Andheri West"
  },
  {
    "id": 3,
    "name": "Suresh & Kavitha Nair",
    "location": "Bangalore",
    "rating": 4,
    "review": "We were relocating from Chennai to Bangalore for work. Within a week of contacting Websual, we had shortlisted 5 properties and finalized one. The home loan assistance they provided saved us so much time and effort.",
    "property": "3BHK, Whitefield"
  },
  {
    "id": 4,
    "name": "Amit Agarwal",
    "location": "Pune",
    "rating": 5,
    "review": "I was investing in real estate for the first time and had many doubts about RERA compliance and resale value. The advisors at Websual were extremely knowledgeable and helped me make a confident decision. Great experience overall.",
    "property": "2BHK, Hinjewadi"
  },
  {
    "id": 5,
    "name": "Neha & Rohit Verma",
    "location": "Hyderabad",
    "rating": 5,
    "review": "Websual found us a beautiful villa in Hyderabad that perfectly matched our budget and Vastu requirements. The team was respectful, responsive on WhatsApp, and never pushy. Felt like working with family, not an agent.",
    "property": "Villa, Jubilee Hills"
  }
]

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const isInitialRender = useRef(true)
  const prevIndex = useRef(0)

  useEffect(() => {
    const allReviews = gsap.utils.toArray('.testimonial-text-wrapper', containerRef.current)
    
    if (isInitialRender.current) {
      // Set initial state without animating
      gsap.set(allReviews[0], { opacity: 1, x: 0, zIndex: 10, pointerEvents: 'auto' })
      gsap.set(allReviews.slice(1), { opacity: 0, x: 30, zIndex: 0, pointerEvents: 'none' })
      isInitialRender.current = false
      return
    }

    // Determine direction based on whether we are moving forward or backward
    const direction = activeIndex > prevIndex.current ? 1 : -1
    const distance = 50 // Reduced distance for a tighter, cleaner movement

    allReviews.forEach((review, index) => {
      if (index === activeIndex) {
         // Incoming element slides from the direction of travel
         gsap.fromTo(review, 
           { opacity: 0, x: distance * direction, zIndex: 10 },
           { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out', overwrite: 'auto', pointerEvents: 'auto' }
         )
      } else if (index === prevIndex.current) {
         // Outgoing element slides away into the opposite direction
         gsap.to(review, {
           opacity: 0, x: -distance * direction, duration: 0.15, ease: 'power2.out', overwrite: 'auto', zIndex: 0, pointerEvents: 'none'
         })
      } else {
         // Ensure all other non-active elements remain hidden and out of the way
         gsap.set(review, { opacity: 0, zIndex: 0, pointerEvents: 'none' })
      }
    })

    prevIndex.current = activeIndex
  }, [activeIndex])

  return (
    <section className="bg-[#151717] py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12" ref={containerRef}>
        
        {/* Header */}
        <h2 className="text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tight mb-16 md:mb-24">
          <span className="font-semibold text-white">Don't Take</span> <span className="text-[#999]">Our Word for It.</span>
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-start">
          
          {/* Left Column - Image */}
          <div className="relative w-full aspect-[4/3] lg:aspect-[1.2/1] overflow-hidden bg-white/10">
            <Image 
              src="/Testimonial/1.png" 
              fill 
              className="object-cover"
              alt="Testimonial" 
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col pt-0 lg:pt-8">
            
            {/* Top border line */}
            <div className="w-full h-[1px] bg-white/10 mb-8" />

            {/* Pagination and Quote Icon Row */}
            <div className="flex items-center justify-between mb-12">
              
              {/* Pagination Circles */}
              <div className="flex gap-3">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] transition-all duration-300 font-medium cursor-pointer ${
                      activeIndex === idx 
                        ? 'bg-white text-[#151717] border border-white' 
                        : 'bg-transparent text-white/50 border border-white/20 hover:border-white/50 hover:text-white'
                    }`}
                    aria-label={`View testimonial ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Double Quote SVG */}
              <div className="text-white w-8 h-8 flex items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 448 512" fill="currentColor" className="w-full h-full opacity-90">
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/>
                </svg>
              </div>
            </div>

            {/* Text Container (Relative for absolute children) */}
            <div className="relative w-full h-[350px] sm:h-[280px] md:h-[240px] lg:h-[320px]">
              {reviews.map((review, idx) => (
                <div 
                  key={review.id} 
                  className="testimonial-text-wrapper absolute inset-0 opacity-0 pointer-events-none"
                >
                  {/* Review Text */}
                  <p className="font-serif text-[clamp(20px,2vw,28px)] leading-[1.4] text-white mb-12" style={{ fontFamily: 'Georgia, serif' }}>
                    "{review.review}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 uppercase tracking-widest text-[11px] font-bold text-white">
                    <span>{review.name}</span>
                    <span className="text-white/30">/</span>
                    <div className="flex text-white text-[13px] gap-[2px]">
                      {/* Render stars */}
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-white" : "text-white/20"}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default Testimonial