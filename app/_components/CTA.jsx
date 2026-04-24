'use client'
import Image from 'next/image'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CTA = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-element', 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden py-32">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
            <Image 
                src="/CTA/1.png" 
                alt="Modern Real Estate Interior" 
                fill
                className="object-cover"
                sizes="100vw"
                quality={90}
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-6xl mx-auto">
            <h2 className="cta-element text-white text-6xl leading-[1.05] tracking-tight mb-6">
                The Right Home Exists. Let's Find Yours.
            </h2>
            

            <div className="cta-element mt-8">
              <button
                type="button"
                className="group hero-cta-button inline-flex items-center gap-2.5 !bg-white !text-black px-8 py-4 rounded-full transition-transform hover:scale-[1.02]"
                aria-haspopup="dialog"
                aria-expanded="false"
                data-state="closed"
              >
                <div className="relative overflow-hidden leading-tight font-medium">
                  <span
                    className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full"
                    data-text="Book a Visit"
                  >
                    Book a Visit
                  </span>
                </div>
                <span className="hero-cta-arrow transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="currentColor" d="m20.78 12.531-6.75 6.75a.75.75 0 1 1-1.06-1.061l5.47-5.47H3.75a.75.75 0 1 1 0-1.5h14.69l-5.47-5.469a.75.75 0 1 1 1.06-1.061l6.75 6.75a.75.75 0 0 1 0 1.061"></path>
                  </svg>
                </span>
              </button>
            </div>
        </div>
    </section>
  )
}

export default CTA