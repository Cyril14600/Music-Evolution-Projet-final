import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Qui sommes-nous | MusicEvolution14',
    description: 'Découvrez l\'histoire de MusicEvolution14, notre passion pour l\'animation musicale et la décoration événementielle en Normandie.',
};

export default function About() {
    return (
        <>
            <header className="page-header" style={{ paddingTop: '100px' }}>
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Accueil</Link>
                        <span>/</span>
                        <span>Qui sommes-nous</span>
                    </div>
                    <h1>Qui <span className="text-gradient">sommes-nous</span> ?</h1>
                    <p>Découvrez l{"'"}histoire et les valeurs de MusicEvolution14, votre partenaire événementiel en Normandie.</p>
                </div>
            </header>

            {/* About Intro */}
            <section className="section">
                <div className="container">
                    <div className="about-intro">
                        <div className="about-intro-image reveal-left" style={{ maxHeight: '450px' }}>
                            <Image
                                src="/images/niko.webp"
                                alt="L'équipe MusicEvolution14"
                                fill
                                style={{ objectPosition: 'top', objectFit: 'cover' }}
                                sizes="(max-width: 968px) 100vw, 50vw"
                            />
                        </div>
                        <div className="reveal-right">
                            <span className="subtitle" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Notre Histoire</span>
                            <h2>La passion de <span className="text-gradient">l{"'"}événementiel</span></h2>
                            <p style={{ margin: 'var(--space-md) 0' }}>
                                <strong>MusicEvolution14</strong> est née d{"'"}une passion commune pour la musique et l{"'"}art de créer
                                des ambiances uniques. Basés à Livry, au cœur du Calvados, nous avons fait de cette passion
                                notre métier depuis de nombreuses années.
                            </p>
                            <p style={{ marginBottom: 'var(--space-md)' }}>
                                Notre mission ? Transformer chaque événement en un moment magique et inoubliable.
                                Que ce soit un mariage féerique, un anniversaire mémorable ou une soirée d{"'"}entreprise
                                réussie, nous mettons tout notre savoir-faire à votre service.
                            </p>
                            <p>
                                Au fil des ans, nous avons développé une expertise qui allie parfaitement
                                <span className="text-accent"> animation musicale</span> et <span className="text-accent">décoration événementielle</span>,
                                pour créer des atmosphères cohérentes et personnalisées.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container">
                    <div className="section-header reveal">
                        <span className="subtitle">Ce qui nous définit</span>
                        <h2>Nos <span className="text-gradient">Valeurs</span></h2>
                        <p>Des principes qui guident chacune de nos interventions pour garantir votre satisfaction.</p>
                    </div>

                    <div className="grid grid-4">
                        <div className="card service-card reveal stagger-1">
                            <div className="card-icon">👂</div>
                            <h3 className="card-title">Écoute</h3>
                            <p className="card-text">Nous prenons le temps de comprendre vos envies, vos goûts et vos attentes pour créer un événement qui vous ressemble.</p>
                        </div>

                        <div className="card service-card reveal stagger-2">
                            <div className="card-icon">✨</div>
                            <h3 className="card-title">Personnalisation</h3>
                            <p className="card-text">Chaque événement est unique. Nous adaptons nos prestations à votre thème, votre budget et votre vision.</p>
                        </div>

                        <div className="card service-card reveal stagger-3">
                            <div className="card-icon">🤝</div>
                            <h3 className="card-title">Fiabilité</h3>
                            <p className="card-text">Ponctualité, matériel de qualité et professionnalisme. Vous pouvez compter sur nous le jour J.</p>
                        </div>

                        <div className="card service-card reveal stagger-4">
                            <div className="card-icon">🎨</div>
                            <h3 className="card-title">Créativité</h3>
                            <p className="card-text">Nous aimons innover et proposer des idées originales pour surprendre vos invités et marquer les esprits.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Approach Section */}
            <section className="section">
                <div className="container">
                    <div className="about-intro" style={{ direction: 'rtl' }}>
                        {/* Using standard style reversing trick from original CSS */}
                        <div className="about-intro-image reveal-right" style={{ direction: 'ltr', maxHeight: '450px' }}>
                            <Image
                                src="/images/358629641_763506175775583_260409908949283336_n.webp"
                                alt="Notre approche"
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 968px) 100vw, 50vw"
                            />
                        </div>
                        <div className="reveal-left" style={{ direction: 'ltr' }}>
                            <span className="subtitle" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Notre Approche</span>
                            <h2>Un accompagnement <span className="text-gradient">de A à Z</span></h2>
                            <p style={{ margin: 'var(--space-md) 0' }}>
                                Nous ne nous contentons pas de fournir une prestation : nous vous accompagnons
                                à chaque étape de votre projet événementiel.
                            </p>

                            <div className="about-values" style={{ marginTop: 'var(--space-lg)' }}>
                                <div className="value-item">
                                    <div className="value-icon">1️⃣</div>
                                    <div>
                                        <h4>Rencontre & Briefing</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Discussion approfondie pour comprendre vos attentes et établir un devis personnalisé.</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">2️⃣</div>
                                    <div>
                                        <h4>Préparation</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Élaboration de la playlist, choix des décorations, planification logistique.</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">3️⃣</div>
                                    <div>
                                        <h4>Installation</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Mise en place du matériel et de la décoration avant votre événement.</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">4️⃣</div>
                                    <div>
                                        <h4>Animation</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Le jour J, nous gérons tout pour que vous profitiez pleinement de votre fête.</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">5️⃣</div>
                                    <div>
                                        <h4>Désinstallation</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Nous récupérons tout le matériel après l{"'"}événement. Vous n{"'"}avez rien à faire.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container">
                    <div className="section-header reveal">
                        <span className="subtitle">Pourquoi nous ?</span>
                        <h2>Ce qui fait notre <span className="text-gradient">différence</span></h2>
                    </div>

                    <div className="grid grid-3">
                        <div className="card reveal stagger-1">
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                <span style={{ fontSize: '2rem' }}>🎵</span> Musique + Déco
                            </h3>
                            <p className="card-text">
                                La combinaison parfaite. En gérant à la fois l{"'"}ambiance musicale et la décoration,
                                nous créons une atmosphère cohérente et harmonieuse pour votre événement.
                            </p>
                        </div>

                        <div className="card reveal stagger-2">
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                <span style={{ fontSize: '2rem' }}>📍</span> Ancrage Local
                            </h3>
                            <p className="card-text">
                                Basés en Normandie, nous connaissons parfaitement les lieux de réception de la région
                                et nous intervenons rapidement dans tout le Calvados et départements voisins.
                            </p>
                        </div>

                        <div className="card reveal stagger-3">
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                <span style={{ fontSize: '2rem' }}>💯</span> Satisfaction Client
                            </h3>
                            <p className="card-text">
                                Notre plus grande fierté ? La joie de nos clients et leurs témoignages enthousiastes.
                                Votre satisfaction est notre priorité absolue.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content reveal">
                        <h2>Prêt à nous <span className="text-gradient">rencontrer</span> ?</h2>
                        <p>
                            Discutons de votre projet autour d{"'"}un café. Nous serons ravis de vous
                            présenter nos services et de répondre à toutes vos questions.
                        </p>
                        <div className="hero-buttons">
                            <Link href="/contact" className="btn btn-primary btn-lg">Nous contacter</Link>
                            <Link href="/temoignages" className="btn btn-secondary btn-lg">Voir les avis</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
