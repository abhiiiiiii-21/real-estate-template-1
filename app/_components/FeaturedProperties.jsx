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
        title: ['LUMIÈRE DUPLEX', 'RESIDENCES'],
        description:
            'Two-story luxury apartments that features sunlit living spaces, private terraces, and a selection of exclusive amenities.',
        image: '/Featured/1.png',
    },
    {
        id: 2,
        title: ['CROWN JEWEL', 'PENTHOUSE'],
        description:
            'With panoramic views, curated interiors, and spaces shaped for comfort and sophistication, the penthouse becomes more than a home.',
        image: '/Featured/2.png',
    },
    {
        id: 3,
        title: ['AURELIA', 'GARDEN SUITES'],
        description:
            'Ground-level sanctuaries offering serene private gardens and a seamless blend of indoor comfort and outdoor tranquility.',
        image: '/Featured/3.png',
    },
]

const FeaturedProperties = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const activeIndexRef = useRef(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const sectionRef = useRef(null)
    const slideRefs = useRef([])
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
                tl.set(newInfoEl, { visibility: 'visible' }, 0.35)
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
        }, sectionRef)

        return () => ctx.revert()
    }, [getPositions])

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#151717]"
            style={{ minHeight: '100vh' }}
        >
            {/* ── Header Row: Label + Pagination ── */}
            <div
                className="flex items-center justify-between px-8 md:px-12 lg:px-16"
                style={{ paddingTop: '40px', paddingBottom: '20px', zIndex: 10, position: 'relative' }}
            >
                <p className="text-white/70 text-sm tracking-wider italic">
                    (OUR LIVINGS)
                </p>
                <div className="flex items-center gap-4" style={{ zIndex: 10 }}>
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
                            ({idx + 1})
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
                    ))}
                </div>

                {/* ── Title Overlay (Grid Stack) ── */}
                <div
                    className="absolute inset-0 grid pointer-events-none"
                    style={{ zIndex: 5, placeItems: 'center' }}
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
                                fontFamily: "'Playfair Display', 'Times New Roman', serif"
                            }}
                        >
                            {slide.title.map((line, lineIdx) => (
                                <div key={lineIdx} className="overflow-hidden" style={{ display: 'flex', justifyContent: 'center' }}>
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
                    paddingTop: '28px',
                    paddingBottom: '40px',
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
                            className="text-white/70 info-child"
                            style={{
                                fontSize: '14px',
                                lineHeight: 1.6,
                                maxWidth: '360px',
                            }}
                        >
                            {slide.description}
                        </p>
                        <button
                            className="flex-shrink-0 cursor-pointer info-child"
                            style={{
                                color: '#ffffff',
                                fontSize: '12px',
                                fontWeight: 400,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '9999px',
                                padding: '12px 28px',
                                background: 'transparent',
                                transition: 'all 0.35s ease',
                                fontFamily: "'Inter', sans-serif"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                            }}
                        >
                            Learn More
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedProperties