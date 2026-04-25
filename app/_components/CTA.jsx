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
            // Heading Lines Reveal
            gsap.fromTo('.cta-title-line',
                { yPercent: 110 },
                {
                    yPercent: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            )

            // Button Fade Up
            gsap.fromTo('.cta-button-fade',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            )

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    gsap.set(containerRef.current, {
                        scale: 1 - self.progress * 0.05,
                        borderRadius: `${self.progress * 24}px`,
                        transformOrigin: 'center bottom',
                    })
                }
            })
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
                <h2 className="text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8 font-playfair-display">
                    {["The Right Home Exists.", "Let's Find Yours."].map((line, idx) => (
                        <div key={idx} className="overflow-hidden py-4 -my-4">
                            <span className="cta-title-line block">{line}</span>
                        </div>
                    ))}
                </h2>


                <div className="cta-button-fade mt-4">
                    <button
                        type="button"
                        className="group hero-cta-button inline-flex items-center gap-2.5 !bg-white !text-black px-10 py-5 rounded-full transition-transform hover:scale-[1.02] font-medium"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        data-state="closed"
                    >
                        <div className="relative overflow-hidden leading-tight">
                            <span
                                className="font-inter block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full"
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