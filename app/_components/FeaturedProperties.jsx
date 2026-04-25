'use client'
import Image from 'next/image'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)

// Register the reference site's exact easing: cubic-bezier(0.25, 1, 0.5, 1)
CustomEase.create('splideEase', 'M0,0 C0.25,1 0.5,1 1,1')

const slides = [
    {
        id: 1,
        title: ['ARJUN HEIGHTS', 'RESIDENCES'],
        description:
            'Spacious 3 & 4 BHK apartments with floor-to-ceiling windows, private balconies, and world-class amenities in the heart of Gurugram.',
        image: '/Featured/1.png',
        location: 'Sector 54, Gurugram',
        price: '₹2.8 Cr onwards',
        tag: 'RERA Registered',
    },
    {
        id: 2,
        title: ['ROYAL EMPRESS', 'PENTHOUSE'],
        description:
            'An exclusive collection of sky-high penthouses offering panoramic views of the city skyline, Vastu-compliant layouts, and bespoke interiors crafted for the elite.',
        image: '/Featured/2.png',
        location: 'Bandra West, Mumbai',
        price: '₹8.5 Cr onwards',
        tag: 'Limited Units',
    },
    {
        id: 3,
        title: ['VRINDAVAN', 'GARDEN VILLAS'],
        description:
            'Serene independent villas surrounded by lush landscaped gardens, offering the perfect blend of privacy, nature, and modern luxury living.',
        image: '/Featured/3.png',
        location: 'Whitefield, Bangalore',
        price: '₹4.2 Cr onwards',
        tag: 'New Launch',
    },
]

