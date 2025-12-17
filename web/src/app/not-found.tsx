import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--background)',
            color: 'var(--text-primary)',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                padding: '4rem',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                maxWidth: '600px',
                width: '100%'
            }}>
                <h1 style={{
                    fontSize: '8rem',
                    fontWeight: 700,
                    marginBottom: '0',
                    background: 'linear-gradient(135deg, var(--primary) 0%, transparent 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1
                }}>
                    404
                </h1>
                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '1rem',
                    color: 'var(--text-primary)'
                }}>
                    Page introuvable
                </h2>
                <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '2.5rem',
                    fontSize: '1.1rem'
                }}>
                    La page que vous recherchez semble avoir été déplacée ou n'existe plus.
                </p>
                <Link href="/" style={{
                    display: 'inline-block',
                    padding: '14px 40px',
                    background: 'var(--primary)',
                    color: 'black',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    transition: 'transform 0.2s ease'
                }}>
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}
