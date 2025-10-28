# Vote Canvas Studio

Une application web moderne et interactive pour créer et visualiser des données de campagne électorale avec de superbes graphiques et des toiles exportables.

## 🎯 Qu'est-ce que Vote Canvas Studio ?

Vote Canvas Studio est un outil complet conçu pour les campagnes politiques, les organisations de sondage et les passionnés de visualisation de données. Il permet aux utilisateurs de :

- **Créer des données de campagne** : Ajouter des candidats avec des nombres de voix, des couleurs et des images
- **Visualiser les résultats** : Générer des graphiques interactifs
- **Exporter les campagnes** : Télécharger les visualisations de campagne sous forme d'images
- **Gérer plusieurs campagnes** : Sauvegarder, charger et organiser différents scénarios électoraux
- **Conception réactive** : Fonctionne parfaitement sur les ordinateurs de bureau et les appareils mobiles

## ✨ Fonctionnalités

- 📊 **Graphiques interactifs** : Graphiques à barres et circulaires dynamiques utilisant Recharts
- 🎨 **Design personnalisable** : Candidats codés par couleur avec une image de marque personnalisée
- 💾 **Gestion de campagne** : Sauvegarder et charger plusieurs campagnes localement
- 📱 **Adapté aux mobiles** : Optimisé pour toutes les tailles d'écran
- 🖼️ **Fonctionnalité d'exportation** : Télécharger les graphiques sous forme d'images de haute qualité
- 🎯 **Mises à jour en temps réel** : Aperçu en direct des modifications au fur et à mesure de l'édition
- 🏷️ **Étiquetage flexible** : Étiquettes et valeurs de graphique personnalisables

## 🛠️ Pile technologique

- **Frontend** : React 18 avec TypeScript
- **Outil de build** : Vite
- **Styling** : Tailwind CSS avec les composants shadcn/ui
- **Graphiques** : Recharts pour la visualisation de données
- **Gestion d'état** : React Query pour la récupération de données
- **Formulaires** : React Hook Form avec validation Zod
- **Icônes** : Lucide React
- **Polices** : Michroma (titres) + Open Sans (corps de texte)
- **Exportation** : html2canvas pour la génération d'images

## 🚀 Démarrage rapide

### Prérequis

- Node.js (v16 ou supérieur)
- Gestionnaire de paquets npm, yarn ou pnpm

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone <your-repo-url>
   cd vote-canvas-studio
   ```

2. **Installer les dépendances**
   ```bash
   # Avec npm
   npm install
   
   # Avec yarn
   yarn install
   
   # Avec pnpm
   pnpm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   # Avec npm
   npm run dev
   
   # Avec yarn
   yarn dev
   
   # Avec pnpm
   pnpm dev
   ```

4. **Ouvrir votre navigateur**
   Naviguez vers `http://localhost:5173` pour voir l'application.

## 📋 Scripts disponibles

- `npm run dev` - Démarrer le serveur de développement avec rechargement à chaud
- `npm run build` - Construire pour la production
- `npm run build:dev` - Construire pour le développement
- `npm run preview` - Prévisualiser la version de production localement
- `npm run lint` - Exécuter ESLint pour la qualité du code

## 🎮 Comment utiliser

### Créer une campagne

1. **Définir les détails de la campagne**
   - Saisir un titre de campagne
   - Ajouter un lieu (facultatif)
   - Définir l'étiquette et la valeur du graphique (par exemple, "Votes", "Pourcentage")

2. **Ajouter des candidats**
   - Cliquer sur "Ajouter un candidat" dans la barre latérale
   - Saisir le nom du candidat et le nombre de voix
   - Choisir une couleur pour le candidat
   - Télécharger éventuellement une image

3. **Visualiser les résultats**
   - Afficher les graphiques en temps réel sur la toile principale
   - Basculer entre différents types de graphiques
   - Voir les mises à jour en direct au fur et à mesure que vous modifiez les données

4. **Sauvegarder et exporter**
   - Sauvegarder les campagnes pour une utilisation ultérieure
   - Télécharger les graphiques sous forme d'images PNG
   - Charger les campagnes précédemment sauvegardées

### Gérer les campagnes

- **Sauvegarder** : Stocker les données de la campagne actuelle localement
- **Charger** : Récupérer les campagnes précédemment sauvegardées
- **Supprimer** : Supprimer les campagnes indésirables
- **Nouveau** : Commencer à zéro avec une campagne vierge

## 🎨 Système de conception

L'application utilise un système de conception soigneusement élaboré avec :

- **Palette de couleurs** : Thème professionnel basé sur le bleu, inspirant confiance et autorité
- **Typographie** : Michroma pour les titres (moderne, axé sur la technologie) et Open Sans pour le corps de texte (lisible, fiable)
- **Composants** : Composants shadcn/ui cohérents partout
- **Réactif** : Conception "mobile-first" avec des mises en page adaptatives

## 📁 Structure du projet