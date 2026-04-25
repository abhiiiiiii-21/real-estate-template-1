'use client'
import Image from 'next/image'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
    const sectionRef = useRef(null)
    const labelRef = useRef(null)
    const headingRef = useRef(null)
    const imageWrapRef = useRef(null)
    const imageRef = useRef(null)
    const textCol1Ref = useRef(null)
    const textCol2Ref = useRef(null)
    const statsRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── About Content Animations ──

            // Label "(Why us?)" — reveal from bottom
            gsap.fromTo(
                '.about-label-line',
                { yPercent: 100 },
                {
                    yPercent: 0,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: labelRef.current,
                        start: 'top 95%',
                        toggleActions: 'play none none none',
                    },
                }
            )

            // Heading lines — staggered reveal from bottom
            const headingLines = headingRef.current?.querySelectorAll('.heading-line')
            if (headingLines?.length) {
                gsap.fromTo(
                    headingLines,
                    { yPercent: 110 },
                    {
                        yPercent: 0,
                        duration: 1.2,
                        stagger: 0.1,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                )
            }

            // Image — clip-path reveal + continuous 3D scrub scale
            if (imageWrapRef.current && imageRef.current) {
                gsap.fromTo(
                    imageWrapRef.current,
                    { clipPath: 'inset(100% 0% 0% 0%)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 1.2,
                        ease: 'power4.inOut',
                        scrollTrigger: {
                            trigger: imageWrapRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                )
                gsap.fromTo(
                    imageRef.current,
                    { scale: 1.4 },
                    {
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: imageWrapRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                )
            }

            // Right column text — reveal from bottom
            const textLines = [textCol1Ref.current, textCol2Ref.current].filter(Boolean)
            if (textLines.length) {
                gsap.fromTo(
                    textLines,
                    { yPercent: 100, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: textCol1Ref.current,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        },
                    }
                )
            }

            // ── Stats Animations ──
            const statItems = statsRef.current?.querySelectorAll('.stat-item')
            if (statItems?.length) {
                statItems.forEach((item, i) => {
                    gsap.fromTo(
                        item,
                        { opacity: 0, y: 60 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            delay: i * 0.1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 90%',
                                toggleActions: 'play none none none',
                            },
                        }
                    )

                    const numbers = item.querySelectorAll('.stat-number')
                    numbers.forEach(num => {
                        const target = num.getAttribute('data-target')
                        gsap.fromTo(num, 
                            { innerHTML: 0 },
                            {
                                innerHTML: target,
                                duration: 2,
                                delay: i * 0.1,
                                ease: 'power3.out',
                                snap: { innerHTML: 1 },
                                scrollTrigger: {
                                    trigger: item,
                                    start: 'top 90%',
                                    toggleActions: 'play none none none',
                                }
                            }
                        )
                    })
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="about" className="relative" style={{ zIndex: 30, marginTop: '-100vh' }}>
            <div className="relative">
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none relative z-[1]">
                        <Image
                            src="/Hero/smoke.webp"
                            alt=""
                            width={3840}
                            height={1240}
                            sizes="100vw"
                            className="w-full h-auto"
                        />
                    </div>
                    <div
                        className="absolute inset-0 z-[2]"
                        style={{
                            background:
                                'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 35%, #ffffff 100%)',
                        }}
                    />
                </div>
            </div>

            {/* ── About Section ── */}
            <div className="bg-white px-10 md:px-16 lg:px-20 py-6 md:py-6">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] gap-8 md:gap-10 items-start min-h-[70vh]">

                    {/* Left Column — Label + Heading */}
                    <div className="flex flex-col justify-between h-full">
                        <div className="overflow-hidden py-1 -my-1">
                            <p
                                ref={labelRef}
                                className="about-label-line text-black text-base font-semibold tracking-wider font-inter">
                                Why us?
                            </p>
                        </div>

                        <h2
                            ref={headingRef}
                            className="text-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-auto font-playfair-display">
                            <div className="overflow-hidden py-2 -my-2">
                                <span className="heading-line inline-block">
                                    Crafted
                                </span>
                            </div>
                            <div className="overflow-hidden py-2 -my-2">
                                <span className="heading-line inline-block italic text-[#999]">With Care,</span>
                            </div>
                            <div className="overflow-hidden py-2 -my-2">
                                <span className="heading-line inline-block">
                                    Designed
                                </span>
                            </div>
                            <div className="overflow-hidden py-2 -my-2">
                                <span className="heading-line inline-block italic text-[#999]">For Life</span>
                            </div>
                        </h2>
                    </div>

                    {/* Center Column — Image */}
                    <div
                        ref={imageWrapRef}
                        className="overflow-hidden h-full"
                        style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    >
                        <div
                            ref={imageRef}
                            style={{ transform: 'scale(1.3)', width: '100%', height: '100%' }}
                        >
                            <Image
                                src="/About/1.jpg"
                                alt="Premium interior design"
                                width={896}
                                height={1344}
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Column — Body Text */}
                    <div className="flex flex-col justify-start gap-8 pt-2 font-inter">
                        <div className="overflow-hidden py-1 -my-1">
                            <p ref={textCol1Ref} className="text-black/70 text-sm md:text-[15px] leading-relaxed">
                                At Websual, your dream home is our priority. We go beyond just listings, offering end-to-end support, verified properties, and honest guidance at every step.
                            </p>
                        </div>
                        <div className="overflow-hidden py-1 -my-1">
                            <p ref={textCol2Ref} className="text-black/70 text-sm md:text-[15px] leading-relaxed">
                                Whether you&apos;re a first-time homebuyer, a seasoned investor, or a business looking for commercial space, we bring expertise, transparency, and trust to make your journey smooth, stress-free, and rewarding.
                            </p>
                        </div>
                    </div>

                </div>


                {/* ── Stats Section ── */}
                <div ref={statsRef} className="mt-28 md:mt-40 pb-16 md:pb-24 relative" style={{ minHeight: '60vh' }}>

                    {/* Row 1 — Right aligned: ₹500Cr+ and 20+ */}
                    <div className="flex justify-end gap-16 md:gap-24 lg:gap-32 mb-16 md:mb-24">
                        <div className="stat-item">
                            <p
                                className="font-lora text-black text-6xl md:text-7xl lg:text-8xl font-light leading-none">
                                ₹<span className="stat-number" data-target="500">500</span> <span className="text-6xl md:text-7xl lg:text-8xl font-inter italic tracking-[-0.1em]">Cr <span className="text-4xl md:text-5xl font-inter align-top">+</span></span>
                            </p>
                            <p className="text-[#999] text-xs md:text-sm mt-3 leading-snug max-w-[200px] font-inter">
                                worth of Properties Sold<br />across India.
                            </p>
                        </div>
                        <div className="stat-item">
                            <p
                                className="text-black text-6xl md:text-7xl lg:text-8xl font-light font-lora  leading-none"
                            >
                                <span className="stat-number" data-target="20">20</span><span className="text-4xl md:text-5xl align-top font-inter">+</span>
                            </p>
                            <p className="text-[#999] text-xs md:text-sm mt-3 leading-snug max-w-[200px] font-inter">
                                cities we operate in,<br />pan-India presence.
                            </p>
                        </div>
                    </div>

                    {/* Row 2 — Left aligned: 50+ */}
                    <div className="flex justify-start mb-16 md:mb-24">
                        <div className="stat-item">
                            <p
                                className="text-black text-6xl md:text-7xl lg:text-8xl font-light font-lora leading-none"
                            >
                                <span className="stat-number" data-target="50">50</span><span className="text-4xl md:text-5xl align-top font-inter">+</span>
                            </p>
                            <p className="text-[#999] text-xs md:text-sm mt-3 leading-snug max-w-[220px] font-inter">
                                RERA verified projects,<br />each tailored for trust &amp; transparency.
                            </p>
                        </div>
                    </div>

                    {/* Row 3 — Center-left: 24/7 */}
                    <div className="flex justify-start md:justify-center md:mr-[30%]">
                        <div className="stat-item">
                            <p
                                className="text-black text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] font-lora leading-none">
                                <span className="stat-number" data-target="24">24</span><span className="font-inter mx-1">/</span><span className="stat-number" data-target="7">7</span>
                            </p>
                            <p className="text-[#999] text-xs md:text-sm mt-3 leading-snug max-w-[220px] font-inter">
                                expert support, always<br />meeting every need effortlessly.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default About