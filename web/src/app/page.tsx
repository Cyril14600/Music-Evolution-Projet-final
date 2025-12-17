

import Link from 'next/link';
import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';
import HomeScripts from '@/components/HomeScripts';
import PartnerLogo from '@/components/PartnerLogo';
import { fetchAPI, getStrapiURL } from '@/lib/api';

interface HomePageData {
  heroTitle: string | { type: string; children: { text: string; bold?: boolean }[] }[];
  heroSubtitle: string;
  sectionEventsTitle: string;
  sectionEventsSubtitle: string;
  events: {
    id: number;
    title: string;
    description: string;
    image?: {
      url?: string;
      data?: {
        attributes: {
          url: string;
        }
      } | null;
    } | null;
  }[];
  animationSection: FeatureSectionData;
  decorIntSection: FeatureSectionData;
  decorExtSection: FeatureSectionData;
  testimonials: TestimonialData[];
}

interface FeatureSectionData {
  title: string;
  description: string;
  features: { icon: string; text: string }[];
}

interface TestimonialData {
  id: number;
  author: string;
  eventContext: string;
  content: string;
  rating: number;
}

async function getHomePageData(): Promise<HomePageData | null> {
  // Errors will now bubble up to the error.tsx boundary
  const data = await fetchAPI('/home-page', {
    populate: {
      events: {
        populate: 'image'
      },
      animationSection: { populate: 'features' },
      decorIntSection: { populate: 'features' },
      decorExtSection: { populate: 'features' },
      testimonials: true
    },
  });

  if (!data) return null;

  // Strapi v5 flattened format (no more .attributes)
  return data.data || null;
}

interface PartnerData {
  id: number;
  name: string;
  logo: {
    url?: string;
    data?: { // Legacy/Nested case
      attributes?: {
        url: string;
      }
    }
  } | null;
}

