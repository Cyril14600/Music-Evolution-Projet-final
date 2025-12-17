import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Locations | MusicEvolution14',
    description: 'Location de matériel de décoration et mobilier événementiel pour mariages, anniversaires et soirées en Normandie.',
};

export default function Locations() {
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
                                {/* Arche Florale */}
                                <div className="card location-card reveal stagger-1">
                                    <div className="location-card-image">
                                        <Image
                                            src="/images/arche_florale.webp"
                                            alt="Arche florale"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <span className="location-card-badge">Populaire</span>
                                    </div>
                                    <div className="location-card-content">
                                        <h4 className="card-title">Arche Florale</h4>
                                        <p className="card-text">Arche élégante ornée de fleurs artificielles de qualité. Idéale pour cérémonies et photos.</p>
                                        <p className="location-card-price">À partir de 150€</p>
                                    </div>
                                </div>

                                {/* Guirlandes LED */}
                                <div className="card location-card reveal stagger-2">
                                    <div className="location-card-image">
                                        <Image src="/images/guirlandes_led.webp" alt="Guirlandes LED" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                    <div className="location-card-content">
                                        <h4 className="card-title">Guirlandes LED</h4>
                                        <p className="card-text">Guirlandes lumineuses blanc chaud, parfaites pour créer une atmosphère féerique en intérieur ou extérieur.</p>
                                        <p className="location-card-price">À partir de 25€ / 10m</p>
                                    </div>
                                </div>

                                {/* Lanternes */}
                                <div className="card location-card reveal stagger-3">
                                    <div className="location-card-image">
                                        <Image src="/images/358645861_763506185775582_5987152981800305572_n.webp" alt="Lanternes décoratives" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                    <div className="location-card-content">
                                        <h4 className="card-title">Lanternes & Bougies</h4>
                                        <p className="card-text">Ensemble de lanternes décoratives avec bougies LED pour une ambiance romantique et sécurisée.</p>
                                        <p className="location-card-price">À partir de 5€ / unité</p>
                                    </div>
                                </div>

                                {/* Vases */}
                                <div className="card location-card reveal stagger-4">
                                    <div className="location-card-image">
                                        <Image src="/images/358598935_763506179108916_804900529945203134_n.webp" alt="Vases décoratifs" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                    <div className="location-card-content">
                                        <h4 className="card-title">Vases & Contenants</h4>
                                        <p className="card-text">Collection de vases en verre et cristal de différentes tailles pour vos compositions florales.</p>
                                        <p className="location-card-price">À partir de 8€ / unité</p>
                                    </div>
                                </div>

                                {/* Centre de table */}
                                <div className="card location-card reveal stagger-5">
                                    <div className="location-card-image">
                                        <Image src="/images/358606488_763506189108915_307328638165093485_n.webp" alt="Centre de table" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                    <div className="location-card-content">
                                        <h4 className="card-title">Centres de Tables</h4>
                                        <p className="card-text">Compositions florales artificielles prêtes à poser. Plusieurs styles disponibles.</p>
                                        <p className="location-card-price">À partir de 35€ / unité</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Colonne Mobiliers */}
                        <div className="col">
                            <div className="col-header reveal">
                                <h3>🪑 Mobiliers</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tables, chaises et accessoires</p>
                            </div>

                            <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 'var(--space-lg)' }}>
                                {/* Tables rondes */}
                                <div className="card location-card reveal stagger-1">
                                    <div className="location-card-image">
                                        <Image
                                            src="/images/tables_reception.webp"
                                            alt="Tables de réception"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <span className="location-card-badge">Best-seller</span>
                                    </div>
                                    <div className="location-card-content">
                                        <h4 className="card-title">Tables Rondes</h4>
                                        <p className="card-text">Tables rondes pour 8-10 personnes, idéales pour banquets et réceptions. Nappes incluses.</p>
                                        <p className="location-card-price">À partir de 45€ / table</p>
                                    </div>
                                </div>

                                {/* Chaises */}
                                <div className="card location-card reveal stagger-2">
                                    <div className="location-card-image">
                                        <Image src="/images/mobilier_evenement.webp" alt="Chaises événement" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                    <div className="location-card-content">
                                        <h4 className="card-title">Chaises Chiavari</h4>
                                        <p className="card-text">Élégantes chaises dorées ou blanches, parfaites pour mariages et événements chics.</p>
                                        <p className="location-card-price">À partir de 8€ / chaise</p>
                                    </div>
                                </div>

                                {/* Housses de chaises */}
                                <div className="card location-card reveal stagger-3">
                                    <div className="location-card-image">
                                        <Image src="/images/358662182_763506192442248_1454394921732675917_n.webp" alt="Housses de chaises" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                    <div className="location-card-content">
                                        <h4 className="card-title">Housses de Chaises</h4>
                                        <p className="card-text">Housses blanches avec nœud satin assorti à votre thème. Plusieurs couleurs disponibles.</p>
                                        <p className="location-card-price">À partir de 4€ / housse</p>
                                    </div>
                                </div>

                                {/* Photobooth */}
                                <div className="card location-card reveal stagger-4">
                                    <div className="location-card-image">
                                        <Image
                                            src="/images/photobooth_setup.webp"
                                            alt="Photobooth"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <span className="location-card-badge">Pack complet</span>
                                    </div>
                                    <div className="location-card-content">
                                        <h4 className="card-title">Photobooth</h4>
                                        <p className="card-text">Borne photo avec accessoires, cadre doré et impressions illimitées. Animation photo souvenir.</p>
                                        <p className="location-card-price">À partir de 250€ / soirée</p>
                                    </div>
                                </div>

                                {/* Bar à bonbons */}
                                <div className="card location-card reveal stagger-5">
                                    <div className="location-card-image">
                                        <Image src="/images/462362233_2677632165771509_8506079081019845417_n.webp" alt="Bar à bonbons" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                    <div className="location-card-content">
                                        <h4 className="card-title">Bar à Bonbons</h4>
                                        <p className="card-text">Stand complet avec bocaux, pinces, sachets et étiquettes. Bonbons non inclus.</p>
                                        <p className="location-card-price">À partir de 80€ / stand</p>
                                    </div>
                                </div>
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
                            <p className="card-text">Service d{"'"}installation et de mise en place disponible en supplément.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content reveal">
                        <h2>Besoin de plus <span className="text-gradient">d{"'"}informations</span> ?</h2>
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
