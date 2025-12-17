'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement>(null);
    const [displayChildren, setDisplayChildren] = useState(children);

    useEffect(() => {
        if (pathname) {
            // Animate the curtain IN
            const tl = gsap.timeline({
                onComplete: () => {
                    setDisplayChildren(children); // Change content while curtain is covering
                    window.scrollTo(0, 0);

                    // Animate the curtain OUT
                    gsap.to(overlayRef.current, {
                        yPercent: -100,
                        duration: 0.8,
                        ease: 'power4.inOut',
                        delay: 0.1,
                        onComplete: () => {
                            // Reset for next time (move to bottom hidden)
                            gsap.set(overlayRef.current, { yPercent: 100 });
                        }
                    });
                }
            });

            tl.fromTo(
                overlayRef.current,
                { yPercent: 100 },
                {
                    yPercent: 0,
                    duration: 0.5,
                    ease: 'power4.inOut',
                }
            );
        }
    }, [pathname, children]);

    // Initial load animation
    useEffect(() => {
        gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            delay: 0.2
        });
    }, []);

    return (
        <div className="relative">
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[9999] bg-[#0a0a0a] pointer-events-none"
                style={{ transform: 'translateY(0%)' }} // Start covering
            />
            {displayChildren}
        </div>
    );
}