async function getPartners(): Promise<PartnerData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
    // Use qs compatible syntax if needed, or simple query path since there are no complex nested params here
    const url = `${baseUrl}/api/partners?populate=*`;

    // Using fetch directly to ensure control over headers and cache
    const res = await fetch(url, {
      next: { revalidate: 60 }, // ISR Caching: Update at most every 60s
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      // Silent fail in prod, or simple log
      return [];
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  // Re-enable Strapi home-page fetch with v5 support
  const strapiData = await getHomePageData();
  // Fetch partners from Strapi (users can add logos via Strapi admin)
  const partnersData = await getPartners();

  // Default Fallback content if strapi is unreachable or empty (mimics previous hardcoded content)
  const heroTitle = strapiData?.heroTitle || [
    { type: 'paragraph', children: [{ text: 'Créons ensemble', bold: true }] },
    { type: 'paragraph', children: [{ text: 'vos moments inoubliables' }] }
  ];
  // Simple helper to render the rich text title structure
  const renderHeroTitle = (content: any) => {
    // Case 1: String (Strapi v5 Markdown / Rich Text)
    if (typeof content === 'string') {
      // Remove markdown heading chars if present (#, ##, etc)
      const cleanText = content.replace(/^#+\s*/, '');
      return <span className="text-gradient leading-tight block">{cleanText}</span>;
    }

    // Case 2: Array (Fallback JSON Blocks)
    if (Array.isArray(content)) {
      return content.map((block, i) => {
        // Ensure block.children is an array
        const children = Array.isArray(block?.children) ? block.children : [];
        return (
          <span key={i}>
            {children.map((child: any, j: number) => (
              <span key={j} className={child?.bold ? "text-gradient" : ""}>
                {typeof child?.text === 'string' ? child.text : ''}
              </span>
            ))}
            {i < content.length - 1 && <br />}
          </span>
        );
      });
    }

    // Case 3: Invalid/Null
    return null;
  };


  const heroSubtitle = strapiData?.heroSubtitle || "Animation musicale et décoration événementielle sur mesure. Transformez vos rêves en réalité avec MusicEvolution14.";
  const sectionEventsTitle = strapiData?.sectionEventsTitle || "Pour quels événements ?";
  const sectionEventsSubtitle = strapiData?.sectionEventsSubtitle || "Quel que soit votre événement, nous nous adaptons à vos besoins et à vos envies pour créer une expérience unique.";

  // Sanitize events data - ensure all IDs are primitives
  const rawEvents = strapiData?.events || [
    {
      id: 1,
      title: 'Mariages',
      description: 'Le plus beau jour de votre vie mérite une ambiance exceptionnelle. Musique romantique et déco de rêve.',
      image: null
    },
    {
      id: 2,
      title: 'Anniversaires',
      description: 'Célébrez chaque année avec style ! Décor festif et playlist entraînante pour tous les âges.',
      image: null
    },
    {
      id: 3,
      title: 'Soirées Privées',
      description: 'Réunion entre amis, soirée thème ou fête surprise ? Nous créons l\'atmosphère parfaite.',
      image: null
    },
    {
      id: 4,
      title: 'Entreprises',
      description: 'Séminaires, team building, soirées corporate. Une prestation professionnelle à votre image.',
      image: null
    }
  ];
  const events = rawEvents.map((e: any, idx: number) => ({
    ...e,
    id: typeof e.id === 'object' ? idx : (e.id ?? idx)
  }));

  // Fallback Data for new sections
  const animationSection = strapiData?.animationSection || {
    title: "Animation Musicale",
    description: "DJ professionnel, sonorisation haute qualité et jeux de lumière spectaculaires. Nous créons l'ambiance parfaite pour faire danser vos invités toute la nuit.",
    features: [
      { icon: "🎵", text: "DJ expérimenté" },
      { icon: "🔊", text: "Son professionnel" },
      { icon: "💡", text: "Éclairage dynamique" },
      { icon: "🎶", text: "Playlist personnalisée" }
    ]
  };

  const decorIntSection = strapiData?.decorIntSection || {
    title: "Décoration Intérieure",
    description: "Transformez n'importe quelle salle en un espace féerique. Arrangements floraux, nappes, housses de chaises et créations thématiques.",
    features: [
      { icon: "✨", text: "Décor thématique" },
      { icon: "🌸", text: "Centre de tables" },
      { icon: "🎀", text: "Arches décoratives" },
      { icon: "🕯️", text: "Éclairage d'ambiance" }
    ]
  };

  const decorExtSection = strapiData?.decorExtSection || {
    title: "Décoration Extérieure",
    description: "Sublimez vos jardins, terrasses et espaces extérieurs. Guirlandes lumineuses, spots, lanternes et mises en lumière artistiques.",
    features: [
      { icon: "🌿", text: "Illuminations" },
      { icon: "🌳", text: "Décor végétal" },
      { icon: "🌙", text: "Ambiance nocturne" },
      { icon: "⛺", text: "Installation complète" }
    ]
  };

  // Sanitize testimonials - ensure all IDs are primitives
  const rawTestimonials = strapiData?.testimonials || [
    { id: 1, author: "Marie & Thomas", eventContext: "Mariage - Juin 2024", rating: 5, content: "Une équipe incroyable ! Notre mariage était parfait grâce à MusicEvolution14. La décoration était à couper le souffle et l'ambiance musicale a fait danser tout le monde jusqu'au bout de la nuit !" },
    { id: 2, author: "Sophie L.", eventContext: "Anniversaire - Mars 2024", rating: 5, content: "Super prestation pour les 50 ans de mon père. Le DJ a su s'adapter à tous les goûts et la déco était exactement ce que nous voulions. Un grand merci !" },
    { id: 3, author: "Jean-Pierre M.", eventContext: "Événement Corporate - Décembre 2023", rating: 5, content: "Professionnels et à l'écoute. Notre soirée d'entreprise a été un franc succès. Je recommande vivement pour tout type d'événement !" }
  ];
  const testimonials = rawTestimonials.map((t: any, idx: number) => ({
    ...t,
    id: typeof t.id === 'object' ? idx : (t.id ?? idx)
  }));

  // Partners Fallback (Hardcoded) if dynamic fetch fails or is empty
  const fallbackPartners: PartnerData[] = [
    { id: 101, name: "Partenaire 1", logo: "/Partenaires/63082.webp" as any },
    { id: 102, name: "Partenaire 2", logo: "/Partenaires/Sans titre.webp" as any },
    { id: 103, name: "Domaine de Cussy", logo: "/images/domaine_de_cussy.webp" as any },
    { id: 104, name: "Partenaire 4", logo: "/Partenaires/386787465_931558185275509_7642918872400733857_n.webp" as any }
  ];

  // Combine fetched partners with fallback partners to ensure a full carousel
  // Sanitize Strapi data to ensure IDs are primitives (Strapi v5 may return objects)
  const sanitizedPartnersData = (partnersData || []).map((p: any, idx: number) => ({
    ...p,
    id: typeof p.id === 'object' ? idx : (p.id ?? idx)
  }));
  const partners = [...sanitizedPartnersData, ...fallbackPartners];

  // Debug: Log partners data on server
  console.log('DEBUG Partners:', JSON.stringify(partners.slice(0, 4), null, 2));

  return (
    <>
      <HomeScripts />

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-video-container">
          <video className="hero-video" autoPlay muted loop playsInline poster="/images/hero-poster.webp">
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content reveal">
          <h1 className="hero-title">
            {renderHeroTitle(heroTitle)}
          </h1>
          <p className="hero-subtitle">
            {heroSubtitle}
          </p>
          <div className="hero-buttons">
            <MagneticButton>
              <Link href="/contact" className="btn btn-primary btn-lg">Demander un devis</Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/prestations" className="btn btn-secondary btn-lg">Découvrir nos services</Link>
            </MagneticButton>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="hero-scroll-icon"></div>
          <span>Défiler</span>
        </div>
      </section>

      {/* Événements Section */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="subtitle">Pour Qui ?</span>
            <h2><span className={sectionEventsTitle.includes('quels') ? "" : "text-gradient"}>{sectionEventsTitle}</span></h2>
            {/* Note: Ideally we'd make the gradient part dynamic too, but for now we apply it generally or need a richer text field for the title */}
            <p>{sectionEventsSubtitle}</p>
          </div>

          <div className="grid grid-4">
            {events.map((event: any, index: number) => {
              // Resolved Logic for Image Source: Strapi > Fallback Local
              const strapiImage = event.image?.url || event.image?.data?.attributes?.url;
              const imageUrl = strapiImage
                ? getStrapiURL(strapiImage)
                : (index === 0 ? "/images/358536994_763506195775581_1722177586522969281_n.webp" :
                  index === 1 ? "/images/502860448_2892896334245090_475319705922716454_n.webp" :
                    index === 2 ? "/images/503173606_2892903777577679_1151030800917129172_n.webp" :
                      "/images/485751387_1234421908684005_357112647473288635_n.webp");

              return (
                <div key={`event-${index}`} className={`card event-card reveal stagger-${index + 1}`}>
                  <div className="event-card-image">
                    <Image
                      src={imageUrl}
                      alt={event.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="event-card-content">
                    <h4 className="card-title">{event.title}</h4>
                    <p className="card-text">{event.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Prestations Section */}
      <section className="section" id="prestations">
        <div className="section-video-bg">
          <video autoPlay muted loop playsInline poster="/images/hero-poster.webp">
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="overlay light"></div>
        </div>
        <div className="container section-content-relative">
          <div className="section-header reveal">
            <span className="subtitle">Nos Services</span>
            <h2>Des prestations <span className="text-gradient">sur mesure</span></h2>
            <p>Découvrez notre gamme complète de services pour faire de votre événement un moment unique et mémorable.</p>
          </div>

          <div className="grid grid-3">

            {/* Dynamic Animation Section */}
            <div className="card service-card reveal stagger-1">
              <div className="card-icon">{animationSection.features[0]?.icon || "🎵"}</div>
              <h3 className="card-title">{animationSection.title}</h3>
              <p className="card-text">{animationSection.description}</p>
              <ul style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {animationSection.features.map((f: any, i: number) => (
                  <li key={i}>✓ {f.text}</li>
                ))}
              </ul>
            </div>

            {/* Dynamic Decor Int Section */}
            <div className="card service-card reveal stagger-2">
              <div className="card-icon">{decorIntSection.features[0]?.icon || "✨"}</div>
              <h3 className="card-title">{decorIntSection.title}</h3>
              <p className="card-text">{decorIntSection.description}</p>
              <ul style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {decorIntSection.features.map((f: any, i: number) => (
                  <li key={i}>✓ {f.text}</li>
                ))}
              </ul>
            </div>

            {/* Dynamic Decor Ext Section */}
            <div className="card service-card reveal stagger-3">
              <div className="card-icon">{decorExtSection.features[0]?.icon || "🌿"}</div>
              <h3 className="card-title">{decorExtSection.title}</h3>
              <p className="card-text">{decorExtSection.description}</p>
              <ul style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {decorExtSection.features.map((f: any, i: number) => (
                  <li key={i}>✓ {f.text}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-xl reveal" style={{ marginTop: '5rem', textAlign: 'center' }}>
            <Link href="/prestations" className="btn btn-secondary">Voir toutes nos prestations</Link>
          </div>
        </div>
      </section>

      {/* Mini Galerie */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="subtitle">Portfolio</span>
            <h2>Aperçu de nos <span className="text-gradient">réalisations</span></h2>
            <p>Découvrez quelques-uns des événements que nous avons eu le plaisir d'animer et de décorer.</p>
          </div>

          <div className="mini-gallery reveal">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="mini-gallery-item">
                {/* Note: In a real migration we'd verify these filenames exist. I'm using a placeholder logic or exact names if possible. 
                        I'll use the filenames from index.html for accuracy. */}
                <Image
                  src={
                    i === 1 ? "/images/500695294_2891148291086561_3175454071053076445_n.webp" :
                      i === 2 ? "/images/501307956_2891148161086574_6947751089387842822_n.webp" :
                        i === 3 ? "/images/487604752_1242883094504553_1655194183820495562_n.webp" :
                          i === 4 ? "/images/485751387_1234421908684005_357112647473288635_n.webp" :
                            i === 5 ? "/images/474332099_2767380653463326_819400420326920429_n.webp" :
                              "/images/462310784_2677631959104863_9101318473195121617_n.webp"
                  }
                  alt={`Réalisation ${i}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-xl reveal" style={{ marginTop: '5rem', textAlign: 'center' }}>
            <Link href="/galerie" className="btn btn-primary">Voir toute la galerie</Link>
          </div>
        </div>
      </section>

      {/* Zone Géographique */}
      <section className="section zone-section">
        <div className="container">
          <div className="zone-content">
            <div className="zone-text reveal-left">
              <span className="subtitle" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Notre Zone</span>
              <h3>Basés à <span className="text-gradient">Livry</span>, en Basse-Normandie</h3>
              <p>
                Installés au cœur du Calvados, nous intervenons dans toute la Basse-Normandie et les régions limitrophes.
                Notre équipe se déplace pour transformer vos lieux en espaces magiques, où que vous soyez.
              </p>
              <div className="zone-features">
                <span className="zone-feature">📍 Calvados</span>
                <span className="zone-feature">📍 Manche</span>
                <span className="zone-feature">📍 Orne</span>
                <span className="zone-feature">📍 Eure</span>
                <span className="zone-feature">📍 Seine-Maritime</span>
              </div>
            </div>
            <div className="zone-map reveal-right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d166417.97665893797!2d-0.5!3d49.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480a4596e3d04f47%3A0x40c14484fbcd430!2sCalvados!5e0!3m2!1sfr!2sfr!4v1702000000000!5m2!1sfr!2sfr"
                width="100%" height="100%" style={{ border: 0, borderRadius: 'var(--radius-lg)' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="section">
        <div className="section-video-bg">
          <video autoPlay muted loop playsInline poster="/images/hero-poster.webp">
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="overlay light"></div>
        </div>
        <div className="container section-content-relative">
          <div className="section-header reveal">
            <span className="subtitle">Avis Clients</span>
            <h2>Ils nous font <span className="text-gradient">confiance</span></h2>
          </div>

          <div className="testimonials-slider reveal">
            {testimonials.map((t: any, index: number) => (
              <div key={index} className={`testimonial-card ${index === 0 ? '' : 'hidden'}`} id={`testimonial-${index + 1}`}>
                <div className="testimonial-stars">{"★".repeat(t.rating)}</div>
                <p className="testimonial-text">"{t.content}"</p>
                <div className="testimonial-author">
                  <span className="testimonial-name">{t.author}</span>
                  <span className="testimonial-event">{t.eventContext}</span>
                </div>
              </div>
            ))}

            <div className="testimonials-nav">
              {testimonials.map((_: any, index: number) => (
                <button key={index} className={`testimonial-dot ${index === 0 ? 'active' : ''}`} data-index={index + 1}></button>
              ))}
            </div>
          </div>

          <div className="text-center mt-xl reveal" style={{ marginTop: '5rem', textAlign: 'center' }}>
            <Link href="/temoignages" className="btn btn-secondary">Voir tous les témoignages</Link>
          </div>
        </div>
      </section>

      {/* Lightbox HTML container (Logic attached by HomeScripts) */}
      <div className="lightbox" id="lightbox">
        <button className="lightbox-close" aria-label="Fermer">✕</button>
        <button className="lightbox-prev" aria-label="Image précédente">❮</button>
        <button className="lightbox-next" aria-label="Image suivante">❯</button>
        <div className="lightbox-content">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Image agrandie" id="lightbox-img" />
        </div>
        <div className="lightbox-thumbnails"></div>
      </div>

      {/* Partners Banner */}
      <section className="partners-section">
        <div className="container">
          <div className="partners-scroller">
            <div className="partners-track">
              {/* Render partners from Strapi + fallback, doubled for seamless loop */}
              {[...partners, ...partners].map((partner, index) => {
                // Handle different logo formats: string (fallback), array, or object (Strapi)
                let rawUrl: string | undefined;
                if (typeof partner.logo === 'string') {
                  rawUrl = partner.logo;
                } else if (Array.isArray(partner.logo)) {
                  rawUrl = partner.logo[0]?.url;
                } else {
                  rawUrl = partner.logo?.url || partner.logo?.data?.attributes?.url;
                }

                if (!rawUrl) return null;

                // Prepend Strapi URL for uploaded images
                // Note: We used to rely on getStrapiURL but for client component we handle full URLs
                const isStrapiImage = !rawUrl.startsWith('http') && !rawUrl.startsWith('/');
                const finalSrc = rawUrl.startsWith('/')
                  ? rawUrl
                  : (rawUrl.startsWith('http') ? rawUrl : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${rawUrl}`);

                // Refined logic: if it starts with /, it's local (public folder). 
                // If it starts with http, it's absolute. 
                // If it's a relative path from Strapi (e.g. /uploads/...), prepend API URL used in server component? 
                // Wait, server component logic:
                // const isStrapiImage = rawUrl.startsWith('/uploads');
                // const finalSrc = isStrapiImage
                //   ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${rawUrl}`
                //   : rawUrl;

                // Let's stick closer to the original logic but ensure correct origin
                let bestSrc = rawUrl;
                if (rawUrl.startsWith('/uploads')) {
                  bestSrc = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${rawUrl}`;
                }

                return (
                  <PartnerLogo
                    key={`partner-${index}`}
                    src={bestSrc}
                    alt={partner.name || `Partenaire ${index + 1}`}
                    className="partner-logo" // Preserves current styling hook if any, but we also pass styles inline in the wrapper
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content reveal">
            <h2>Prêt à créer des <span className="text-gradient">moments magiques</span> ?</h2>
            <p>
              Contactez-nous dès maintenant pour discuter de votre projet.
              Nous vous accompagnons de A à Z pour faire de votre événement une réussite totale.
            </p>
            <div className="hero-buttons">
              <Link href="/contact" className="btn btn-primary btn-lg">Demander un devis gratuit</Link>
              <a href="tel:+33659949229" className="btn btn-secondary btn-lg">📞 Nous appeler</a>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
