# 🎵 MusicEvolution14 - Site Web Événementiel

> Animation musicale & décoration intérieure / extérieure en Basse-Normandie

![Hero Screenshot](images/hero-bg.jpg)

---

## 📋 Résumé du Projet

**MusicEvolution14** est un site web professionnel de niveau **Awwwards** conçu pour une entreprise d'animation musicale et de décoration événementielle basée à Livry, dans le Calvados (Basse-Normandie, France).

### Objectifs

- ✅ Image **professionnelle, premium et créative**
- ✅ Ambiance **festive, élégante, chaleureuse et moderne**
- ✅ Incitation à **demander un devis** ou contacter l'entreprise
- ✅ Design **Awwwards-worthy** avec animations fluides
- ✅ Expérience **mobile-first** irréprochable

---

## 🏗️ Structure du Site

```
m9/
├── index.html          # Page d'accueil
├── prestations.html    # Détail des services
├── locations.html      # Location de matériel
├── galerie.html        # Galerie photo filtrable
├── about.html          # Qui sommes-nous
├── temoignages.html    # Avis clients
├── contact.html        # Formulaire de contact
├── styles.css          # Design system complet
├── script.js           # Animations et interactions
├── logo.jpg            # Logo de l'entreprise
├── images/             # Photos et visuels
├── videos/             # Vidéos (hero background)
└── Partenaires/        # Logos partenaires
```

---

## 🎨 Design & Direction Artistique

### Concept

Le design s'inspire de l'**univers de la nuit et de l'événementiel chic** :

- Ambiance festive avec jeux de lumière
- Élégance du mariage (or, blanc, lumière chaude)
- Modernité et sophistication

### Palette de Couleurs

| Couleur | Hex | Usage |
|---------|-----|-------|
| **Primary Dark** | `#0a0f1a` | Fond principal |
| **Surface** | `#1a1f2e` | Cartes et sections |
| **Accent Or** | `#d4af37` | Éléments interactifs, titres |
| **Accent Rose** | `#ff6b9d` | Touches festives |
| **Text Primary** | `#ffffff` | Texte principal |
| **Text Muted** | `rgba(255,255,255,0.6)` | Texte secondaire |

### Typographie

| Police | Usage |
|--------|-------|
| **Playfair Display** | Titres (serif élégant) |
| **Inter** | Corps de texte (sans-serif moderne) |

### Effets Visuels

- **Glassmorphism** : Cartes semi-transparentes avec `backdrop-filter: blur(20px)`
- **Dégradés lumineux** : Halos dorés et reflets
- **Micro-animations** : Hover, transitions, apparitions au scroll
- **Parallax subtil** : Profondeur sur les sections

---

## 🛠️ Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| HTML5 | - | Structure sémantique |
| CSS3 | - | Styling (Vanilla, pas de framework) |
| JavaScript | ES6+ | Interactions et animations |
| Lenis | 1.0.42 | Smooth scroll premium |
| Google Fonts | - | Playfair Display + Inter |

### Pas de Dépendances Lourdes

Le site est volontairement **léger et performant** :

- Aucun framework CSS (pas de Tailwind, Bootstrap)
- Aucun framework JS (pas de React, Vue)
- CSS Variables pour un design system cohérent
- JavaScript vanilla pour les interactions

---

## 📱 Responsive Design

Le site est conçu en **mobile-first** avec 3 breakpoints :

| Appareil | Largeur | Adaptations |
|----------|---------|-------------|
| Mobile | < 768px | Menu hamburger, grilles 1 colonne |
| Tablette | 768px - 1024px | Grilles 2 colonnes |
| Desktop | > 1024px | Layout complet, effets hover |

---

## ✨ Fonctionnalités Clés

### Navigation

- **Header fixe** avec effet glassmorphism au scroll
- **Menu hamburger** animé sur mobile
- **Liens actifs** avec indicateur visuel

### Hero Section

