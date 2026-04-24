'use client'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Share Your Requirements.',
    description: 'Tell us your budget, preferred location, and property type — in just 2 minutes.',
  },
  {
    number: '02',
    title: 'Get Expert Guidance.',
    description: 'Our RERA-certified advisors understand what you truly need — not just what\'s available in the market.',
  },
  {
    number: '03',
    title: 'Schedule a Free Visit.',
    description: 'We arrange site visits at your convenience — zero pressure, zero brokerage.',
  },
  {
    number: '04',
    title: 'Move Into Your Dream Home.',
    description: 'From paperwork to possession, we handle everything so you don\'t have to worry.',
  },
]

const Procedure = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const buttonRef = useRef(null)
  const stepsLabelRef = useRef(null)
  const stepRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading animation ──
      const headingLines = headingRef.current?.querySelectorAll('.proc-heading-line')
      if (headingLines?.length) {
        gsap.fromTo(
          headingLines,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // ── Button animation ──
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // ── "Steps:" label ──
      if (stepsLabelRef.current) {
        gsap.fromTo(
          stepsLabelRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsLabelRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // ── Steps — staggered reveal on scroll ──
      stepRefs.current.forEach((stepEl, i) => {
        if (!stepEl) return

        const line = stepEl.querySelector('.step-line')
        const number = stepEl.querySelector('.step-number')
        const content = stepEl.querySelector('.step-content')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stepEl,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })

        // Line draws in from left
        if (line) {
          tl.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
            0
          )
        }

        // Number fades in
        if (number) {
          tl.fromTo(
            number,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            0.2
          )
        }

        // Content slides up and fades in
        if (content) {
          tl.fromTo(
            content,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            0.3
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#fff',
        padding: '120px 0 140px',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '80px',
          alignItems: 'start',
        }}
      >
        {/* ── Left Column: Heading + CTA ── */}
        <div style={{ position: 'sticky', top: '120px' }}>
          <h2
            ref={headingRef}
            style={{
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#111',
              marginBottom: '40px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span className="proc-heading-line" style={{ display: 'block' }}>
              Real Estate,
            </span>
            <span
              className="proc-heading-line"
              style={{
                display: 'block',
                color: '#999',
                fontStyle: 'italic',
              }}
            >
              Simplified.
            </span>
          </h2>

          <div ref={buttonRef} style={{ opacity: 0 }}>
            <button
              type="button"
              className="group hero-cta-button inline-flex items-center gap-2.5"
              aria-haspopup="dialog"
              aria-expanded="false"
              data-state="closed"
            >
              <div className="relative overflow-hidden leading-tight">
                <span
                  className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full after:content-[attr(data-text)] after:absolute after:left-0 after:top-full"
                  data-text="Start Your Search"
                >
                  Start Your Search
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

        {/* ── Right Column: Steps ── */}
        <div>
          <p
            ref={stepsLabelRef}
            style={{
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: '#111',
              marginBottom: '48px',
              opacity: 0,
            }}>
            Steps:
          </p>

          <div>
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => (stepRefs.current[i] = el)}
                style={{
                  paddingBottom: i < steps.length - 1 ? '20px' : '0',
                  marginBottom: i < steps.length - 1 ? '20px' : '0',
                }}>
                {/* Separator line */}
                <div
                  className="step-line"
                  style={{
                    height: '1px',
                    background: 'rgba(0,0,0,0.06)',
                    marginBottom: '24px',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left center',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    gap: '32px',
                    alignItems: 'flex-start',
                  }}>
                  {/* Step number */}
                  <span
                    className="step-number"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(0,0,0,0.35)',
                      fontWeight: 400,
                      flexShrink: 0,
                      paddingTop: '6px',
                      opacity: 0,
                    }}>
                    {step.number}
                  </span>

                  {/* Step content */}
                  <div className="step-content" style={{ opacity: 0 }}>
                    <p
                      style={{
                        fontSize: 'clamp(16px, 1.5vw, 20px)',
                        fontWeight: 500,
                        lineHeight: 1.35,
                        color: '#111',
                        letterSpacing: '-0.01em',
                      }}>
                      {step.title}
                      <span
                        style={{
                          color: 'rgba(0,0,0,0.4)',
                          fontWeight: 400,
                        }}>
                        {' '}{step.description}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Procedure