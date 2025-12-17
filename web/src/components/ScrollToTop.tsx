'use client';

import { useEffect, useState } from 'react';
import { useLenis } from './SmoothScroll';

export default function ScrollToTop() {
    const lenis = useLenis();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!lenis) return;

        const handleScroll = () => {
            // Toggle visibility based on scroll position (e.g., 300px)
            if (lenis.animatedScroll > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Lenis emits 'scroll' event
        lenis.on('scroll', handleScroll);

        return () => {
            lenis.off('scroll', handleScroll);
        };
    }, [lenis]);

    const scrollToTop = () => {
        lenis?.scrollTo(0);
    };

    return (
        <button
            onClick={scrollToTop}
            className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
            aria-label="Retour en haut"
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
            </svg>
        </button>
    );
}
