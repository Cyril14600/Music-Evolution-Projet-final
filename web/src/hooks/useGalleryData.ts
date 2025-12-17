'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import galleryData from '@/data/gallery.json';

export interface GalleryItem {
    id: number;
    category: string;
    image: string;
    title: string;
    categoryLabel: string;
}

export function useGalleryData() {
    const [items, setItems] = useState<GalleryItem[]>(galleryData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchAPI('/gallery-items', { populate: '*' });
                if (data?.data) {
                    const apiItems: GalleryItem[] = data.data.map((item: any) => {
                        const props = item.attributes || item;

                        let imageUrl = '';
                        if (props.image) {
                            if (typeof props.image === 'string') {
                                imageUrl = props.image;
                            } else if (Array.isArray(props.image) && props.image.length > 0) {
                                imageUrl = props.image[0].url || props.image[0].attributes?.url;
                            } else {
                                imageUrl = props.image.url || props.image.attributes?.url || (props.image.data?.attributes?.url ?? '');
                            }
                        }

                        if (imageUrl && !imageUrl.startsWith('http')) {
                            imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${imageUrl}`;
                        }

                        if (!imageUrl) {
                            imageUrl = galleryData.find(g => g.title === props.title)?.image || '';
                        }

                        return {
                            id: item.id,
                            category: props.category,
                            title: props.title,
                            categoryLabel: props.categoryLabel,
                            image: imageUrl
                        };
                    });

                    if (apiItems.length > 0) {
                        setItems([...apiItems, ...galleryData]);
                    }
                }
            } catch (err) {
                console.error("Failed to load gallery items:", err);
                setError("Impossible de charger la galerie depuis le serveur.");
                toast.error("Chargement de la galerie depuis les données locales.");
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, [toast]);

    return { items, isLoading, error };
}
