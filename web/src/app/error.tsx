'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

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
                <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #fff 0%, #a5a5a5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Une erreur est survenue
                </h2>
                <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '2.5rem',
                    fontSize: '1.1rem'
                }}>
                    Nous sommes désolés, quelque chose ne s'est pas passé comme prévu.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={() => reset()}
                        className="btn btn-primary"
                        style={{
                            padding: '12px 30px',
                            background: 'var(--primary)',
                            color: 'black',
                            border: 'none',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 600
                        }}
                    >
                        Réessayer
                    </button>
                    <Link href="/" className="btn" style={{
                        padding: '12px 30px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '50px',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '1rem'
                    }}>
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
