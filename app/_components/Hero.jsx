'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import PropertyCard from './_Hero/card'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const rootRef = useRef(null)
  const houseRef = useRef(null)
  const contentRef = useRef(null)
  const cloudLeftRef = useRef(null)
  const cloudRightRef = useRef(null)
  const smokeRef = useRef(null)
  const [isCardOpen, setIsCardOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const baseTrigger = {
        trigger: rootRef.current,
        start: 'top top',
        end: '67% top',
        scrub: 0.6,
      }

      // House — entrance animation
      const houseImg = houseRef.current.querySelector('img')
      if (houseImg) {
        gsap.from(houseImg, {
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
        })
        gsap.from(houseImg, {
          yPercent: 10,
          duration: 3,
          ease: 'expo.out',
          delay: 0.2,
        })
      }

      // Clouds — entrance animation
      [cloudLeftRef, cloudRightRef].forEach((ref, idx) => {
        const cloudImg = ref.current.querySelector('img')
        if (cloudImg) {
          const isRight = idx === 1
          gsap.from(cloudImg, {
            opacity: 0,
            yPercent: 15,
            duration: isRight ? 3.5 : 2.5,
            ease: 'power3.out',
            delay: isRight ? 0.5 : 0.3
          })
        }
      })

      // Content Entrance Reveal
      gsap.from('.hero-title-line', {
        yPercent: 100,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.6
      })

      gsap.from('.hero-desc-line', {
        yPercent: 100,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9
      })

      gsap.from('.hero-cta-reveal', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.1
      })

      // House — rises upward and scales heavily on scroll
      gsap.to(houseRef.current, {
        yPercent: -40,
        scale: 1.3,
        ease: 'none',
        scrollTrigger: baseTrigger,
      })

      // Content — drifts down, shrinks, fades out before midpoint
      gsap.to(contentRef.current, {
        yPercent: 8,
        scale: 0.94,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          ...baseTrigger,
          end: '30% top',
          scrub: 0.4,
        },
      })

      // Cloud left — drifts further left
      gsap.to(cloudLeftRef.current, {
        xPercent: -18,
        ease: 'none',
        scrollTrigger: baseTrigger,
      })

      // Cloud right — drifts further right
      gsap.to(cloudRightRef.current, {
        xPercent: 18,
        ease: 'none',
        scrollTrigger: baseTrigger,
      })

      // Smoke — rises from below
      gsap.fromTo(
        smokeRef.current,
        { yPercent: 50 },
        {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: baseTrigger,
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="hero-section">
      {/* Scroll-height wrapper — 200vh gives the scroll room for parallax */}
      <div className="relative" style={{ height: '300vh' }}>
        {/* Sticky viewport — locks the scene while scroll drives animations */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* ── Sky Background ── */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Hero/bg.webp"
              alt="Sky background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* ── House / Building ── */}
          <div className="absolute left-0 right-0 z-[15] flex justify-center pointer-events-none" style={{ top: '59%' }}>
            <div
              ref={houseRef}
              className="will-change-transform"
              style={{ width: 'min(100%, 1400px)' }}
            >
              <Image
                src="/Hero/house.webp"
                alt="Premium real estate building"
                width={3840}
                height={3416}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 75vw"
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* ── Cloud Left ── */}
          <div
            ref={cloudLeftRef}
            className="absolute z-[20] pointer-events-none will-change-transform"
            style={{ top: '25%', left: '-8%', width: '48%', maxWidth: '760px' }}
          >
            <Image
              src="/Hero/cloud.webp"
              alt=""
              width={2248}
              height={954}
              sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto"
            />
          </div>

          {/* ── Cloud Right (mirrored) ── */}
          <div
            ref={cloudRightRef}
            className="absolute z-[20] pointer-events-none will-change-transform"
            style={{ top: '25%', right: '-8%', width: '48%', maxWidth: '760px' }}
          >
            <div style={{ transform: 'scaleX(-1)' }}>
              <Image
                src="/Hero/cloud.webp"
                alt=""
                width={2248}
                height={954}
                sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* ── Smoke Effect ── */}
          <div
            ref={smokeRef}
            className="absolute left-0 right-0 z-[22] pointer-events-none will-change-transform"
            style={{ bottom: '-5%' }}
          >
            <Image
              src="/Hero/smoke.webp"
              alt=""
              width={3840}
              height={1240}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>

          {/* ── Navbar ── */}
          <div className="relative z-[50]">
            <Navbar />
          </div>

          {/* ── Hero Content ── */}
          <div
            ref={contentRef}
            className="relative z-[10] flex flex-col items-center text-center px-6 will-change-transform"
            style={{ marginTop: '30vh' }}
          >
            <h1
              className="text-black mb-5 max-w-7xl text-8xl font-playfair-display font-semibold">
              <div className="overflow-hidden py-2 -my-2">
                <span className="hero-title-line block">Find What Moves You</span>
              </div>
            </h1>

            <div
              className="text-black text-base md:text-lg mb-8 max-w-xl tracking-[-0.01em] font-inter">
              <div className="overflow-hidden py-1 -my-1">
                <span className="hero-desc-line block">
                  Expert agents. Real guidance. A clear path to find what&apos;s next.
                </span>
              </div>
            </div>

            <div className="hero-cta-reveal">
              <button
                onClick={() => setIsCardOpen(true)}
                className="group hero-cta-button inline-flex items-center gap-2.5 font-inter transition-transform hover:scale-[1.02] no-underline border-none bg-transparent cursor-pointer"
                id="hero-find-properties">
                <div className="relative overflow-hidden leading-tight font-inter">
                  <span 
                    className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full" 
                    data-text="Find Properties"
                  >
                    Find Properties
                  </span>
                </div>
                <span className="hero-cta-arrow transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4">
                    <path fill="currentColor" d="m20.78 12.531-6.75 6.75a.75.75 0 1 1-1.06-1.061l5.47-5.47H3.75a.75.75 0 1 1 0-1.5h14.69l-5.47-5.469a.75.75 0 1 1 1.06-1.061l6.75 6.75a.75.75 0 0 1 0 1.061"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Overlap transition to next section ── */}

      {/* Property Inquiry Card */}
      <PropertyCard isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />
    </section>
  )
}

export default Hero