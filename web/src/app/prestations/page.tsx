import Link from 'next/link';
import Image from 'next/image';
import servicesData from '../../data/services.json';
import { fetchAPI, getStrapiURL } from '@/lib/api';
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

interface FeatureSection {
    title: string;
    description: string;
    features: { icon: string; text: string }[];
    image?: {
        data: {
            attributes: {
                url: string;
            }
        }
    }
}

interface PrestationsPageData {
    animationSection: FeatureSection;
    decorIntSection: FeatureSection;
    decorExtSection: FeatureSection;
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

async function getPrestationsPageData(): Promise<PrestationsPageData | null> {
    const data = await fetchAPI('/prestations-page', {
        populate: {
            animationSection: { populate: { features: true, image: true } },
            decorIntSection: { populate: { features: true, image: true } },
            decorExtSection: { populate: { features: true, image: true } }
        }
    }, { cache: 'no-store' });

    return data?.data?.attributes || null;
}

export default async function Prestations() {
    const apiServices = await getServices();
    const services: Service[] = apiServices.length > 0 ? apiServices : servicesData;
    const pageData = await getPrestationsPageData();

    // Fallback Data
    const animationSection = pageData?.animationSection || {
        title: "Animation Musicale",
        description: "Notre DJ professionnel transforme vos événements en véritables fêtes inoubliables. Avec un équipement de sonorisation haut de gamme et des jeux de lumière spectaculaires, nous créons l'ambiance parfaite pour faire vibrer vos invités.",
        features: [
            { icon: "🎧", text: "DJ Professionnel\nExpérimenté et à l'écoute de vos goûts musicaux" },
            { icon: "🔊", text: "Sonorisation Pro\nMatériel haute qualité adapté à votre espace" },
            { icon: "💡", text: "Jeux de Lumière\nEffets LED, lasers, stroboscopes" },
            { icon: "🎵", text: "Playlist Personnalisée\nTous styles : variété, rock, électro, années 80..." }
        ],
        image: null // Will fall back to hardcoded path
    };

    const decorIntSection = pageData?.decorIntSection || {
        title: "Décoration Intérieure",
        description: "Transformez n'importe quelle salle en un espace féerique qui reflète votre personnalité. De la décoration de table aux arches fleuries, nous créons une atmosphère enchanteresse qui émerveillera vos invités dès leur arrivée.",
        features: [
            { icon: "🌸", text: "Centres de Tables\nCompositions florales et décoratives élégantes" },
            { icon: "🎀", text: "Housses & Nappes\nHabillage complet du mobilier" },
            { icon: "🏛️", text: "Arches & Structures\nArches florales, mur de fleurs, backdrops" },
            { icon: "✨", text: "Décor Thématique\nPersonnalisation selon votre thème" }
        ],
        image: null
    };

    const decorExtSection = pageData?.decorExtSection || {
        title: "Décoration Extérieure",
        description: "Sublimez vos jardins, terrasses et espaces en plein air avec nos mises en lumière artistiques et nos décorations végétales. Créez une atmosphère magique qui perdurera bien après le coucher du soleil.",
        features: [
            { icon: "💫", text: "Guirlandes Lumineuses\nLED blanches chaudes, multicolores" },
            { icon: "🔦", text: "Spots & Éclairages\nMise en lumière des arbres et structures" },
            { icon: "🏮", text: "Lanternes & Bougies\nAmbiance romantique et chaleureuse" },
            { icon: "🌿", text: "Décor Végétal\nPlantes, fleurs et compositions naturelles" }
        ],
        image: null
    };

    // Helper to get image URL
    const getImageUrl = (sectionImage: any, hardcodedPath: string) => {
        const strapiUrl = sectionImage?.data?.attributes?.url;
        return strapiUrl ? getStrapiURL(strapiUrl) : hardcodedPath;
    };

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
                                src={getImageUrl(animationSection.image, "/images/358645861_763506185775582_5987152981800305572_n.webp")}
                                alt={animationSection.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 968px) 100vw, 50vw"
                                unoptimized
                            />
                        </div>
                        <div className="reveal-right">
                            <span className="subtitle" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Animation</span>
                            <h2><span className="text-gradient">{animationSection.title}</span></h2>
                            <p style={{ margin: 'var(--space-md) 0' }}>
                                {animationSection.description}
                            </p>

                            <div className="grid grid-2" style={{ gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                                {animationSection.features.map((feature: any, idx: number) => {
                                    const [title, desc] = feature.text.includes('\n') ? feature.text.split('\n') : [feature.text, ''];
                                    return (
                                        <div className="value-item" key={idx}>
                                            <div className="value-icon">{feature.icon}</div>
                                            <div>
                                                <h4>{title}</h4>
                                                {desc && <p style={{ fontSize: '0.9rem' }}>{desc}</p>}
                                            </div>
                                        </div>
                                    );
                                })}
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
                                src={getImageUrl(decorIntSection.image, "/images/503173606_2892903777577679_1151030800917129172_n.webp")}
                                alt={decorIntSection.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 968px) 100vw, 50vw"
                                unoptimized
                            />
                        </div>
                        <div className="reveal-left" style={{ direction: 'ltr' }}>
                            <span className="subtitle" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Décoration</span>
                            <h2><span className="text-gradient">{decorIntSection.title}</span></h2>
                            <p style={{ margin: 'var(--space-md) 0' }}>
                                {decorIntSection.description}
                            </p>

                            <div className="grid grid-2" style={{ gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                                {decorIntSection.features.map((feature: any, idx: number) => {
                                    const [title, desc] = feature.text.includes('\n') ? feature.text.split('\n') : [feature.text, ''];
                                    return (
                                        <div className="value-item" key={idx}>
                                            <div className="value-icon">{feature.icon}</div>
                                            <div>
                                                <h4>{title}</h4>
                                                {desc && <p style={{ fontSize: '0.9rem' }}>{desc}</p>}
                                            </div>
                                        </div>
                                    );
                                })}
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
                                src={getImageUrl(decorExtSection.image, "/images/486670200_1237951618331034_7657288755883605121_n.webp")}
                                alt={decorExtSection.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 968px) 100vw, 50vw"
                                unoptimized
                            />
                        </div>
                        <div className="reveal-right">
                            <span className="subtitle" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Décoration</span>
                            <h2><span className="text-gradient">{decorExtSection.title}</span></h2>
                            <p style={{ margin: 'var(--space-md) 0' }}>
                                {decorExtSection.description}
                            </p>

                            <div className="grid grid-2" style={{ gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                                {decorExtSection.features.map((feature: any, idx: number) => {
                                    const [title, desc] = feature.text.includes('\n') ? feature.text.split('\n') : [feature.text, ''];
                                    return (
                                        <div className="value-item" key={idx}>
                                            <div className="value-icon">{feature.icon}</div>
                                            <div>
                                                <h4>{title}</h4>
                                                {desc && <p style={{ fontSize: '0.9rem' }}>{desc}</p>}
                                            </div>
                                        </div>
                                    );
                                })}
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
