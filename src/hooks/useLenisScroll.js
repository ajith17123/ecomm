import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';

/**
 * Custom hook to initialize and integrate Lenis smooth scrolling with GSAP and AOS.
 * Ensures 60fps/120fps physics interpolation without disrupting native UI components.
 */
export const useLenisScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with smooth momentum settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out for natural momentum
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Synchronize Lenis scroll position with GSAP's ScrollTrigger & AOS
    lenis.on('scroll', () => {
      ScrollTrigger.update();
      AOS.refresh();
    });

    // Connect Lenis's raf update loop directly into GSAP's unified ticker
    const handleTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    // Initial refresh to ensure accurate layout calculation
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(handleTicker);
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) {
        window.__lenis = null;
      }
    };
  }, []);

  return lenisRef;
};

export default useLenisScroll;