- **Vidéo background** en autoplay/loop
- **Logo animé** avec effet pulse-glow
- **Call-to-action** proéminents

### Galerie

- **Filtres dynamiques** par type d'événement
- **Lightbox** pour agrandissement
- **Effets hover** avec overlay

### Formulaires

- **Validation côté client**
- **Styles cohérents** (inputs, selects, textareas)
- **Feedback visuel** (erreurs, succès)

### Animations

- **Scroll reveal** : Éléments apparaissant au défilement
- **Staggered animations** : Décalage temporel sur les grilles
- **Smooth scroll** : Navigation fluide avec Lenis

---

## 📂 Description des Pages

### 1. Accueil (`index.html`)

- Hero immersif avec vidéo
- Présentation des 3 prestations
- Types d'événements ciblés
- Zone géographique avec carte
- Mini-galerie (6 photos)
- Slider de témoignages
- Bandeau partenaires
- CTA final

### 2. Prestations (`prestations.html`)

- Animation musicale (DJ, sono, lumières)
- Décoration intérieure (tables, arches, thèmes)
- Décoration extérieure (guirlandes, spots, végétal)
- Services complémentaires (photobooth, installation)

### 3. Locations (`locations.html`)

- Layout 2 colonnes : Décorations | Mobiliers
- Cards avec image, description, prix
- Conditions de location

### 4. Galerie (`galerie.html`)

- 18 photos catégorisées
- Filtres : Tous, Mariages, Anniversaires, Soirées, Entreprises
- Lightbox interactif

### 5. Qui sommes-nous (`about.html`)

- Histoire de l'entreprise
- 4 valeurs : Écoute, Personnalisation, Fiabilité, Créativité
- Approche en 5 étapes (briefing → désinstallation)
- Différenciateurs

### 6. Témoignages (`temoignages.html`)

- Formulaire de soumission d'avis
- Grille de 9 témoignages
- Statistiques (200+ événements, 4.9/5, 98% satisfaction)

### 7. Contact (`contact.html`)

- Formulaire complet (nom, email, téléphone, type, date, lieu, message)
- Coordonnées (adresse, téléphone, email, horaires)
- Réseaux sociaux
- Carte Google Maps
- FAQ (4 questions)

---

## 🎯 Bonnes Pratiques Appliquées

### SEO

- Balises `<meta>` description et keywords
- Structure sémantique (h1, h2, h3...)
- Attributs `alt` sur toutes les images
- Titres de pages uniques

### Accessibilité

- Contraste suffisant texte/fond
- Boutons avec `aria-label`
- Navigation au clavier possible
- Focus visible sur les éléments interactifs

### Performance

- Images optimisées
- CSS et JS minimaux
- Chargement différé (lazy) suggéré
- Pas de dépendances tierces lourdes

---

## 🚀 Déploiement

### Local

```bash
# Ouvrir simplement dans le navigateur
start index.html    # Windows
open index.html     # macOS
xdg-open index.html # Linux
```

### Production

Plateformes recommandées (toutes gratuites) :

- **Vercel** : `npx vercel`
- **Netlify** : Drag & drop du dossier
- **GitHub Pages** : Push puis activer dans Settings

---

## 📝 Personnalisation

### Modifier les couleurs

Éditer les CSS Variables dans `styles.css` (lignes 12-30) :

```css
:root {
  --primary-accent: #d4af37; /* Changer la couleur or */
  --secondary-accent: #ff6b9d; /* Changer le rose */
}
```

### Modifier les textes

Tous les textes sont directement dans les fichiers HTML.

### Ajouter des images

1. Placer les images dans le dossier `images/`
2. Référencer avec `src="images/nom-fichier.jpg"`

---

## 📄 Licence

Ce projet est créé pour **MusicEvolution14**. Tous droits réservés.

---

## 👤 Auteur

Développé avec ❤️ par **Antigravity AI** pour MusicEvolution14.

*Décembre 2024*
