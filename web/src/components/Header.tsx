'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import navigationData from '../data/navigation.json';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Active link helper
    const isActive = (path: string) => pathname === path ? 'active' : '';

    return (
        <header className={`nav ${scrolled ? 'scrolled' : ''}`} suppressHydrationWarning>
            <div className="container nav-container">
                <Link href="/" className="nav-logo">
                    <Image
                        src="/logo.webp"
                        alt="MusicEvolution14 Logo"
                        width={200}
                        height={60}
                        priority
                        style={{ width: 'auto', height: '50px' }}
                    />
                    <span>MusicEvolution<span className="text-accent">14</span></span>
                </Link>

                <button
                    className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
                    aria-label="Menu"
                    onClick={toggleMenu}
                >
                    <span className="hamburger"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navigationData.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`nav-link ${isActive(link.path)}`}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/contact" className="btn btn-primary nav-cta" onClick={closeMenu}>Contact</Link>
                </nav>
            </div>
        </header>
    );
}
