import Link from 'next/link';
import Image from 'next/image';
import servicesData from '../../data/services.json';
import { fetchAPI } from '@/lib/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nos Prestations | MusicEvolution14',
    description: 'Découvrez nos prestations : animation musicale DJ, décoration intérieure et extérieure pour tous vos événements en Normandie.',
};

interface Service {
    icon: string;
    title: string;
    description: string;
}

async function getServices(): Promise<Service[]> {
    const data = await fetchAPI('/services', { populate: '*' });
    if (data?.data) {
        return data.data.map((item: any) => ({
            icon: item.attributes.icon,
            title: item.attributes.title,
            description: item.attributes.description
        }));
    }
    return [];
}

export default async function Prestations() {
    const apiServices = await getServices();
    const services: Service[] = apiServices.length > 0 ? apiServices : servicesData;

    return (
        <>
            <header className="page-header" id="prestations-header">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Accueil</Link>
                        <span>/</span>
                        <span>Nos Prestations</span>
                    </div>
                    <h1>Nos <span className="text-gradient">Prestations</span></h1>
                    <p>Découvrez l{"'"}ensemble de nos services pour faire de votre événement un moment unique et inoubliable.</p>
                </div>
            </header>

            {/* Animation Musicale */}
            <section className="section" id="animation">
                <div className="container">
                    <div className="about-intro">
                        <div className="about-intro-image reveal-left">
                            <Image
                                src="/images/358645861_763506185775582_5987152981800305572_n.webp"
                                alt="Animation musicale DJ"
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 968px) 100vw, 50vw"
                            />
                        </div>
                        <div className="reveal-right">
                            <span className="subtitle" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Animation</span>
                            <h2>Animation <span className="text-gradient">Musicale</span></h2>
                            <p style={{ margin: 'var(--space-md) 0' }}>
                                Notre DJ professionnel transforme vos événements en véritables fêtes inoubliables.
                                Avec un équipement de sonorisation haut de gamme et des jeux de lumière spectaculaires,
                                nous créons l{"'"}ambiance parfaite pour faire vibrer vos invités.
                            </p>

                            <div className="grid grid-2" style={{ gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                                <div className="value-item">
                                    <div className="value-icon">🎧</div>
                                    <div>
                                        <h4>DJ Professionnel</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Expérimenté et à l{"'"}écoute de vos goûts musicaux</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">🔊</div>
                                    <div>
                                        <h4>Sonorisation Pro</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Matériel haute qualité adapté à votre espace</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">💡</div>
                                    <div>
                                        <h4>Jeux de Lumière</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Effets LED, lasers, stroboscopes</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">🎵</div>
                                    <div>
                                        <h4>Playlist Personnalisée</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Tous styles : variété, rock, électro, années 80...</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/contact" className="btn btn-primary" style={{ marginTop: 'var(--space-xl)' }}>Demander un devis</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Décoration Intérieure */}
            <section className="section" style={{ background: 'var(--surface)' }} id="decoration-interieure">
                <div className="container">
                    <div className="about-intro" style={{ direction: 'rtl' }}>
                        {/* Text Reversing for layout */}
                        <div className="about-intro-image reveal-right" style={{ direction: 'ltr' }}>
                            <Image
                                src="/images/503173606_2892903777577679_1151030800917129172_n.webp"
                                alt="Décoration intérieure"
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 968px) 100vw, 50vw"
                            />
                        </div>
                        <div className="reveal-left" style={{ direction: 'ltr' }}>
                            <span className="subtitle" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Décoration</span>
                            <h2>Décoration <span className="text-gradient">Intérieure</span></h2>
                            <p style={{ margin: 'var(--space-md) 0' }}>
                                Transformez n{"'"}importe quelle salle en un espace féerique qui reflète votre personnalité.
                                De la décoration de table aux arches fleuries, nous créons une atmosphère enchanteresse
                                qui émerveillera vos invités dès leur arrivée.
                            </p>

                            <div className="grid grid-2" style={{ gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                                <div className="value-item">
                                    <div className="value-icon">🌸</div>
                                    <div>
                                        <h4>Centres de Tables</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Compositions florales et décoratives élégantes</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">🎀</div>
                                    <div>
                                        <h4>Housses & Nappes</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Habillage complet du mobilier</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">🏛️</div>
                                    <div>
                                        <h4>Arches & Structures</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Arches florales, mur de fleurs, backdrops</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">✨</div>
                                    <div>
                                        <h4>Décor Thématique</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Personnalisation selon votre thème</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/contact" className="btn btn-primary" style={{ marginTop: 'var(--space-xl)' }}>Demander un devis</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Décoration Extérieure */}
            <section className="section" id="decoration-exterieure">
                <div className="container">
                    <div className="about-intro">
                        <div className="about-intro-image reveal-left">
                            <Image
                                src="/images/486670200_1237951618331034_7657288755883605121_n.webp"
                                alt="Décoration extérieure"
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 968px) 100vw, 50vw"
                            />
                        </div>
                        <div className="reveal-right">
                            <span className="subtitle" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Décoration</span>
                            <h2>Décoration <span className="text-gradient">Extérieure</span></h2>
                            <p style={{ margin: 'var(--space-md) 0' }}>
                                Sublimez vos jardins, terrasses et espaces en plein air avec nos mises en lumière
                                artistiques et nos décorations végétales. Créez une atmosphère magique
                                qui perdurera bien après le coucher du soleil.
                            </p>

                            <div className="grid grid-2" style={{ gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                                <div className="value-item">
                                    <div className="value-icon">💫</div>
                                    <div>
                                        <h4>Guirlandes Lumineuses</h4>
                                        <p style={{ fontSize: '0.9rem' }}>LED blanches chaudes, multicolores</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">🔦</div>
                                    <div>
                                        <h4>Spots & Éclairages</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Mise en lumière des arbres et structures</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">🏮</div>
                                    <div>
                                        <h4>Lanternes & Bougies</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Ambiance romantique et chaleureuse</p>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon">🌿</div>
                                    <div>
                                        <h4>Décor Végétal</h4>
                                        <p style={{ fontSize: '0.9rem' }}>Plantes, fleurs et compositions naturelles</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/contact" className="btn btn-primary" style={{ marginTop: 'var(--space-xl)' }}>Demander un devis</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Complémentaires */}
            <section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container">
                    <div className="section-header reveal">
                        <span className="subtitle">Et Plus Encore</span>
                        <h2>Services <span className="text-gradient">Complémentaires</span></h2>
                        <p>Pour une prestation complète, nous proposons également ces services additionnels.</p>
                    </div>

                    <div className="grid grid-4">
                        {services.map((service, index) => (
                            <div key={index} className={`card service-card reveal stagger-${index + 1}`}>
                                <div className="card-icon">{service.icon}</div>
                                <h3 className="card-title">{service.title}</h3>
                                <p className="card-text">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content reveal">
                        <h2>Une prestation <span className="text-gradient">sur mesure</span> pour vous</h2>
                        <p>
                            Chaque événement est unique. Contactez-nous pour discuter de vos envies
                            et recevoir un devis personnalisé adapté à votre budget.
                        </p>
                        <div className="hero-buttons">
                            <Link href="/contact" className="btn btn-primary btn-lg">Demander un devis gratuit</Link>
                            <Link href="/locations" className="btn btn-secondary btn-lg">Voir nos locations</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
