'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { useToast } from '@/context/ToastContext';

// Define the interface based on the Strapi schema
export interface LocationItem {
    id: number;
    name: string;
    description: string;
    price: string;
    category: 'decorations' | 'mobiliers';
    badge?: string;
    image: string;
}

// Fallback data in case the API fails or is empty, matching the hardcoded data
const fallbackData: LocationItem[] = [
    // Décorations
    {
        id: 1,
        name: "Arche Florale",
        description: "Arche élégante ornée de fleurs artificielles de qualité. Idéale pour cérémonies et photos.",
        price: "À partir de 150€",
        category: 'decorations',
        badge: "Populaire",
        image: "/images/arche_florale.webp"
    },
    {
        id: 2,
        name: "Guirlandes LED",
        description: "Guirlandes lumineuses blanc chaud, parfaites pour créer une atmosphère féerique en intérieur ou extérieur.",
        price: "À partir de 25€ / 10m",
        category: 'decorations',
        image: "/images/guirlandes_led.webp"
    },
    {
        id: 3,
        name: "Lanternes & Bougies",
        description: "Ensemble de lanternes décoratives avec bougies LED pour une ambiance romantique et sécurisée.",
        price: "À partir de 5€ / unité",
        category: 'decorations',
        image: "/images/358645861_763506185775582_5987152981800305572_n.webp"
    },
    {
        id: 4,
        name: "Vases & Contenants",
        description: "Collection de vases en verre et cristal de différentes tailles pour vos compositions florales.",
        price: "À partir de 8€ / unité",
        category: 'decorations',
        image: "/images/358598935_763506179108916_804900529945203134_n.webp"
    },
    {
        id: 5,
        name: "Centres de Tables",
        description: "Compositions florales artificielles prêtes à poser. Plusieurs styles disponibles.",
        price: "À partir de 35€ / unité",
        category: 'decorations',
        image: "/images/358606488_763506189108915_307328638165093485_n.webp"
    },
    // Mobiliers
    {
        id: 6,
        name: "Tables Rondes",
        description: "Tables rondes pour 8-10 personnes, idéales pour banquets et réceptions. Nappes incluses.",
        price: "À partir de 45€ / table",
        category: 'mobiliers',
        badge: "Best-seller",
        image: "/images/tables_reception.webp"
    },
    {
        id: 7,
        name: "Chaises Chiavari",
        description: "Élégantes chaises dorées ou blanches, parfaites pour mariages et événements chics.",
        price: "À partir de 8€ / chaise",
        category: 'mobiliers',
        image: "/images/mobilier_evenement.webp"
    },
    {
        id: 8,
        name: "Housses de Chaises",
        description: "Housses blanches avec nœud satin assorti à votre thème. Plusieurs couleurs disponibles.",
        price: "À partir de 4€ / housse",
        category: 'mobiliers',
        image: "/images/358662182_763506192442248_1454394921732675917_n.webp"
    },
    {
        id: 9,
        name: "Photobooth",
        description: "Borne photo avec accessoires, cadre doré et impressions illimitées. Animation photo souvenir.",
        price: "À partir de 250€ / soirée",
        category: 'mobiliers',
        badge: "Pack complet",
        image: "/images/photobooth_setup.webp"
    },
    {
        id: 10,
        name: "Bar à Bonbons",
        description: "Stand complet avec bocaux, pinces, sachets et étiquettes. Bonbons non inclus.",
        price: "À partir de 80€ / stand",
        category: 'mobiliers',
        image: "/images/462362233_2677632165771509_8506079081019845417_n.webp"
    }
];

export function useLocationData() {
    const [items, setItems] = useState<LocationItem[]>(fallbackData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                // Fetch from Strapi: /location-items?populate=*
                const data = await fetchAPI('/location-items', { populate: '*' });

                if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
                    const apiItems: LocationItem[] = data.data.map((item: any) => {
                        const props = item.attributes || item; // Handle both Flattened and Original structures

                        let imageUrl = '';
                        // Handle image
                        if (props.image) {
                            if (typeof props.image === 'string') {
                                // Already a URL string
                                imageUrl = props.image;
                            } else if (Array.isArray(props.image) && props.image.length > 0) {
                                // Array of media objects
                                imageUrl = props.image[0].url || props.image[0].attributes?.url;
                            } else {
                                // Single media object
                                imageUrl = props.image.url || props.image.attributes?.url || (props.image.data?.attributes?.url ?? '');
                            }
                        }

                        // Prepend API URL if relative path
                        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
                            imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${imageUrl}`;
                        }

                        // Fallback image if missing from API but we have it in fallbackData by name match (optional enhancement)
                        if (!imageUrl) {
                            const fallbackItem = fallbackData.find(f => f.name === props.name);
                            if (fallbackItem) {
                                imageUrl = fallbackItem.image;
                            }
                        }

                        return {
                            id: item.id,
                            name: props.name,
                            description: props.description,
                            price: props.price,
                            category: props.category,
                            badge: props.badge,
                            image: imageUrl
                        };
                    });

                    if (apiItems.length > 0) {
                        setItems(apiItems); // Replace fallback data if API returns data
                        // Or merge? Usually replace if API is the source of truth.
                        // But for "partially migrated" state, maybe we want to keep fallback?
                        // "Use items from API if available, otherwise use fallbackData". 
                        // If API returns valid list, we use it.
                    }
                } else {
                    // console.log("No location items found in API, using fallback data.");
                }
            } catch (err) {
                console.error("Failed to load location items:", err);
                setError("Impossible de charger les locations depuis le serveur.");
                // Keep fallback data
                // toast.error("Chargement des locations depuis les données locales.");
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [toast]);

    return { items, isLoading, error };
}
