# 🐾 WildLens

WildLens est une application mobile qui permet d'identifier l'espèce animale à partir d'une empreinte grâce à un modèle YOLOv8 entraîné.  
Elle combine React Native (frontend), Spring Boot (backend) et Flask (modèle YOLO).
---
## 📁 Structure du projet
```
wildlens/
├── Frentwildlens/     # Frontend React Native (Expo)
├── wildlensApi/       # Backend Spring Boot
├── API_modele/        # API Flask avec le modèle YOLOv5
```

---

## ✅ Prérequis

Avant de lancer le projet, assure-toi d’avoir les outils suivants installés sur ta machine :

### Outils généraux
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Java JDK 21](https://jdk.java.net/21/)
- [Maven](https://maven.apache.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)
- [Visual Studio Code (recommandé)](https://code.visualstudio.com/)
- [Python **3.12.6**](https://www.python.org/) recommandé (⚠️ Les versions < 3.12 peuvent provoquer des erreurs)
- `pip` (gestionnaire de paquets Python)

---

## 🚀 Lancer l'application

Voici les étapes **dans l’ordre** pour lancer l’application complète.

---

### 1️⃣ Lancer le backend (Spring Boot + Docker)

Ouvre un terminal (Git Bash ou autre) :

```bash
cd ./wildlensApi/
```

Assure-toi que Docker Desktop est lancé, puis exécute :

```bash
docker-compose up
```
Cela va lancer la base de données (PostgreSQL ou autre selon ton docker-compose.yml).

Ensuite, dans le même terminal ou un autre :

```bash
mvn spring-boot:run
```
Le backend sera disponible sur: **http://localhost:8080**
--- 
--- 
### 2️⃣ Lancer l'API Flask avec le modèle YOLOv5
Ouvre un nouveau terminal :

```bash
cd ./API_modele/
```
Active l’environnement virtuel Python :

Selon ton terminal :
Git Bash / macOS / Linux :

Bash  

```bash
source venv/bin/activate
```
PowerShell (Windows) :
```PowerShell (Windows) :
venv\Scripts\Activate.ps1
```
cmd (Windows) :
```cmd
venv\Scripts\activate.bat
```
Lance ensuite l'API Flask :

```bash
python app.py
```
L’API est accessible sur **http://localhost:5000** 
--- 
---

### 3️⃣ Lancer le frontend React Native (Expo)
Ouvre un nouveau terminal :

```bash
cd ./Frentwildlens/
```
Installe les dépendances du frontend :

```bash
npm install
```
Lance le projet avec Expo :
```bash
npx expo start
```
Tu peux ensuite :

Scanner le QR code avec l’app Expo Go sur ton téléphone

Lancer l’émulateur Android ou iOS

Ouvrir dans un navigateur
