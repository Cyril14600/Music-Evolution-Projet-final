"use strict";
// import type { Core } from '@strapi/strapi';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register( /* { strapi }: { strapi: Core.Strapi } */) { },
    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    async bootstrap({ strapi }) {
        try {
            console.log('🚀 BOOTSTRAP STARTED (CONSOLE)');
            // Give Strapi a moment to initialize
            const publicRole = await strapi
                .plugin('users-permissions')
                .service('role')
                .findOne({ type: 'public' });
            /*
            if (publicRole) {
              console.log(`ℹ️ Found Public Role ID: ${publicRole.id}`);
              // Manual permission setup required for stability
              // Please enable 'find' for 'Partner' in Admin > Settings > Roles > Public
            } else {
              console.log('❌ Public role not found!');
            }
            */
            // Seed Home Page Data
            const homePage = await strapi.entityService.findMany('api::home-page.home-page', {
                populate: ['animationSection', 'decorIntSection', 'decorExtSection', 'testimonials']
            });
            // Single Types can return array or object depending on context/version
            let existingPage = Array.isArray(homePage) ? homePage[0] : homePage;
            if (!existingPage) {
                strapi.log.info('Home Page not found, creating it...');
                existingPage = await strapi.entityService.create('api::home-page.home-page', {
                    data: {
                        publishedAt: new Date(),
                        heroTitle: "# Créons ensemble\n**vos moments inoubliables**",
                        heroSubtitle: "Animation musicale et décoration événementielle sur mesure. Transformez vos rêves en réalité avec MusicEvolution14.",
                        sectionEventsTitle: "Pour quels événements ?",
                        sectionEventsSubtitle: "Quel que soit votre événement, nous nous adaptons à vos besoins et à vos envies pour créer une expérience unique.",
                        events: [
                            { title: 'Mariages', description: 'Le plus beau jour de votre vie mérite une ambiance exceptionnelle. Musique romantique et déco de rêve.' },
                            { title: 'Anniversaires', description: 'Célébrez chaque année avec style ! Décor festif et playlist entraînante pour tous les âges.' },
                            { title: 'Soirées Privées', description: 'Réunion entre amis, soirée thème ou fête surprise ? Nous créons l\'atmosphère parfaite.' },
                            { title: 'Entreprises', description: 'Séminaires, team building, soirées corporate. Une prestation professionnelle à votre image.' }
                        ],
                        animationSection: {
                            title: "Animation Musicale",
                            description: "DJ professionnel, sonorisation haute qualité et jeux de lumière spectaculaires. Nous créons l'ambiance parfaite pour faire danser vos invités toute la nuit.",
                            features: [
                                { icon: "🎵", text: "DJ expérimenté" },
                                { icon: "🔊", text: "Son professionnel" },
                                { icon: "💡", text: "Éclairage dynamique" },
                                { icon: "🎶", text: "Playlist personnalisée" }
                            ]
                        },
                        decorIntSection: {
                            title: "Décoration Intérieure",
                            description: "Transformez n'importe quelle salle en un espace féerique. Arrangements floraux, nappes, housses de chaises et créations thématiques.",
                            features: [
                                { icon: "✨", text: "Décor thématique" },
                                { icon: "🌸", text: "Centre de tables" },
                                { icon: "🎀", text: "Arches décoratives" },
                                { icon: "🕯️", text: "Éclairage d'ambiance" }
                            ]
                        },
                        decorExtSection: {
                            title: "Décoration Extérieure",
                            description: "Sublimez vos jardins, terrasses et espaces extérieurs. Guirlandes lumineuses, spots, lanternes et mises en lumière artistiques.",
                            features: [
                                { icon: "🌿", text: "Illuminations" },
                                { icon: "🌳", text: "Décor végétal" },
                                { icon: "🌙", text: "Ambiance nocturne" },
                                { icon: "⛺", text: "Installation complète" }
                            ]
                        },
                        testimonials: [
                            {
                                author: "Marie & Thomas",
                                eventContext: "Mariage - Juin 2024",
                                rating: 5,
                                content: "Une équipe incroyable ! Notre mariage était parfait grâce à MusicEvolution14. La décoration était à couper le souffle et l'ambiance musicale a fait danser tout le monde jusqu'au bout de la nuit !"
                            },
                            {
                                author: "Sophie L.",
                                eventContext: "Anniversaire - Mars 2024",
                                rating: 5,
                                content: "Super prestation pour les 50 ans de mon père. Le DJ a su s'adapter à tous les goûts et la déco était exactement ce que nous voulions. Un grand merci !"
                            },
                            {
                                author: "Jean-Pierre M.",
                                eventContext: "Événement Corporate - Décembre 2023",
                                rating: 5,
                                content: "Professionnels et à l'écoute. Notre soirée d'entreprise a été un franc succès. Je recommande vivement pour tout type d'événement !"
                            }
                        ]
                    }
                });
                strapi.log.info('Created Home Page content');
            }
            else {
                strapi.log.info(`[BOOTSTRAP] Found existing page. ID: ${existingPage.id}, DocumentID: ${existingPage.documentId}`);
                // Helper to check if a field is "empty" (null, undefined, or empty array/string)
                const isEmpty = (field) => {
                    if (field === null || field === undefined)
                        return true;
                    if (Array.isArray(field) && field.length === 0)
                        return true;
                    if (typeof field === 'string' && field.trim() === '')
                        return true;
                    return false;
                };
                const updateData = {
                    publishedAt: new Date(), // ENSURE PUBLISHED
                    // FORCE OVERWRITE if it's an object (JSON blocks) instead of string (Markdown)
                    heroTitle: (typeof existingPage.heroTitle === 'object' || isEmpty(existingPage.heroTitle)) ? "# Créons ensemble\n**vos moments inoubliables**" : existingPage.heroTitle,
                    heroSubtitle: !isEmpty(existingPage.heroSubtitle) ? existingPage.heroSubtitle : "Animation musicale et décoration événementielle sur mesure. Transformez vos rêves en réalité avec MusicEvolution14.",
                    sectionEventsTitle: !isEmpty(existingPage.sectionEventsTitle) ? existingPage.sectionEventsTitle : "Pour quels événements ?",
                    sectionEventsSubtitle: !isEmpty(existingPage.sectionEventsSubtitle) ? existingPage.sectionEventsSubtitle : "Quel que soit votre événement, nous nous adaptons à vos besoins et à vos envies pour créer une expérience unique.",
                    events: !isEmpty(existingPage.events) ? existingPage.events : [
                        { title: 'Mariages', description: 'Le plus beau jour de votre vie mérite une ambiance exceptionnelle. Musique romantique et déco de rêve.' },
                        { title: 'Anniversaires', description: 'Célébrez chaque année avec style ! Décor festif et playlist entraînante pour tous les âges.' },
                        { title: 'Soirées Privées', description: 'Réunion entre amis, soirée thème ou fête surprise ? Nous créons l\'atmosphère parfaite.' },
                        { title: 'Entreprises', description: 'Séminaires, team building, soirées corporate. Une prestation professionnelle à votre image.' }
                    ],
                    animationSection: !isEmpty(existingPage.animationSection) ? existingPage.animationSection : {
                        title: "Animation Musicale",
                        description: "DJ professionnel, sonorisation haute qualité et jeux de lumière spectaculaires. Nous créons l'ambiance parfaite pour faire danser vos invités toute la nuit.",
                        features: [
                            { icon: "🎵", text: "DJ expérimenté" },
                            { icon: "🔊", text: "Son professionnel" },
                            { icon: "💡", text: "Éclairage dynamique" },
                            { icon: "🎶", text: "Playlist personnalisée" }
                        ]
                    },
                    decorIntSection: !isEmpty(existingPage.decorIntSection) ? existingPage.decorIntSection : {
                        title: "Décoration Intérieure",
                        description: "Transformez n'importe quelle salle en un espace féerique. Arrangements floraux, nappes, housses de chaises et créations thématiques.",
                        features: [
                            { icon: "✨", text: "Décor thématique" },
                            { icon: "🌸", text: "Centre de tables" },
                            { icon: "🎀", text: "Arches décoratives" },
                            { icon: "🕯️", text: "Éclairage d'ambiance" }
                        ]
                    },
                    decorExtSection: !isEmpty(existingPage.decorExtSection) ? existingPage.decorExtSection : {
                        title: "Décoration Extérieure",
                        description: "Sublimez vos jardins, terrasses et espaces extérieurs. Guirlandes lumineuses, spots, lanternes et mises en lumière artistiques.",
                        features: [
                            { icon: "🌿", text: "Illuminations" },
                            { icon: "🌳", text: "Décor végétal" },
                            { icon: "🌙", text: "Ambiance nocturne" },
                            { icon: "⛺", text: "Installation complète" }
                        ]
                    },
                    testimonials: !isEmpty(existingPage.testimonials) ? existingPage.testimonials : [
                        {
                            author: "Marie & Thomas",
                            eventContext: "Mariage - Juin 2024",
                            rating: 5,
                            content: "Une équipe incroyable ! Notre mariage était parfait grâce à MusicEvolution14. La décoration était à couper le souffle et l'ambiance musicale a fait danser tout le monde jusqu'au bout de la nuit !"
                        },
                        {
                            author: "Sophie L.",
                            eventContext: "Anniversaire - Mars 2024",
                            rating: 5,
                            content: "Super prestation pour les 50 ans de mon père. Le DJ a su s'adapter à tous les goûts et la déco était exactement ce que nous voulions. Un grand merci !"
                        },
                        {
                            author: "Jean-Pierre M.",
                            eventContext: "Événement Corporate - Décembre 2023",
                            rating: 5,
                            content: "Professionnels et à l'écoute. Notre soirée d'entreprise a été un franc succès. Je recommande vivement pour tout type d'événement !"
                        }
                    ]
                };
                strapi.log.info(`[BOOTSTRAP] Preparing to update with heroTitle: ${JSON.stringify(updateData.heroTitle)}`);
                // Strapi 5 uses documentId, fallback to id
                const updateId = existingPage.documentId || existingPage.id;
                if (!updateId) {
                    strapi.log.error('[BOOTSTRAP] Could not find ID or DocumentID for Home Page');
                    return;
                }
                strapi.log.info(`[BOOTSTRAP] Updating Home Page with ID: ${updateId}`);
                await strapi.entityService.update('api::home-page.home-page', updateId, {
                    data: updateData
                });
                strapi.log.info('Seeded/Updated FULL Home Page content');
            }
        }
        catch (error) {
            strapi.log.error('Bootstrap permission error:', error);
        }
    },
};
