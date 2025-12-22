'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function TestimonialsCarousel({ testimonials }: { testimonials: any[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 6000, stopOnInteraction: false }) // Slower speed (6s)
    ]);
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="carousel-wrapper relative group">
            {/* Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y" style={{ gap: '2rem' }}>
                    {testimonials.map((t, index) => (
                        <div key={t.id || index} className="flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)] min-w-0">
                            <div className="testimonial-card h-full p-8 rounded-2xl bg-[#0B1221] border border-white/10 relative transition-transform hover:translate-y-[-5px]">


                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-lg shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={`${t.image && t.image.includes('generic-avatar.png') ? t.image : t.image}?v=${new Date().getTime()}`}
                                                alt={t.name || t.author}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-[#D4AF37] font-heading m-0">{t.name || t.author}</h4>
                                            <span className="text-sm text-gray-400 block mt-0.5">{t.eventContext}</span>
                                        </div>
                                    </div>

                                    {/* Stars aligned to right */}
                                    <div className="flex gap-1 text-[#D4AF37] pt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill={i < (t.rating || 5) ? "currentColor" : "none"} />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-300 italic text-base leading-relaxed">
                                    "{t.content}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#0B1221]/80 border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center shadow-lg transition-all hover:bg-[#D4AF37] hover:text-[#0B1221] hover:scale-110 focus:outline-none backdrop-blur-sm"
                onClick={scrollPrev}
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#0B1221]/80 border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center shadow-lg transition-all hover:bg-[#D4AF37] hover:text-[#0B1221] hover:scale-110 focus:outline-none backdrop-blur-sm"
                onClick={scrollNext}
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}
