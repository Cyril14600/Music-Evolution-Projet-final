'use client';

import { useEffect, useState, useRef } from 'react';

const stats = [
    { value: 200, label: "Événements animés", suffix: "+" },
    { value: 4.9, label: "Note moyenne", suffix: "/5", decimals: 1 },
    { value: 98, label: "Clients satisfaits", suffix: "%" },
    { value: 10, label: "Années d'expérience", suffix: "+" }
];

export default function StatsCounter() {
    return (
        <section className="section stats-section" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background Effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--primary-dark) 100%)',
                zIndex: -1
            }}></div>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
                zIndex: -1,
                opacity: 0.6
            }}></div>

            <div className="container">
                <div className="grid grid-4 text-center">
                    {stats.map((stat, index) => (
                        <CounterItem key={index} {...stat} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CounterItem({ value, label, suffix = '', decimals = 0, delay = 0 }: any) {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    // Start animation
                    let start = 0;
                    const end = value;
                    const duration = 2000;
                    const startTime = performance.now();

                    const animate = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // EaseOutQuart
                        const ease = 1 - Math.pow(1 - progress, 4);

                        const current = start + (end - start) * ease;
                        setCount(current);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    setTimeout(() => requestAnimationFrame(animate), delay * 1000);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) observer.observe(elementRef.current);

        return () => observer.disconnect();
    }, [value, delay]);

    return (
        <div ref={elementRef} className="stat-card" style={{
            opacity: hasAnimated.current ? 1 : 0.5,
            transform: hasAnimated.current ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease'
        }}>
            <h2 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: 'var(--space-xs)', fontWeight: '800' }}>
                {count.toFixed(decimals)}{suffix}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '500' }}>{label}</p>
        </div>
    );
}
