# Guide de Gestion de Contenu Strapi

Ce document sert de référence pour ajouter et modifier du contenu sur votre site MusicEvolution14 via le panneau d'administration Strapi (<http://localhost:1337/admin>).

---

## 1. Prestations (Services)

Pour ajouter une nouvelle prestation qui apparaîtra sur la page "Prestations" et sur l'accueil.

### Champs à remplir

| Champ | Description | Important |
| :--- | :--- | :--- |
| **Title** | Le nom du service (ex: `Photobooth`). | Requis |
| **Slug** | L'URL du service (ex: `photobooth`). | **Cliquez sur "Regenerate"** |
| **Icon** | L'icône visuelle du service. | **Utilisez un Émoji** (ex: 📸, 🎤, 🎸) |
| **Description** | Texte court décrivant le service. | Max 160 caractères recommandé |

### Exemple de remplissage

* **Title** : `Sonorisation`
* **Slug** : `sonorisation`
* **Icon** : `🔊`
* **Description** : `Système de son haute fidélité pour vos discours et soirées dansantes.`

---

## 2. Partenaires

Pour ajouter un logo dans le carrousel des partenaires.

### Champs à remplir

| Champ | Description | Requis ? |
| :--- | :--- | :--- |
| **Name** | Nom de l'entreprise partenaire. | Oui |
| **Logo** | L'image du logo. | Oui |
| **Order** | (Optionnel) Numéro pour trier l'affichage. | Non |

---

## 3. Témoignages (Testimonials)

Pour ajouter un avis client qui apparaîtra dans le carrousel.

### Champs à remplir

| Champ | Description | Requis |
| :--- | :--- | :--- |
| **Author** | Nom du client (ex: `Marie & Thomas`). | ✅ Oui |
| **EventContext** | Type et date de l'événement (ex: `Mariage - Juin 2024`). | Non (Recommandé) |
| **Content** | Le texte de l'avis. | ✅ Oui |
| **Rating** | Note sur 5 (Défaut: 5). | ✅ Oui |

---

## ⚠️ Notes Importantes

1. **Publier le contenu** : Après avoir cliqué sur **Save**, vous devez TOUJOURS cliquer sur le bouton **Publish** en haut à droite.
2. **Permissions Public** :
    * Allez dans *Settings > Users & Permissions > Roles > Public*.
    * Service : Cochez `find`, `findOne`.
    * Testimonial : Cochez `find`, `findOne`.
    * Gallery-item : Cochez `find`, `findOne`.
    * Partner : Cochez `find`, `findOne`.

---

## Accès Rapides

* **Administration Strapi** : [http://localhost:1337/admin](http://localhost:1337/admin)
* **Site Web (Local)** : [http://localhost:3000](http://localhost:3000)
