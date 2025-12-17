import Link from 'next/link';
import type { Metadata } from 'next';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
    title: 'Galerie | MusicEvolution14',
    description: 'Découvrez notre galerie photo : mariages, anniversaires, soirées privées et événements d\'entreprise animés par MusicEvolution14.',
};

export default function Galerie() {
    return (
        <>
            <header className="page-header">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Accueil</Link>
                        <span>/</span>
                        <span>Galerie</span>
                    </div>
                    <h1>Notre <span className="text-gradient">Galerie</span></h1>
                    <p>Découvrez en images nos réalisations et revivez les moments forts des événements que nous avons animés.</p>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    <GalleryGrid />
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content reveal">
                        <h2>Votre événement <span className="text-gradient">ici bientôt</span> ?</h2>
                        <p>
                            Rejoignez la liste de nos clients satisfaits et laissez-nous créer
                            des souvenirs visuels inoubliables pour votre prochain événement.
                        </p>
                        <Link href="/contact" className="btn btn-primary btn-lg">Demander un devis</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
