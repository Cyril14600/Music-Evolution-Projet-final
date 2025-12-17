import Link from 'next/link';
import type { Metadata } from 'next';
import TestimonialForm from '@/components/TestimonialForm';
import StatsCounter from '@/components/StatsCounter';
import { fetchAPI } from '@/lib/api';

export const metadata: Metadata = {
    title: 'Témoignages | MusicEvolution14',
    description: 'Découvrez les avis de nos clients sur MusicEvolution14.',
};

// Fallback data
const fallbackTestimonials = [
    {
        name: "Marie & Thomas",
        eventContext: "Mariage - Juin 2024",
        content: "Une équipe incroyable ! Notre mariage était parfait grâce à MusicEvolution14. La décoration était à couper le souffle.",
        rating: 5
    },
    {
        name: "Sophie L.",
        eventContext: "Anniversaire - Mars 2024",
        content: "Super prestation pour les 50 ans de mon père. Le DJ a su s'adapter à tous les goûts. Un grand merci !",
        rating: 5
    },
    {
        name: "Jean-Pierre M.",
        eventContext: "Soirée Entreprise - Déc 2023",
        content: "Professionnels et à l'écoute. Une soirée corporate réussie, tous les collaborateurs ont adoré.",
        rating: 5
    }
];

async function getTestimonials() {
    try {
        const data = await fetchAPI('/testimonials', { sort: ['createdAt:desc'] });
        // Strapi v5 data structure handling
        if (data?.data) {
            return data.data.map((item: any) => ({
                id: item.id,
                ...item.attributes // or item if flattened
            }));
        }
    } catch (error) {
        console.error("Error fetching testimonials", error);
    }
    return [];
}

export default async function Temoignages() {
    const apiTestimonials = await getTestimonials();
    // Combine API data with fallback if API is empty (or just use fallback for demo if API fails/is empty)
    // For a real site, you might want ONLY API data. Here we hybrid for smooth transition.
    const displayTestimonials = apiTestimonials.length > 0 ? apiTestimonials : fallbackTestimonials;

    // Duplicate for marquee effect
    const marqueeTestimonials = [...displayTestimonials, ...displayTestimonials];

    return (
        <>
            <header className="page-header">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Accueil</Link>
                        <span>/</span>
                        <span>Témoignages</span>
                    </div>
                    <h1><span className="text-gradient">Témoignages</span></h1>
                    <p>Ils ont fait confiance à MusicEvolution14 pour leurs moments importants...</p>
                </div>
            </header>

            {/* Submit Testimonial Form */}
            <section className="section">
                <div className="container container-sm">
                    <TestimonialForm />
                </div>
            </section>

            {/* Testimonials Marquee */}
            <section className="section" style={{ background: 'var(--surface)', overflow: 'hidden' }}>
                <div className="container">
                    <div className="section-header reveal">
                        <span className="subtitle">Avis Clients</span>
                        <h2>Ce qu{"'"}ils <span className="text-gradient">disent de nous</span></h2>
                    </div>
                </div>

                <div className="testimonials-marquee">
                    <div className="testimonials-track">
                        {marqueeTestimonials.map((t: any, index: number) => (
                            <div key={`t-${index}`} className="testimonial-card-marquee">
                                <div className="testimonial-stars" style={{ fontSize: '1.2rem', marginBottom: 'var(--space-sm)', color: '#ffd700' }}>
                                    {"★".repeat(t.rating || 5)}
                                </div>
                                <p style={{ fontSize: '0.95rem', fontStyle: 'italic', marginBottom: 'var(--space-md)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    "{t.content}"
                                </p>
                                <div className="testimonial-author">
                                    <span style={{ display: 'block', fontWeight: '700', color: 'var(--text-primary)' }}>{t.author || t.name}</span>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-accent)' }}>{t.eventContext}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <StatsCounter />

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content reveal">
                        <h2>Rejoignez nos <span className="text-gradient">clients satisfaits</span></h2>
                        <p>
                            Faites confiance à MusicEvolution14 pour votre prochain événement
                            et vivez une expérience inoubliable.
                        </p>
                        <Link href="/contact" className="btn btn-primary btn-lg">Demander un devis</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
