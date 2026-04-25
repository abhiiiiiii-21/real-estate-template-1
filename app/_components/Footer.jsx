'use client'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
    const containerRef = useRef(null)
    const lenis = useLenis()

    const handleScroll = (e, href) => {
        if (!href || href === '#') return
        e.preventDefault()
        lenis?.scrollTo(href, {
            duration: 2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease for that "Awwwards" feel
        })
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.footer-letter', {
                y: '0%',
                stagger: 0.05,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <footer ref={containerRef} className="bg-[#151717] pt-24 pb-8 px-8 md:px-12 lg:px-16 overflow-hidden font-inter">
            <div className="max-w-[1400px] mx-auto">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start w-full">

                    {/* Left Column - Subscribe & Contact */}
                    <div className="w-full lg:w-[45%]">
                        <h3 className="text-white text-2xl font-medium mb-8 font-playfair-display">Subscribe to our Newsletter!</h3>

                        <div className="relative border-b border-white/20 pb-3 mb-16 group">
                            <input
                                type="email"
                                placeholder="Enter address"
                                className="w-full bg-transparent text-white placeholder-white/40 text-sm focus:outline-none pr-8"
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/80 group-hover:text-white transition-colors"
                                aria-label="Subscribe">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
                            <div>
                                <h4 className="text-white/40 text-[11px] uppercase tracking-wider font-semibold mb-4">Head Office</h4>
                                <p className="text-white text-sm leading-relaxed">
                                    12, DLF Cyber City, Sector 24,<br />
                                    Gurugram, Haryana 122002
                                </p>
                            </div>
                            <div>
                                <h4 className="text-white/40 text-[11px] uppercase tracking-wider font-semibold mb-4">Email Us</h4>
                                <a href="mailto:hello@findrealestate.com" className="text-white text-sm hover:text-gray-300 transition-colors">
                                    contact@websual.agency
                                </a>
                            </div>
                            <div>
                                <h4 className="text-white/40 text-[11px] uppercase tracking-wider font-semibold mb-4">Call Us</h4>
                                <a href="tel:+12129949965" className="text-white text-sm hover:text-gray-300 transition-colors whitespace-nowrap">
                                    +91 9171992670
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-16 lg:gap-32 mt-16 lg:mt-0">
                        <div className="flex flex-col gap-5">
                            {[
                                { name: 'Amenities', href: '#' },
                                { name: 'Properties', href: '#properties' },
                                { name: 'Testimonials', href: '#testimonials' },
                                { name: 'About', href: '#about' }
                            ].map((link) => (
                                <a 
                                    key={link.name} 
                                    href={link.href} 
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className="group text-white text-xl font-normal w-fit"
                                >
                                    <div className="relative overflow-hidden leading-tight">
                                        <span
                                            className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full"
                                            data-text={link.name}
                                        >
                                            {link.name}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <div className="flex flex-col gap-5">
                            {[
                                { name: 'Instagram', url: 'https://www.instagram.com/websual.agency' },
                                { name: 'Linkedin', url: 'https://www.instagram.com/websual.agency' }
                            ].map((link) => (
                                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="group text-white/80 text-sm w-fit">
                                    <div className="relative overflow-hidden leading-tight">
                                        <span
                                            className="block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full group-hover:text-white"
                                            data-text={link.name}
                                        >
                                            {link.name}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Huge Text Section */}
                <div className="mt-6 md:mt-20 w-full flex justify-start">
                    <h1 className="text-[14vw] sm:text-[16vw] lg:text-[15.5vw] leading-[0.75] font-black text-white overflow-hidden flex font-playfair-display pb-4">
                        {"WEBSUAL".split('').map((char, index) => (
                            <span key={index} className="footer-letter inline-block translate-y-[120%]">
                                {char}
                            </span>
                        ))}
                    </h1>
                </div>

                {/* Bottom Strip */}
                <div className="mt-12 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 pt-6">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        {[
                            'Terms',
                            'Privacy policy'
                        ].map((link) => (
                            <a key={link} href="#" className="group text-white/40 text-[11px] w-fit">
                                <div className="relative overflow-hidden leading-tight">
                                    <span
                                        className="block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full group-hover:text-white"
                                        data-text={link}
                                    >
                                        {link}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-white/40 text-[11px] shrink-0 mt-2 xl:mt-0">
                        <span>WEBSUAL</span>
                        <span>Copyright © 2026</span>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer