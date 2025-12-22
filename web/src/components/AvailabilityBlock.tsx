import React from 'react';

const months = [
    { name: 'Janvier', status: 'available' },
    { name: 'Février', status: 'available' },
    { name: 'Mars', status: 'available' },
    { name: 'Avril', status: 'limited' },
    { name: 'Mai', status: 'limited' },
    { name: 'Juin', status: 'limited' },
    { name: 'Juillet', status: 'limited' },
    { name: 'Août', status: 'available' },
    { name: 'Septembre', status: 'available' },
    { name: 'Octobre', status: 'available' },
    { name: 'Novembre', status: 'available' },
    { name: 'Décembre', status: 'available' },
];

export default function AvailabilityBlock() {
    return (
        <div className="card mt-12 p-8 rounded-2xl bg-[#0B1221] border border-white/10 shadow-lg">
            <h3 className="text-3xl font-heading font-bold text-[#D4AF37] mb-2 font-display">Disponibilités 2025</h3>
            <p className="text-gray-300 mb-6 font-light">
                Nous sommes très demandés ! Réservez tôt pour garantir votre date.
            </p>

            <div className="flex flex-wrap gap-3">
                {months.map((m, i) => (
                    <div
                        key={i}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors cursor-default
                            ${m.status === 'available'
                                ? 'bg-[#064e3b]/40 border-[#059669]/50 text-[#34d399]' // Dark Green (Tailwind-ish)
                                : 'bg-[#1f2937]/50 border-[#374151] text-gray-400' // Dark Grey
                            }
                        `}
                    >
                        {m.name} {m.status === 'available' ? '✓' : '- Limité'}
                    </div>
                ))}
            </div>
        </div>
    );
}
