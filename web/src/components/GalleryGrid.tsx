'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGalleryData, GalleryItem } from '@/hooks/useGalleryData';
import GalleryFilters from './GalleryFilters';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

export default function GalleryGrid() {
    const { items, isLoading } = useGalleryData();
    const [filter, setFilter] = useState('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const gridRef = useRef<HTMLDivElement>(null);

    // Filtered items
    const filteredItems = filter === 'all'
        ? items
        : items.filter(item => item.category?.toLowerCase() === filter.toLowerCase());

    // Lightbox handlers
    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % filteredItems.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    };

    // Re-run animations when items change (filtering)
    useEffect(() => {
        if (!gridRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(".gallery-item-anim",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", overwrite: true }
            );

            // Refresh ScrollTrigger to ensure following sections (like CTA) update their positions
            // Timeout to allow DOM to settle
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        }, gridRef);

        return () => ctx.revert();
    }, [filteredItems]);

    // Import gsap dynamically or use window if available? No, we have gsap imported in PageAnimations, let's import it here.
    // Wait, need to add import gsap.


    return (
        <>
            <GalleryFilters currentFilter={filter} onFilterChange={setFilter} />

            <div className="gallery-grid" ref={gridRef}>
                {filteredItems.map((item, index) => (
                    <div
                        key={`${item.id}-${index}`}
                        className="gallery-item gallery-item-anim" // Removed 'reveal' to avoid conflict with global PageAnimations
                        onClick={() => openLightbox(index)}
                    >
                        <Image
                            src={item.image}
                            alt={`Aperçu : ${item.title}`}
                            fill
                            unoptimized={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="gallery-item-overlay">
                            <div>
                                <span className="gallery-item-category">{item.categoryLabel}</span>
                                <h4 className="gallery-item-title">{item.title}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Shadcn Dialog Lightbox */}
            <Dialog open={!!lightboxOpen} onOpenChange={(open) => !open && closeLightbox()}>
                <DialogContent
                    className="w-[90vw] max-w-4xl bg-black/95 border-white/10 p-0 overflow-hidden sm:rounded-xl focus:outline-none"
                    style={{ zIndex: 100001 }}
                >
                    {/* Image Container - Fixed Height */}
                    <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center bg-black">
                        {filteredItems[currentImageIndex] && (
                            <Image
                                src={filteredItems[currentImageIndex].image}
                                alt={filteredItems[currentImageIndex].title}
                                fill
                                unoptimized={true}
                                className="object-contain"
                                sizes="(max-width: 1280px) 100vw, 1024px"
                                priority
                            />
                        )}

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors z-10 backdrop-blur-sm border border-white/10"
                            onClick={prevImage}
                            aria-label="Image précédente"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors z-10 backdrop-blur-sm border border-white/10"
                            onClick={nextImage}
                            aria-label="Image suivante"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>

                    <div className="p-4 bg-black text-white border-t border-white/10 text-center">
                        <DialogTitle className="text-lg font-display text-primary-accent mb-1">{filteredItems[currentImageIndex]?.title}</DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm">{filteredItems[currentImageIndex]?.categoryLabel}</DialogDescription>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
