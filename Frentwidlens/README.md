# Welcome to your Expo app 👋
* WildLens est une application mobile développée avec Expo et React Native, conçue pour permettre aux utilisateurs de scanner des empreintes animales et de gérer leurs profils. Ce projet front-end inclut une interface utilisateur avec des écrans pour la connexion, l’inscription, la gestion administrative, le profil utilisateur, et la préparation au scan d’empreintes. Il a été créé dans le cadre d’un projet académique ou personnel pour démontrer les capacités de React Native dans le développement d’applications multi-plateformes




# Prérequis
Avant de commencer, assurez-vous d’avoir les outils suivants installés :

* Node.js (version 14 ou supérieure recommandée)
npm (inclus avec Node.js)
* Expo CLI : Installez-le globalement avec npm install -g expo-cli (si ce n’est pas déjà fait)
* Expo Go : Application mobile pour tester sur un appareil, ou un émulateur (Android Studio pour Android, Xcode pour iOS)
* Un éditeur de code (ex. Visual Studio Code)

# Get Started

Install dependencies

* npm install
Cela installera les dépendances nécessaires, y compris React Native, React Navigation, et @expo/vector-icons (pour Ionicons).


# Start the app

* npx expo start
Une fois lancé, vous trouverez des options pour ouvrir l’app sur :

* Expo Go (scan du QR code avec l’application Expo Go sur votre téléphone)
Android emulator
iOS simulator
* L’application démarrera sur l’écran de connexion. Vous pouvez tester avec les identifiants "admin"/"admin" pour accéder à l’écran administrateur.

# Fonctionnalités
 * Connexion : Permet de se connecter avec des identifiants prédéfinis ("admin"/"admin") pour accéder à l’interface administrateur.
 * Inscription : Permet de créer un compte en saisissant des informations comme le nom, l’e-mail, le téléphone, et un mot de passe.
* Écran Admin : Fournit un hub pour gérer les scans, consulter ou soumettre des avis, et naviguer vers d’autres sections (profil, contact) avec une option de déconnexion.
 * Profil : Permet de consulter et modifier les informations personnelles (nom, prénom, e-mail, téléphone) en mode édition.
* Scan : Offre une interface pour lancer un scan d’empreinte animale (fonctionnalité simulée, non connectée à une API).



# Notes
* Le scan d’empreintes est une interface simulée et attend une intégration avec une API back-end pour traiter les données.
* Les données saisies (connexion, inscription) sont gérées localement avec useState et ne sont pas persistantes.
* Le projet a été testé sur des appareils via Expo Go et des émulateurs pour assurer une compatibilité.


# Learn More
* Pour approfondir vos connaissances sur le développement avec Expo et React Native, consultez ces ressources :

* Expo Documentation : Apprenez les bases ou explorez des sujets avancés avec les guides.
Learn Expo Tutorial : Suivez un tutoriel pour créer un projet compatible Android, iOS, et web.