const FeaturedProperties = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const activeIndexRef = useRef(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const sectionRef = useRef(null)
    const slideRefs = useRef([])
    const imageRefs = useRef([])
    const titleRefs = useRef([])
    const infoRefs = useRef([])
    const containerRef = useRef(null)

    const getPrevIndex = useCallback((idx) => (idx - 1 + slides.length) % slides.length, [])
    const getNextIndex = useCallback((idx) => (idx + 1) % slides.length, [])

    // Calculate positions based on container width — GPU-only props
    const getPositions = useCallback(() => {
        const container = containerRef.current
        if (!container) return null
        const cw = container.offsetWidth
        // All slides have CSS left:50%. GSAP xPercent:-50 centers them.
        // Then 'x' offsets move them horizontally (GPU composited, no layout thrash).
        // Offsets as fraction of container width to match reference layout.
        const leftX = -cw * 0.4
        const rightX = cw * 0.4
        const farLeftX = -cw * 0.7
        const farRightX = cw * 0.7

        return {
            center: { x: 0, xPercent: -50, scale: 1, filter: 'brightness(1)', zIndex: 3, opacity: 1 },
            left: { x: leftX, xPercent: -50, scale: 0.85, filter: 'brightness(0.5)', zIndex: 1, opacity: 1 },
            right: { x: rightX, xPercent: -50, scale: 0.85, filter: 'brightness(0.5)', zIndex: 1, opacity: 1 },
            farLeft: { x: farLeftX, xPercent: -50, scale: 0.8, zIndex: 0, opacity: 0 },
            farRight: { x: farRightX, xPercent: -50, scale: 0.8, zIndex: 0, opacity: 0 },
        }
    }, [])

    const goToSlide = useCallback(
        (newIndex) => {
            if (isAnimating || newIndex === activeIndexRef.current) return
            setIsAnimating(true)

            const pos = getPositions()
            if (!pos) { setIsAnimating(false); return }

            const oldIndex = activeIndexRef.current

            let dir = newIndex > oldIndex ? 1 : -1
            if (oldIndex === slides.length - 1 && newIndex === 0) dir = 1
            if (oldIndex === 0 && newIndex === slides.length - 1) dir = -1

            const newRight = getNextIndex(newIndex)
            const newLeft = getPrevIndex(newIndex)
            const oldCenter = oldIndex

            const tl = gsap.timeline({
                onComplete: () => setIsAnimating(false),
            })

            const dur = 1.0
            const ease = 'splideEase'

            // ── 1. Text OUT — fast & crisp ──
            const oldTitleEl = titleRefs.current[oldIndex]
            const oldInfoEl = infoRefs.current[oldIndex]

            if (oldTitleEl) {
                const lines = oldTitleEl.querySelectorAll('.title-line')
                tl.to(lines, {
                    yPercent: dir * -110,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.03,
                    ease: 'power2.in',
                }, 0)
                tl.set(oldTitleEl, { visibility: 'hidden' }, 0.45)
            }
            if (oldInfoEl) {
                tl.to(oldInfoEl, { opacity: 0, y: 10, duration: 0.3, ease: 'power2.in' }, 0)
                tl.set(oldInfoEl, { visibility: 'hidden' }, 0.35)
            }

            // Pagination update — early for responsiveness
            tl.call(() => {
                activeIndexRef.current = newIndex
                setActiveIndex(newIndex)
            }, null, 0.15)

            // ── 2. Images — transform-only (x + scale), fully GPU composited ──
            if (dir === 1) {
                tl.to(slideRefs.current[oldCenter], {
                    ...pos.left, duration: dur, ease,
                }, 0)
                tl.to(slideRefs.current[getNextIndex(oldIndex)], {
                    ...pos.center, duration: dur, ease,
                }, 0)

                const wrapEl = slideRefs.current[newRight]
                gsap.set(wrapEl, { ...pos.farRight, visibility: 'visible' })
                tl.to(wrapEl, { ...pos.right, opacity: 1, duration: dur, ease }, 0)
            } else {
                tl.to(slideRefs.current[oldCenter], {
                    ...pos.right, duration: dur, ease,
                }, 0)
                tl.to(slideRefs.current[getPrevIndex(oldIndex)], {
                    ...pos.center, duration: dur, ease,
                }, 0)

                const wrapEl = slideRefs.current[newLeft]
                gsap.set(wrapEl, { ...pos.farLeft, visibility: 'visible' })
                tl.to(wrapEl, { ...pos.left, opacity: 1, duration: dur, ease }, 0)
            }

            // ── 3. Text IN — overlaps image movement for fluid feel ──
            const newTitleEl = titleRefs.current[newIndex]
            const newInfoEl = infoRefs.current[newIndex]

            if (newTitleEl) {
                const lines = newTitleEl.querySelectorAll('.title-line')
                tl.set(newTitleEl, { visibility: 'visible' }, 0.25)
                tl.fromTo(lines,
                    { yPercent: dir * 80, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.06, ease: 'power3.out' },
                    0.3
                )
            }
            if (newInfoEl) {
                tl.set(newInfoEl, { visibility: 'visible', opacity: 1 }, 0.35)
                const elements = newInfoEl.querySelectorAll('.info-child')
                tl.fromTo(elements,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
                    0.4
                )
            }
        },
        [isAnimating, getNextIndex, getPrevIndex, getPositions]
    )

    const handleImageClick = useCallback((clickedIndex) => {
        const currentIdx = activeIndexRef.current
        const leftIdx = getPrevIndex(currentIdx)
        const rightIdx = getNextIndex(currentIdx)

        if (clickedIndex === leftIdx) goToSlide(leftIdx)
        else if (clickedIndex === rightIdx) goToSlide(rightIdx)
    }, [goToSlide, getPrevIndex, getNextIndex])

    // Initial setup and entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const pos = getPositions()
            if (!pos) return

            const centerEl = slideRefs.current[0]
            const rightEl = slideRefs.current[1]
            const leftEl = slideRefs.current[2]

            // Set initial positions
            gsap.set(centerEl, { ...pos.center, clipPath: 'inset(100% 0% 0% 0%)' })
            gsap.set(rightEl, { ...pos.right, opacity: 0, scale: 0.8 })
            gsap.set(leftEl, { ...pos.left, opacity: 0, scale: 0.8 })

            // Entrance animations
            gsap.to(centerEl, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut', delay: 0.2 })
            gsap.to(rightEl, { opacity: 1, scale: 0.85, duration: 1.0, delay: 0.5, ease: 'power3.out' })
            gsap.to(leftEl, { opacity: 1, scale: 0.85, duration: 1.0, delay: 0.5, ease: 'power3.out' })

            // Hide inactive text
            titleRefs.current.forEach((el, idx) => {
                if (idx !== 0) gsap.set(el, { visibility: 'hidden' })
            })
            infoRefs.current.forEach((el, idx) => {
                if (idx !== 0) gsap.set(el, { visibility: 'hidden' })
            })

            const activeTitleEl = titleRefs.current[0]
            if (activeTitleEl) {
                const lines = activeTitleEl.querySelectorAll('.title-line')
                gsap.fromTo(lines, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, delay: 0.6, stagger: 0.1, ease: 'power3.out' })
            }

            const activeInfoEl = infoRefs.current[0]
            if (activeInfoEl) {
                const elements = activeInfoEl.querySelectorAll('.info-child')
                gsap.fromTo(elements, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.8, stagger: 0.1, ease: 'power3.out' })
            }

            if (imageRefs.current.length > 0) {
                gsap.fromTo(
                    imageRefs.current,
                    { scale: 1.4 },
                    {
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [getPositions])

    return (
        <section
            id="properties"
            ref={sectionRef}
            className="relative overflow-hidden bg-[#151717]"
            style={{ minHeight: '100vh' }}
        >
            {/* ── Header Row: Label + Pagination ── */}
            <div
                className="flex items-center justify-between px-8 md:px-12 lg:px-16"
                style={{ paddingTop: '100px', paddingBottom: '30px', zIndex: 10, position: 'relative' }}>

                <p
                    className="text-[#999] text-base tracking-wider font-inter">
                    Our Properties
                </p>

                <div className="flex items-center gap-4 font-lora" style={{ zIndex: 10 }}>
                    {slides.map((slide, idx) => (
                        <button
                            key={slide.id}
                            onClick={() => goToSlide(idx)}
                            className="transition-all duration-300 cursor-pointer"
                            style={{
                                color: idx === activeIndex ? '#ffffff' : 'rgba(255,255,255,0.4)',
                                fontSize: '14px',
                                background: 'none',
                                border: 'none',
                                padding: '4px 6px',
                            }}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Carousel Area ── */}
            <div
                ref={containerRef}
                className="relative"
                style={{
                    height: 'calc(100vh - 200px)',
                    maxHeight: '720px',
                    minHeight: '500px',
                }}
            >
                {/* Images Container */}
                <div className="absolute inset-0">
                    {slides.map((slide, i) => (
                        <div
                            key={slide.id}
                            ref={(el) => (slideRefs.current[i] = el)}
                            className="absolute overflow-hidden"
                            onClick={() => handleImageClick(i)}
                            style={{
                                left: '50%',
                                top: '5%',
                                width: '32%',
                                height: '90%',
                                opacity: 0,
                                cursor: i !== activeIndex ? 'pointer' : 'default',
                                willChange: 'transform, opacity',
                                backfaceVisibility: 'hidden',
                            }}
                        >
                            <div className="absolute inset-0" ref={(el) => (imageRefs.current[i] = el)} style={{ transform: 'scale(1.4)' }}>
                                <Image
                                    src={slide.image}
                                    alt={slide.title.join(' ')}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                    loading="eager"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Title Overlay (Grid Stack) ── */}
                <div
                    className="absolute inset-0 grid pointer-events-none"
                    style={{ zIndex: 5, placeItems: 'start center', paddingTop: '8vh' }}
                >
                    {slides.map((slide, i) => (
                        <h2
                            key={slide.id}
                            ref={(el) => (titleRefs.current[i] = el)}
                            className="text-center text-white"
                            style={{
                                gridArea: '1 / 1',
                                fontSize: 'clamp(48px, 8vw, 120px)',
                                fontWeight: 400,
                                lineHeight: 0.95,
                                letterSpacing: '-0.02em',
                                textTransform: 'uppercase',
                                textShadow: '0 4px 60px rgba(0,0,0,0.5)',
                                fontFamily: "Playfair Display"
                            }}
                        >
                            {slide.title.map((line, lineIdx) => (
                                <div key={lineIdx} className="overflow-hidden py-6 -my-6" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <span className="title-line block">{line}</span>
                                </div>
                            ))}
                        </h2>
                    ))}
                </div>
            </div>

            {/* ── Bottom Info Bar (Grid Stack) ── */}
            <div
                className="grid px-8 md:px-12 lg:px-16"
                style={{
                    paddingTop: '40px',
                    paddingBottom: '100px',
                    maxWidth: '900px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                {slides.map((slide, i) => (
                    <div
                        key={slide.id}
                        ref={(el) => (infoRefs.current[i] = el)}
                        className="flex items-center gap-6 justify-center"
                        style={{ gridArea: '1 / 1' }}
                    >
                        <p
                            className="text-[#999] info-child font-inter"
                            style={{
                                fontSize: '14px',
                                lineHeight: 1.6,
                                maxWidth: '360px',
                            }}
                        >
                            {slide.description}
                        </p>
                        <button
                            className="font-inter group shrink-0 cursor-pointer info-child inline-flex items-center gap-2.5 font-inter no-underline border border-white/30 bg-transparent text-white rounded-full px-7 py-3 text-[12px] font-medium uppercase tracking-[0.08em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] will-change-transform"
                        >
                            <div className="relative overflow-hidden leading-tight">
                                <span 
                                    className="font-inter block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full" 
                                    data-text="Learn More"
                                >
                                    Learn More
                                </span>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedProperties