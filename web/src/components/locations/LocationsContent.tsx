'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocationData, LocationItem } from '@/hooks/useLocationData';

export default function LocationsContent() {
    const { items, isLoading } = useLocationData();

    // Show loading state or at least the structure while loading?
    // Given the previous design, we want to render the structure.
    // If loading, items serves fallbackData initially so it shouldn't be empty.

    const decorations = items.filter(item => item.category === 'decorations');
    const mobiliers = items.filter(item => item.category === 'mobiliers');

    return (
        <>
            <header className="page-header">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Accueil</Link>
                        <span>/</span>
                        <span>Locations</span>
                    </div>
                    <h1>Nos <span className="text-gradient">Locations</span></h1>
                    <p>Louez notre matériel de décoration et mobilier événementiel pour sublimer vos réceptions.</p>
                </div>
            </header>

            {/* Location Grid */}
            <section className="section">
                <div className="container">
                    <div className="two-col-layout">
                        {/* Colonne Décorations */}
                        <div className="col">
                            <div className="col-header reveal">
                                <h3>✨ Décorations</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Accessoires et éléments décoratifs</p>
                            </div>

                            <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 'var(--space-lg)' }}>
                                {decorations.map((item, index) => (
                                    <LocationCard key={item.id} item={item} index={index} />
                                ))}
                            </div>
                        </div>

                        {/* Colonne Mobiliers */}
                        <div className="col">
                            <div className="col-header reveal">
                                <h3>🪑 Mobiliers</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tables, chaises et accessoires</p>
                            </div>

                            <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 'var(--space-lg)' }}>
                                {mobiliers.map((item, index) => (
                                    <LocationCard key={item.id} item={item} index={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container">
                    <div className="section-header reveal">
                        <span className="subtitle">Bon à Savoir</span>
                        <h2>Conditions de <span className="text-gradient">Location</span></h2>
                    </div>

                    <div className="grid grid-3">
                        <div className="card service-card reveal stagger-1">
                            <div className="card-icon">🚚</div>
                            <h3 className="card-title">Livraison</h3>
                            <p className="card-text">Livraison et récupération possibles dans le Calvados et départements limitrophes. Tarif sur devis.</p>
                        </div>

                        <div className="card service-card reveal stagger-2">
                            <div className="card-icon">📋</div>
                            <h3 className="card-title">Caution</h3>
                            <p className="card-text">Une caution par chèque est demandée et restituée après vérification du matériel.</p>
                        </div>

                        <div className="card service-card reveal stagger-3">
                            <div className="card-icon">🔧</div>
                            <h3 className="card-title">Installation</h3>
                            <p className="card-text">Service d'installation et de mise en place disponible en supplément.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content reveal">
                        <h2>Besoin de plus <span className="text-gradient">d'informations</span> ?</h2>
                        <p>
                            Contactez-nous pour connaître les disponibilités et recevoir un devis personnalisé
                            selon vos besoins et la date de votre événement.
                        </p>
                        <div className="hero-buttons">
                            <Link href="/contact" className="btn btn-primary btn-lg">Demander un devis</Link>
                            <Link href="/prestations" className="btn btn-secondary btn-lg">Voir nos prestations</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function LocationCard({ item, index }: { item: LocationItem; index: number }) {
    return (
        <div className={`card location-card reveal stagger-${(index % 5) + 1}`}>
            <div className="location-card-image">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                {item.badge && <span className="location-card-badge">{item.badge}</span>}
            </div>
            <div className="location-card-content">
                <h4 className="card-title">{item.name}</h4>
                <p className="card-text">{item.description}</p>
                <p className="location-card-price">{item.price}</p>
            </div>
        </div>
    );
}
