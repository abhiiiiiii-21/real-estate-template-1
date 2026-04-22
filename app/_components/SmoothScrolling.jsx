"use client";

import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export default function SmoothScrolling({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
