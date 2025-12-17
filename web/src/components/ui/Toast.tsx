'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

export type ToastType = 'success' | 'error';

interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    onClose: (id: string) => void;
}

export default function Toast({ id, message, type, onClose }: ToastProps) {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate In
        gsap.fromTo(elRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
        );

        // Auto close after 5 seconds
        const timer = setTimeout(() => {
            handleClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        // Animate Out
        gsap.to(elRef.current, {
            x: 100,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => onClose(id)
        });
    };

    const isSuccess = type === 'success';

    return (
        <div
            ref={elRef}
            className="toast"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(20, 20, 20, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                minWidth: '300px',
                marginBottom: '10px',
                pointerEvents: 'auto',
                color: 'var(--text-primary)'
            }}
        >
            <div style={{ color: isSuccess ? 'var(--accent)' : '#ff4444' }}>
                {isSuccess ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500, flex: 1 }}>{message}</p>
            <button
                onClick={handleClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '4px'
                }}
            >
                <X size={16} />
            </button>
        </div>
    );
}
