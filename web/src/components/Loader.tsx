'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial resource load or just wait for mount
        // In a real app we might wait for document.readyState or images
        const timer = setTimeout(() => {
            setLoading(false);
        }, 200); // reduced buffer for faster perception

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className={`loader ${!loading ? 'hidden' : ''}`} id="loader" style={{
            opacity: loading ? 1 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: loading ? 'all' : 'none'
        }}>
            <div className="loader-spinner"></div>
        </div>
    );
}
