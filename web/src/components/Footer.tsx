import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer" style={{ marginTop: 'auto' }}>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <Link href="/" className="footer-logo">
                            <Image
                                src="/logo.webp"
                                alt="MusicEvolution14"
                                width={150}
                                height={45}
                                style={{ width: 'auto', height: '40px' }}
                            />
                            <span>MusicEvolution<span className="text-accent">14</span></span>
                        </Link>
                        <p className="footer-desc">
                            Animation musicale et décoration événementielle en Basse-Normandie.
                            Faites de votre événement un moment inoubliable.
                        </p>

                        <div className="social-links">
                            <a href="https://www.facebook.com/MusicEvolution14" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            <a href="https://www.tiktok.com/@musicevolution14" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="social-link">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/musicevolution14" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Liens Rapides</h4>
                        <ul className="footer-links">
                            <li><Link href="/prestations" className="footer-link">Prestations</Link></li>
                            <li><Link href="/locations" className="footer-link">Locations</Link></li>
                            <li><Link href="/galerie" className="footer-link">Galerie</Link></li>
                            <li><Link href="/about" className="footer-link">À propos</Link></li>
                            <li><Link href="/temoignages" className="footer-link">Témoignages</Link></li>
                            <li><Link href="/contact" className="footer-link">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Contact</h4>
                        <ul className="footer-links">
                            <li>
                                <div className="contact-item">
                                    <span className="contact-icon">📍</span>
                                    <span>Livry, Calvados (14)</span>
                                </div>
                            </li>
                            <li>
                                <a href="tel:+33659949229" className="contact-item footer-link">
                                    <span className="contact-icon">📞</span>
                                    <span>06 59 94 92 29</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:musicevolution144@gmail.com" className="contact-item footer-link">
                                    <span className="contact-icon">✉️</span>
                                    <span>musicevolution144@gmail.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Horaires</h4>
                        <ul className="footer-links">
                            <li className="footer-link">Lundi - Samedi : 9h - 19h</li>
                            <li className="footer-link">Dimanche : Sur rendez-vous</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p suppressHydrationWarning>&copy; {new Date().getFullYear()} MusicEvolution14. Tous droits réservés. <span style={{ margin: '0 10px' }}>|</span> <Link href="/mentions-legales" className="footer-link">Mentions Légales</Link></p>
                </div>
            </div>
        </footer>
    );
}
