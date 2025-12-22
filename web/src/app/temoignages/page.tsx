import Link from 'next/link';
import type { Metadata } from 'next';
import TestimonialForm from '@/components/TestimonialForm';
import StatsCounter from '@/components/StatsCounter';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import { fetchAPI, getStrapiMedia } from '@/lib/api';

export const metadata: Metadata = {
    title: 'Témoignages | MusicEvolution14',
    description: 'Découvrez les avis de nos clients sur MusicEvolution14.',
};

// Fallback data
// Fallback data
const fallbackTestimonials = [
    {
        name: "L'Entreprise Normande",
        title: "Directeur Général",
        eventContext: "Soirée Corporate • Septembre 2024",
        content: "Une équipe incroyable ! Notre soirée d'entreprise était parfaite. L'ambiance était au rendez-vous.",
        rating: 5,
        image: "/testimonials/generic-avatar.png"
    },
    {
        name: "Julie D.",
        title: "Mariée",
        eventContext: "Anniversaire 30 ans • Juin 2024",
        content: "Super prestation pour mes 30 ans. Le DJ a su s'adapter à tous les goûts. Un grand merci !",
        rating: 5,
        image: "/testimonials/generic-avatar.png"
    },
    {
        name: "Jean-Pierre M.",
        title: "Organisateur",
        eventContext: "Soirée Privée • Déc 2023",
        content: "Professionnels et à l'écoute. Une soirée réussie, tous les invités ont adoré.",
        rating: 5,
        image: "/testimonials/generic-avatar.png"
    },
    {
        name: "Sophie L.",
        title: "Mariée",
        eventContext: "Mariage • Août 2024",
        content: "C'était magique ! Merci pour tout.",
        rating: 5,
        image: "/testimonials/generic-avatar.png"
    }
];

async function getTestimonials() {
    try {
        const data = await fetchAPI('/testimonials', { sort: ['createdAt:desc'], populate: '*' });
        console.log("Fetched Testimonials Data:", data); // Debug log

        if (!data || !data.data) {
            return [];
        }

        // Handle both Strapi v5 (flat) and v4 (attributes) formats
        return data.data.map((item: any) => {
            // If item has 'attributes', it's v4-style or nested. If not, it's v5 flat.
            const attributes = item.attributes || item;
            // Process the image URL to be absolute
            // Handle various Strapi response formats (v4 nested vs v5 flat)
            const imgData = attributes.image;
            const imageUrl = imgData?.data?.attributes?.url || imgData?.url || imgData?.data?.url;

            const absoluteImageUrl = imageUrl ? getStrapiMedia(imageUrl) : null;

            return {
                id: item.id,
                author: attributes.author,
                eventContext: attributes.eventContext,
                content: attributes.content,
                image: absoluteImageUrl || '/testimonials/generic-avatar.png'
            };
        });

    } catch (error) {
        console.error("Error fetching testimonials", error);
        return [];
    }
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

                <div className="container">
                    <div className="px-8 md:px-12"> {/* Add padding for arrows */}
                        <TestimonialsCarousel testimonials={displayTestimonials} />
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
