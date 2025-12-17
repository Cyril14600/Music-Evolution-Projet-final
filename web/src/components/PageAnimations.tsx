'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PageAnimations() {
    const pathname = usePathname();

    useEffect(() => {
        // Kill old ScrollTriggers
        ScrollTrigger.getAll().forEach(t => t.kill());

        const timer = setTimeout(() => {
            // Helper for defaults
            const defaults = {
                duration: 1,
                ease: 'power3.out',
                toggleActions: 'play none none reverse'
            };

            // Standard Fade Up
            gsap.utils.toArray('.reveal').forEach((el: any) => {
                gsap.fromTo(el,
                    { y: 50, opacity: 0 },
                    { ...defaults, y: 0, opacity: 1, scrollTrigger: { trigger: el, start: 'top 85%' } }
                );
            });

            // Slide from Left
            gsap.utils.toArray('.reveal-left').forEach((el: any) => {
                gsap.fromTo(el,
                    { x: -50, opacity: 0 },
                    { ...defaults, x: 0, opacity: 1, scrollTrigger: { trigger: el, start: 'top 85%' } }
                );
            });

            // Slide from Right
            gsap.utils.toArray('.reveal-right').forEach((el: any) => {
                gsap.fromTo(el,
                    { x: 50, opacity: 0 },
                    { ...defaults, x: 0, opacity: 1, scrollTrigger: { trigger: el, start: 'top 85%' } }
                );
            });

            // Scale Up
            gsap.utils.toArray('.reveal-scale').forEach((el: any) => {
                gsap.fromTo(el,
                    { scale: 0.9, opacity: 0 },
                    { ...defaults, scale: 1, opacity: 1, scrollTrigger: { trigger: el, start: 'top 85%' } }
                );
            });

            // Handing Event/Gallery Cards Stagger (if they exist in a grid)
            const grids = document.querySelectorAll('.grid, .gallery-grid');
            grids.forEach(grid => {
                const cards = grid.querySelectorAll('.card, .event-card, .gallery-item');
                if (cards.length > 0) {
                    ScrollTrigger.batch(cards, {
                        onEnter: batch => gsap.fromTo(batch,
                            { y: 60, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', overwrite: true }
                        ),
                        start: 'top 90%'
                    });
                }
            });

            // Refresh to calculate positions
            ScrollTrigger.refresh();

        }, 100);

        return () => {
            // Cleanup on unmount/route change
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [pathname]);

    return null;
}
