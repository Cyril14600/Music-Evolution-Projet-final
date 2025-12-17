import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mentions Légales | MusicEvolution14',
    description: 'Informations légales et conditions d\'utilisation du site MusicEvolution14.',
};

export default function MentionsLegalesPage() {
    return (
        <>
            <header className="page-header">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Accueil</a>
                        <span>/</span>
                        <span>Mentions Légales</span>
                    </div>
                    <h1>Mentions <span className="text-gradient">Légales</span></h1>
                    <p>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique.</p>
                </div>
            </header>

            <section className="section">
                <div className="container container-sm">
                    <div className="card reveal" style={{ textAlign: 'left', padding: 'var(--space-2xl)' }}>

                        <h3 className="mb-md">1. Éditeur du site</h3>
                        <p className="mb-lg">
                            Le site internet <strong>MusicEvolution14</strong> est édité par :<br /><br />
                            <strong>Propriétaire :</strong> MusicEvolution14<br />
                            <strong>Siège social :</strong> Livry, Calvados (14)<br />
                            <strong>Téléphone :</strong> 06 59 94 92 29<br />
                            <strong>Email :</strong> <a href="mailto:musicevolution144@gmail.com" className="text-accent">musicevolution144@gmail.com</a><br />
                            <strong>Directeur de la publication :</strong> MusicEvolution14
                        </p>

                        <h3 className="mb-md">2. Hébergement</h3>
                        <p className="mb-lg">
                            Le site est hébergé par :<br /><br />
                            <strong>Nom :</strong> Vercel Inc.<br />
                            <strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA<br />
                            <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent">https://vercel.com</a>
                        </p>

                        <h3 className="mb-md">3. Propriété Intellectuelle</h3>
                        <p className="mb-lg">
                            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.<br /><br />
                            Toute reproduction, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé,
                            est interdite, sauf autorisation écrite préalable de MusicEvolution14.
                        </p>

                        <h3 className="mb-md">4. Données Personnelles</h3>
                        <p className="mb-lg">
                            Les informations recueillies via le formulaire de contact sont enregistrées dans un fichier informatisé par MusicEvolution14 pour la gestion de la clientèle.
                            Elles sont conservées pendant 3 ans et sont destinées uniquement à l'équipe de MusicEvolution14.<br /><br />
                            Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux données vous concernant et les faire rectifier en contactant :
                            <a href="mailto:contact@musicevolution14.fr" className="text-accent">contact@musicevolution14.fr</a>.
                        </p>

                        <h3 className="mb-md">5. Cookies</h3>
                        <p>
                            Le site peut être amené à vous demander l'acceptation des cookies pour des besoins de statistiques et d'affichage.
                            Un cookie est une information déposée sur votre disque dur par le serveur du site que vous visitez.
                        </p>

                    </div>
                </div>
            </section>
        </>
    );
}
