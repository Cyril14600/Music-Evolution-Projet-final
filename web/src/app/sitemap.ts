import { MetadataRoute } from 'next';
import { fetchAPI } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://musicevolution14.fr';

    // Static pages
    const staticPages = [
        '',
        '/prestations',
        '/galerie',
        '/locations',
        '/about',
        '/contact',
        '/temoignages',
        '/mentions-legales',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic pages (Prestations)
    let dynamicPages: any[] = [];
    try {
        const services = await fetchAPI('/services');
        if (services?.data) {
            dynamicPages = services.data.map((service: any) => ({
                url: `${baseUrl}/prestations/${service.attributes?.slug || service.slug}`,
                lastModified: new Date(service.attributes?.updatedAt || service.updatedAt),
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            }));
        }
    } catch (error) {
        console.error("Sitemap generation error:", error);
    }

    return [...staticPages, ...dynamicPages];
}
