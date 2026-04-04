'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import Navbar from './Navbar'

const Hero = () => {
  const sectionRef = useRef(null)
  const buildingRef = useRef(null)
  const contentRef = useRef(null)
  const cloudLeftRef = useRef(null)
  const cloudRightRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight

      // Building rises up as you scroll (moves faster than scroll)
      if (buildingRef.current) {
        const buildingTranslate = scrollY * -0.5
        buildingRef.current.style.transform = `translateY(${buildingTranslate}px)`
      }

      // Text content moves up slower / stays, creating depth
      if (contentRef.current) {
        const contentTranslate = scrollY * 0.15
        contentRef.current.style.transform = `translateY(${contentTranslate}px)`
        // Fade out text as building covers it
        const opacity = Math.max(0, 1 - scrollY / (vh * 0.5))
        contentRef.current.style.opacity = opacity
      }

      // Clouds drift outward slightly
      if (cloudLeftRef.current) {
        const cloudShift = scrollY * -0.12
        cloudLeftRef.current.style.transform = `translateX(${cloudShift}px)`
      }
      if (cloudRightRef.current) {
        const cloudShift = scrollY * 0.12
        cloudRightRef.current.style.transform = `scaleX(-1) translateX(${cloudShift}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main>
      {/* Wrapper needs enough height to allow scrolling */}
      <div className="relative" style={{ height: '200vh' }}>
        <section
          ref={sectionRef}
          className="sticky top-0 h-screen w-full overflow-hidden"
        >

          {/* Background Sky */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Hero/bg.webp"
              alt="Sky background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Navbar */}
          <div className="relative z-50">
            <Navbar />
          </div>

          {/* Hero Content — positioned in upper-center area */}
          <div
            ref={contentRef}
            className="relative z-30 flex flex-col items-center text-center px-6 mt-[20vh] md:mt-[28vh] will-change-transform"
          >
            <h1 className="text-[clamp(2.8rem,7vw,7rem)] font-extrabold leading-[0.93] tracking-[-0.03em] text-black/85 mb-5 max-w-6xl">
              Find What Moves You
            </h1>

            <p className="text-base md:text-lg text-black/50 mb-8 max-w-xl tracking-[-0.01em]">
              Expert agents.{' '}
              <span className="font-semibold text-black/70">Real guidance.</span>{' '}
              A clear path to find what&apos;s next.
            </p>

            <Link
              href="/properties"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-black/85 text-white text-sm font-medium rounded-full no-underline transition-all duration-300 hover:bg-black hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Find Properties
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Cloud — left side */}
          <div
            ref={cloudLeftRef}
            className="absolute top-[26%] left-[-10%] z-40 pointer-events-none w-[55%] max-w-[750px] will-change-transform"
          >
            <Image
              src="/Hero/cloud.webp"
              alt=""
              width={800}
              height={300}
              className="w-full h-auto"
            />
          </div>

          {/* Cloud — right side */}
          <div
            ref={cloudRightRef}
            className="absolute top-[25%] right-[-15%] z-40 pointer-events-none w-[55%] max-w-[750px] scale-x-[-1] will-change-transform"
          >
            <Image
              src="/Hero/cloud.webp"
              alt=""
              width={800}
              height={300}
              className="w-full h-auto"
            />
          </div>

          {/* Building — parallax: rises up over text on scroll */}
          <div
            ref={buildingRef}
            className="absolute bottom-[-25%] left-0 right-0 mx-auto z-20 pointer-events-none w-[85%] max-w-[750px] will-change-transform"
          >
            <Image
              src="/Hero/house.webp"
              alt="Premium real estate building"
              width={1200}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>

        </section>
      </div>
    </main>
  )
}

export default Hero