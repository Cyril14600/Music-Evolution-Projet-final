'use client';

import { useState, useEffect } from 'react';

interface PartnerLogoProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    fallbackSrc?: string;
}

export default function PartnerLogo({
    src,
    alt,
    width = 180,
    height = 90,
    className,
    fallbackSrc = '/images/logo-placeholder.png' // You might want to ensure this exists or use a generic one
}: PartnerLogoProps) {
    const [imgSrc, setImgSrc] = useState<string>(src);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImgSrc(src);
        setHasError(false);
    }, [src]);

    if (hasError) {
        // Option A: Return nothing to hide broken logo
        // return null; 

        // Option B: Return a transparent placeholder to keep layout but show nothing
        return (
            <div
                className={className}
                style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}
            >
                {/* Simple text fallback or icon if needed, or just empty space */}
                <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>{alt}</span>
            </div>
        );
    }

    return (
        <div className={className} style={{ position: 'relative', width, height }}>
            {/* Fallback to standard img to bypass potential next/image optimization issues with local backend */}
            <img
                src={imgSrc}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: hasError ? 'none' : 'block'
                }}
                onError={(e) => {
                    console.warn(`Failed to load partner logo: ${src}`, e);
                    setHasError(true);
                }}
            />
            {hasError && (
                <div
                    style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}
                >
                    <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>{alt}</span>
                </div>
            )}
        </div>
    );
}
