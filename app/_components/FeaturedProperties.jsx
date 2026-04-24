'use client'
import Image from 'next/image'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'

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

const positions = {
    left: { left: '0%', xPercent: 0, width: '22%', filter: 'brightness(0.5)', zIndex: 1, opacity: 1, scale: 1 },
    center: { left: '50%', xPercent: -50, width: '34%', filter: 'brightness(1)', zIndex: 2, opacity: 1, scale: 1 },
    right: { left: '100%', xPercent: -100, width: '22%', filter: 'brightness(0.5)', zIndex: 1, opacity: 1, scale: 1 },
    farRight: { left: '105%', xPercent: 0, width: '22%', filter: 'brightness(0.5)', zIndex: 0, opacity: 0, scale: 0.95 },
    farLeft: { left: '-27%', xPercent: 0, width: '22%', filter: 'brightness(0.5)', zIndex: 0, opacity: 0, scale: 0.95 },
}

const FeaturedProperties = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const activeIndexRef = useRef(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const sectionRef = useRef(null)
    const slideRefs = useRef([])
    const titleRefs = useRef([])
    const infoRefs = useRef([])

    const getPrevIndex = useCallback((idx) => (idx - 1 + slides.length) % slides.length, [])
    const getNextIndex = useCallback((idx) => (idx + 1) % slides.length, [])

    const goToSlide = useCallback(
        (newIndex) => {
            if (isAnimating || newIndex === activeIndexRef.current) return
            setIsAnimating(true)

            const oldIndex = activeIndexRef.current

            // Determine direction logically
            let dir = newIndex > oldIndex ? 1 : -1
            if (oldIndex === slides.length - 1 && newIndex === 0) dir = 1
            if (oldIndex === 0 && newIndex === slides.length - 1) dir = -1

            const newCenter = newIndex
            const newLeft = getPrevIndex(newIndex)
            const newRight = getNextIndex(newIndex)

            const oldCenter = oldIndex
            const oldLeft = getPrevIndex(oldIndex)
            const oldRight = getNextIndex(oldIndex)

            const tl = gsap.timeline({
                onComplete: () => {
                    setIsAnimating(false)
                },
            })

            const dur = 1.0;
            const ease = 'power3.inOut';

            // ── 1. Animate OUT old text ──
            const oldTitleEl = titleRefs.current[oldIndex]
            const oldInfoEl = infoRefs.current[oldIndex]
            
            if (oldTitleEl) {
                const lines = oldTitleEl.querySelectorAll('.title-line')
                tl.to(lines, { yPercent: dir * -100, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.inOut' }, 0)
                tl.set(oldTitleEl, { visibility: 'hidden' }, 0.6)
            }
            if (oldInfoEl) {
                tl.to(oldInfoEl, { opacity: 0, y: 15, duration: 0.4, ease: 'power2.inOut' }, 0)
                tl.set(oldInfoEl, { visibility: 'hidden' }, 0.5)
            }

            // Update React state for pagination highlight
            tl.call(() => {
                activeIndexRef.current = newIndex
                setActiveIndex(newIndex)
            }, null, 0.4)

            // ── 2. Animate Images ──
            if (dir === 1) {
                // Moving forward
                tl.to(slideRefs.current[oldCenter], { ...positions.left, duration: dur, ease }, 0)
                tl.to(slideRefs.current[oldRight], { ...positions.center, duration: dur, ease }, 0)

                // Wrapping slide (was oldLeft, needs to come from farRight)
                const wrapEl = slideRefs.current[newRight]
                gsap.set(wrapEl, { ...positions.farRight, opacity: 0, visibility: 'visible' })
                tl.to(wrapEl, { ...positions.right, opacity: 1, duration: dur, ease }, 0.05)
            } else {
                // Moving backward
                tl.to(slideRefs.current[oldCenter], { ...positions.right, duration: dur, ease }, 0)
                tl.to(slideRefs.current[oldLeft], { ...positions.center, duration: dur, ease }, 0)

                // Wrapping slide (was oldRight, needs to come from farLeft)
                const wrapEl = slideRefs.current[newLeft]
                gsap.set(wrapEl, { ...positions.farLeft, opacity: 0, visibility: 'visible' })
                tl.to(wrapEl, { ...positions.left, opacity: 1, duration: dur, ease }, 0.05)
            }

            // ── 3. Animate IN new text ──
            const newTitleEl = titleRefs.current[newIndex]
            const newInfoEl = infoRefs.current[newIndex]

            if (newTitleEl) {
                const lines = newTitleEl.querySelectorAll('.title-line')
                tl.set(newTitleEl, { visibility: 'visible' }, 0.3)
                tl.fromTo(lines, { yPercent: dir * 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, dur * 0.4)
            }
            if (newInfoEl) {
                tl.set(newInfoEl, { visibility: 'visible' }, 0.3)
                const elements = newInfoEl.querySelectorAll('.info-child')
                tl.fromTo(elements, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, dur * 0.5)
            }
        },
        [isAnimating, getNextIndex, getPrevIndex]
    )

    // Click handlers for side images
    const handleImageClick = useCallback((clickedIndex) => {
        const currentIdx = activeIndexRef.current
        const leftIdx = getPrevIndex(currentIdx)
        const rightIdx = getNextIndex(currentIdx)

        if (clickedIndex === leftIdx) {
            goToSlide(leftIdx)
        } else if (clickedIndex === rightIdx) {
            goToSlide(rightIdx)
        }
    }, [goToSlide, getPrevIndex, getNextIndex])

    // Initial setup and entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const centerEl = slideRefs.current[0]
            const rightEl = slideRefs.current[1]
            const leftEl = slideRefs.current[2]

            // Images Setup
            gsap.set(centerEl, { ...positions.center, clipPath: 'inset(100% 0% 0% 0%)' })
            gsap.set(rightEl, { ...positions.right, opacity: 0, scale: 0.9 })
            gsap.set(leftEl, { ...positions.left, opacity: 0, scale: 0.9 })

            // Images Entrance
            gsap.to(centerEl, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut', delay: 0.2 })
            gsap.to([leftEl, rightEl], { opacity: 1, scale: 1, duration: 1.0, delay: 0.5, ease: 'power3.out' })

            // Text Entrance (only active slide)
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
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#111111]"
            style={{
                minHeight: '100vh',
                fontFamily: "'Inter', sans-serif",
            }}
        >
            {/* ── Header Row: Label + Pagination ── */}
            <div
                className="flex items-center justify-between px-8 md:px-12 lg:px-16"
                style={{ paddingTop: '40px', paddingBottom: '20px', zIndex: 10, position: 'relative' }}
            >
                <p
                    className="text-white/70 text-sm tracking-wider italic"
                >
                    (OUR LIVINGS)
                </p>

                {/* Pagination Numbers */}
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
                className="relative"
                style={{
                    height: 'calc(100vh - 200px)',
                    maxHeight: '720px',
                    minHeight: '500px',
                }}
            >
                {/* Images Container */}
                <div className="absolute inset-0" style={{ padding: '0' }}>
                    {slides.map((slide, i) => (
                        <div
                            key={slide.id}
                            ref={(el) => (slideRefs.current[i] = el)}
                            className="absolute top-0 bottom-0 overflow-hidden"
                            onClick={() => handleImageClick(i)}
                            style={{
                                opacity: 0,
                                cursor: i !== activeIndex ? 'pointer' : 'default',
                                willChange: 'transform, opacity, clip-path',
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