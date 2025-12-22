import Link from 'next/link';
import Image from 'next/image';
import { fetchAPI, getStrapiURL } from '@/lib/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Qui sommes-nous | MusicEvolution14',
    description: 'Découvrez l\'histoire de MusicEvolution14, notre passion pour l\'animation musicale et la décoration événementielle en Normandie.',
};

interface FeatureItem {
    id: number;
    icon: string;
    text: string;
}

interface FeatureSection {
    id: number;
    title: string;
    description: string;
    features: FeatureItem[];
    image?: {
        data: {
            attributes: {
                url: string;
            }
        }
    }
}

interface AboutPageData {
    introSection: FeatureSection;
    valuesSection: FeatureSection;
    approachSection: FeatureSection;
    whyUsSection: FeatureSection;
}

async function getAboutPageData(): Promise<AboutPageData | null> {
    const data = await fetchAPI('/about-page', {
        populate: {
            introSection: { populate: { features: true, image: true } },
            valuesSection: { populate: { features: true, image: true } },
            approachSection: { populate: { features: true, image: true } },
            whyUsSection: { populate: { features: true, image: true } }
        }
    }, { cache: 'no-store' });

    return data?.data?.attributes || null;
}

export default async function About() {
    const pageData = await getAboutPageData();

    // Fallback Data
    const introSection = pageData?.introSection || {
        title: "La passion de l'événementiel",
        description: "**MusicEvolution14** est née d'une passion commune pour la musique et l'art de créer des ambiances uniques. Basés à Livry, au cœur du Calvados, nous avons fait de cette passion notre métier depuis de nombreuses années.\n\nNotre mission ? Transformer chaque événement en un moment magique et inoubliable. Que ce soit un mariage féerique, un anniversaire mémorable ou une soirée d'entreprise réussie, nous mettons tout notre savoir-faire à votre service.\n\nAu fil des ans, nous avons développé une expertise qui allie parfaitement **animation musicale** et **décoration événementielle**, pour créer des atmosphères cohérentes et personnalisées.",
        image: null
    };

    const valuesSection = pageData?.valuesSection || {
        title: "Nos Valeurs",
        description: "Des principes qui guident chacune de nos interventions pour garantir votre satisfaction.",
        features: [
            { id: 1, icon: "👂", text: "Écoute\nNous prenons le temps de comprendre vos envies, vos goûts et vos attentes pour créer un événement qui vous ressemble." },
            { id: 2, icon: "✨", text: "Personnalisation\nChaque événement est unique. Nous adaptons nos prestations à votre thème, votre budget et votre vision." },
            { id: 3, icon: "🤝", text: "Fiabilité\nPonctualité, matériel de qualité et professionnalisme. Vous pouvez compter sur nous le jour J." },
            { id: 4, icon: "🎨", text: "Créativité\nNous aimons innover et proposer des idées originales pour surprendre vos invités et marquer les esprits." }
        ]
    };

    const approachSection = pageData?.approachSection || {
        title: "Un accompagnement de A à Z",
        description: "Nous ne nous contentons pas de fournir une prestation : nous vous accompagnons à chaque étape de votre projet événementiel.",
        image: null,
        features: [
            { id: 1, icon: "1️⃣", text: "Rencontre & Briefing\nDiscussion approfondie pour comprendre vos attentes et établir un devis personnalisé." },
            { id: 2, icon: "2️⃣", text: "Préparation\nÉlaboration de la playlist, choix des décorations, planification logistique." },
            { id: 3, icon: "3️⃣", text: "Installation\nMise en place du matériel et de la décoration avant votre événement." },
            { id: 4, icon: "4️⃣", text: "Animation\nLe jour J, nous gérons tout pour que vous profitiez pleinement de votre fête." },
            { id: 5, icon: "5️⃣", text: "Désinstallation\nNous récupérons tout le matériel après l'événement. Vous n'avez rien à faire." }
        ]
    };

    const whyUsSection = pageData?.whyUsSection || {
        title: "Ce qui fait notre différence",
        description: "",
        features: [
            { id: 1, icon: "🎵", text: "Musique + Déco\nLa combinaison parfaite. En gérant à la fois l'ambiance musicale et la décoration, nous créons une atmosphère cohérente et harmonieuse pour votre événement." },
            { id: 2, icon: "📍", text: "Ancrage Local\nBasés en Normandie, nous connaissons parfaitement les lieux de réception de la région et nous intervenons rapidement dans tout le Calvados et départements voisins." },
            { id: 3, icon: "💯", text: "Satisfaction Client\nNotre plus grande fierté ? La joie de nos clients et leurs témoignages enthousiastes. Votre satisfaction est notre priorité absolue." }
        ]
    };

    // Helper to get image URL
    const getImageUrl = (sectionImage: any, hardcodedPath: string) => {
        const strapiUrl = sectionImage?.data?.attributes?.url;
        return strapiUrl ? getStrapiURL(strapiUrl) : hardcodedPath;
    };

    // Helper to render rich text (basic markdown support for bold)
    const renderRichText = (text: string) => {
        return text.split('\n\n').map((paragraph, idx) => (
            <p key={idx} style={idx !== 0 ? { marginTop: 'var(--space-md)' } : undefined} dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<span class="text-accent">$1</span>')
            }} />
        ));
    };

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
                                src={getImageUrl(introSection.image, "/images/niko.webp")}
                                alt="L'équipe MusicEvolution14"
                                fill
                                style={{ objectPosition: 'top', objectFit: 'cover' }}
                                sizes="(max-width: 968px) 100vw, 50vw"
                                unoptimized
                            />
                        </div>
                        <div className="reveal-right">
                            <span className="subtitle" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Notre Histoire</span>
                            {/* Handling title split for gradient if possible, or just standard title */}
                            <h2>{introSection.title.includes(' ') ? (
                                <>
                                    {introSection.title.substring(0, introSection.title.lastIndexOf(' '))} <span className="text-gradient">{introSection.title.split(' ').pop()}</span>
                                </>
                            ) : (
                                <span className="text-gradient">{introSection.title}</span>
                            )}</h2>
                            <div style={{ marginTop: 'var(--space-md)' }}>
                                {renderRichText(introSection.description)}
                            </div>
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
                        <p>{valuesSection.description}</p>
                    </div>

                    <div className="grid grid-4">
                        {valuesSection.features.map((feature, idx) => {
                            const [title, desc] = feature.text.includes('\n') ? feature.text.split('\n') : [feature.text, ''];
                            return (
                                <div key={idx} className={`card service-card reveal stagger-${idx + 1}`}>
                                    <div className="card-icon">{feature.icon}</div>
                                    <h3 className="card-title">{title}</h3>
                                    <p className="card-text">{desc}</p>
                                </div>
                            );
                        })}
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
                                src={getImageUrl(approachSection.image, "/images/358629641_763506175775583_260409908949283336_n.webp")}
                                alt="Notre approche"
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 968px) 100vw, 50vw"
                                unoptimized
                            />
                        </div>
                        <div className="reveal-left" style={{ direction: 'ltr' }}>
                            <span className="subtitle" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Notre Approche</span>
                            <h2>{approachSection.title.includes(' ') ? (
                                <>
                                    {approachSection.title.substring(0, approachSection.title.lastIndexOf(' '))} <span className="text-gradient">{approachSection.title.split(' ').pop()}</span>
                                </>
                            ) : (
                                <span className="text-gradient">{approachSection.title}</span>
                            )}</h2>
                            <div style={{ margin: 'var(--space-md) 0' }}>
                                {renderRichText(approachSection.description)}
                            </div>

                            <div className="about-values" style={{ marginTop: 'var(--space-lg)' }}>
                                {approachSection.features.map((feature, idx) => {
                                    const [title, desc] = feature.text.includes('\n') ? feature.text.split('\n') : [feature.text, ''];
                                    return (
                                        <div className="value-item" key={idx}>
                                            <div className="value-icon">{feature.icon}</div>
                                            <div>
                                                <h4>{title}</h4>
                                                <p style={{ fontSize: '0.9rem' }}>{desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
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
                        {whyUsSection.features.map((feature, idx) => {
                            const [title, desc] = feature.text.includes('\n') ? feature.text.split('\n') : [feature.text, ''];
                            return (
                                <div key={idx} className={`card reveal stagger-${idx + 1}`}>
                                    <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        <span style={{ fontSize: '2rem' }}>{feature.icon}</span> {title}
                                    </h3>
                                    <p className="card-text">
                                        {desc}
                                    </p>
                                </div>
                            );
                        })}
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
