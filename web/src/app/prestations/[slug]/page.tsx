import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import servicesData from '@/data/services.json';

interface ServiceData {
    id: number;
    title: string;
    slug: string;
    description: string;
    icon: string;
}

// Fetch service by slug
async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
    // Try fetching from Strapi first
    const data = await fetchAPI('/services', {
        filters: { slug: { $eq: slug } },
        populate: '*',
    });

    if (data?.data?.[0]) {
        const item = data.data[0];
        const props = item.attributes || item;
        return {
            id: item.id,
            title: props.title,
            slug: props.slug,
            description: props.description,
            icon: props.icon,
        };
    }

    // Fallback to local JSON data
    const localService = servicesData.find(
        (s: any) => s.title.toLowerCase().replace(/\s+/g, '-') === slug
    );
    if (localService) {
        return {
            id: localService.id || 0,
            title: localService.title,
            slug: slug,
            description: localService.description,
            icon: localService.icon,
        };
    }

    return null;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        return {
            title: 'Service introuvable | MusicEvolution14',
        };
    }

    return {
        title: `${service.title} | MusicEvolution14`,
        description: service.description.substring(0, 160),
        openGraph: {
            title: `${service.title} | MusicEvolution14`,
            description: service.description.substring(0, 160),
            type: 'website',
        },
    };
}

export default async function ServicePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <header className="page-header" style={{ paddingTop: '100px' }}>
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Accueil</Link>
                        <span>/</span>
                        <Link href="/prestations">Prestations</Link>
                        <span>/</span>
                        <span>{service.title}</span>
                    </div>
                    <h1>
                        <span style={{ fontSize: '3rem', marginRight: '1rem' }}>{service.icon}</span>
                        <span className="text-gradient">{service.title}</span>
                    </h1>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    <div className="card" style={{ padding: 'var(--space-xl)', maxWidth: '800px', margin: '0 auto' }}>
                        <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                            {service.description}
                        </p>

                        <div style={{ marginTop: 'var(--space-xl)', textAlign: 'center' }}>
                            <Link href="/contact" className="btn btn-primary btn-lg">
                                Demander un devis
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <div className="cta-content reveal">
                        <h2>Intéressé par ce <span className="text-gradient">service</span> ?</h2>
                        <p>Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.</p>
                        <div className="hero-buttons">
                            <Link href="/contact" className="btn btn-primary btn-lg">Nous contacter</Link>
                            <Link href="/prestations" className="btn btn-secondary btn-lg">Autres services</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
