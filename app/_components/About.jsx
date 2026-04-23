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

            // Label "(Why us?)" — fade up
            gsap.fromTo(
                labelRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: labelRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                    },
                }
            )

            // Heading lines — staggered fade up
            const headingLines = headingRef.current?.querySelectorAll('.heading-line')
            if (headingLines?.length) {
                gsap.fromTo(
                    headingLines,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                )
            }

            // Image — clip-path reveal + subtle scale
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
                    { scale: 1.3 },
                    {
                        scale: 1,
                        duration: 1.4,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: imageWrapRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                )
            }

            // Right column text — fade up with stagger
            const textParas = [textCol1Ref.current, textCol2Ref.current].filter(Boolean)
            if (textParas.length) {
                gsap.fromTo(
                    textParas,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        stagger: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: textParas[0],
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
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative" style={{ zIndex: 30, marginTop: '-100vh' }}>
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
                        <p
                            ref={labelRef}
                            className="text-black/60 text-sm tracking-wider"
                        >
                            (Why us?)
                        </p>

                        <h2
                            ref={headingRef}
                            className="text-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] mt-auto"
                        >
                            <span className="heading-line inline-block">
                                <em className="font-normal">Crafted</em>
                            </span>
                            <br />
                            <span className="heading-line inline-block">With Care,</span>
                            <br />
                            <span className="heading-line inline-block">
                                <em className="font-normal">Designed</em>
                            </span>
                            <br />
                            <span className="heading-line inline-block">For Life</span>
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
                                src="/About/1.png"
                                alt="Premium interior design"
                                width={1920}
                                height={1080}
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Column — Body Text */}
                    <div className="flex flex-col justify-start gap-8 pt-2">
                        <p ref={textCol1Ref} className="text-black/70 text-sm md:text-[15px] leading-relaxed">
                            At Websual, your dream home is our priority. We go beyond just listings, offering end-to-end support, verified properties, and honest guidance at every step.
                        </p>
                        <p ref={textCol2Ref} className="text-black/70 text-sm md:text-[15px] leading-relaxed">
                            Whether you&apos;re a first-time homebuyer, a seasoned investor, or a business looking for commercial space, we bring expertise, transparency, and trust to make your journey smooth, stress-free, and rewarding.
                        </p>
                    </div>

                </div>


                {/* ── Stats Section ── */}
                <div ref={statsRef} className="mt-28 md:mt-40 pb-16 md:pb-24 relative" style={{ minHeight: '60vh' }}>

                    {/* Row 1 — Right aligned: ₹500Cr+ and 20+ */}
                    <div className="flex justify-end gap-16 md:gap-24 lg:gap-32 mb-16 md:mb-24">
                        <div className="stat-item">
                            <p
                                className="text-black text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-none"
                            >
                                ₹500Cr<span className="text-4xl md:text-5xl align-top">+</span>
                            </p>
                            <p className="text-black/50 text-xs md:text-sm mt-3 leading-snug max-w-[200px]">
                                Worth of Properties Sold<br />across India.
                            </p>
                        </div>
                        <div className="stat-item">
                            <p
                                className="text-black text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-none"
                            >
                                20<span className="text-4xl md:text-5xl align-top">+</span>
                            </p>
                            <p className="text-black/50 text-xs md:text-sm mt-3 leading-snug max-w-[200px]">
                                Cities we operate in,<br />pan-India presence.
                            </p>
                        </div>
                    </div>

                    {/* Row 2 — Left aligned: 50+ */}
                    <div className="flex justify-start mb-16 md:mb-24">
                        <div className="stat-item">
                            <p
                                className="text-black text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-none"
                            >
                                50<span className="text-4xl md:text-5xl align-top">+</span>
                            </p>
                            <p className="text-black/50 text-xs md:text-sm mt-3 leading-snug max-w-[220px]">
                                RERA verified projects,<br />each tailored for trust &amp; transparency.
                            </p>
                        </div>
                    </div>

                    {/* Row 3 — Center-left: 24/7 */}
                    <div className="flex justify-start md:justify-center md:mr-[30%]">
                        <div className="stat-item">
                            <p
                                className="text-black text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-none"
                            >
                                24<span className="text-4xl md:text-5xl">/</span>7
                            </p>
                            <p className="text-black/50 text-xs md:text-sm mt-3 leading-snug max-w-[220px]">
                                Expert support, always<br />meeting every need effortlessly.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default About