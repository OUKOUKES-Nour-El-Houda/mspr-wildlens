import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdminScreen() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false); // État pour afficher/masquer le menu
  const scrollViewRef = useRef(null); // Référence pour le ScrollView

  const handleLogout = () => {
    navigation.navigate('Login');
  };
  const handleManageUsers = () => {
    alert('Gérer les utilisateurs - Fonctionnalité à venir');
  };

  const handleViewFeedback = () => {
    navigation.navigate('Feedback');
  };

  const handleScanFootprint = () => {
    navigation.navigate('Scan');
  };

  const handleLeaveFeedback = () => {
    alert('Laisser un avis - Fonctionnalité à venir');
  };

  const handleHome = () => {
    navigation.navigate('Accueil');
    setMenuVisible(false);
  };

  const handleContact = () => {
    navigation.navigate('Contact');
    setMenuVisible(false);
  };

  const handleProfile = () => {
    navigation.navigate('MonProfil');
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Fonction pour scroller vers le haut
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
      console.log('Scrolling to top'); // Pour déboguer
    } else {
      console.log('ScrollView ref is not available'); // Pour déboguer
    }
  };

  // Fonction pour scroller vers le bas
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
      console.log('Scrolling to bottom'); // Pour déboguer
    } else {
      console.log('ScrollView ref is not available'); // Pour déboguer
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 20 }} // Pour éviter que le contenu soit coupé en bas
      >
        {/* Section 1 : En-tête avec Logo, WIDLENS et Menu */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/LogoPatteWildlens.png')} // Vérifiez le chemin
              style={styles.logo}
            />
            <Text style={styles.headerText}>WIDLENS</Text>
          </View>
          <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
            <Text style={styles.menuLines}>☰</Text>
          </TouchableOpacity>
          <View style={styles.headerLine} />
        </View>

        {/* Menu déroulant (affiché uniquement si menuVisible est vrai) */}
        {menuVisible && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity onPress={handleHome}>
              <Text style={styles.menuItem}>Accueil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleScanFootprint}>
              <Text style={styles.menuItem}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleViewFeedback}>
              <Text style={styles.menuItem}>Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleContact}>
              <Text style={styles.menuItem}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfile}>
              <Text style={styles.menuItem}>Mon Profil</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Section 2 : Titre Principal avec Icônes de Pattes */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>BIENVENUE, ADMINISTRATEUR !</Text>
          <View style={styles.pawIcons}>
            {[...Array(8)].map((_, index) => (
              <Text key={index} style={styles.pawIcon}>🐾</Text>
            ))}
          </View>
        </View>

        {/* Section 3 : Avantages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LES AVANTAGES DE NOTRE APPLICATION ?</Text>
          <View style={styles.advantages}>
            <View style={styles.advantageItem}>
              <Image
                source={require('../../assets/images/Image5Min.jpg')} // Vérifiez le chemin
                style={styles.iconImage}
              />
              <Text style={styles.advantageText}>rapide à configurer</Text>
            </View>
            <View style={styles.advantageItem}>
              <Image
                source={require('../../assets/images/DrapeauFrance.png')} // Vérifiez le chemin
                style={styles.iconImage}
              />
              <Text style={styles.advantageText}>made in france</Text>
            </View>
            <View style={styles.advantageItem}>
              <Image
                source={require('../../assets/images/Image100%Securisé.png')} // Vérifiez le chemin
                style={styles.iconImage}
              />
              <Text style={styles.advantageText}>100% sécurisée</Text>
            </View>
          </View>
        </View>

        {/* Section 4 : Fonctionnement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>COMMENT FONCTIONNE NOTRE APPLICATION ?</Text>
          <Text style={styles.sectionText}>
            notre application consiste à scanner une empreinte d’un animal
          </Text>
          <Image
            source={require('../../assets/images/ImageScanAccueil2.png')} // Vérifiez le chemin
            style={styles.illustration}
          />
        </View>

        {/* Section 5 : Action */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton} onPress={handleManageUsers}>
            <Text style={styles.buttonText}>
              suite à cela, l’application vous affichera les informations de l’empreinte comme l’animal identifié, la race, etc.
            </Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/ImageScanAccueil1.webp')} // Vérifiez le chemin
            style={styles.illustration}
          />
        </View>

        {/* Section 6 : Scanner une empreinte */}
        <View style={styles.section}>
          <Text style={styles.sectionText}>si vous souhaitez scanner une empreinte</Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleScanFootprint}>
            <Text style={styles.buttonText}>scanner une empreinte</Text>
          </TouchableOpacity>
          <Text style={styles.sectionText}>grâce à vos avis, l’application s’améliorera</Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleLeaveFeedback}>
            <Text style={styles.buttonText}>laisser votre avis</Text>
          </TouchableOpacity>
        </View>

        {/* Section 7 : Amélioration */}
        <View style={styles.section}>
          <Text style={styles.sectionText}>
            grâce à vos retours, la plateforme s’améliorera
          </Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleViewFeedback}>
            <Text style={styles.buttonText}>voir les retours</Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/ImageAvis1.png')} // Vérifiez le chemin
            style={styles.illustration}
          />
          <View style={styles.feedbackIcons}>
            <Text style={styles.starIcon}>⭐⭐⭐⭐⭐</Text>
            <Image
              source={{ uri: 'https://via.placeholder.com/100x100' }} // Remplacez par votre image
              style={styles.feedbackImage}
            />
          </View>
        </View>

        {/* Section 8 : Déconnexion */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>se déconnecter</Text>
          </TouchableOpacity>
        </View>

        {/* Section 9 : Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Image
              source={require('../../assets/images/WildlensLogoVert.png')} // Logo vert de WIDLENS
              style={styles.footerLogo}
            />
            <Text style={styles.footerSlogan}>To know them is to love them</Text>
            <Text style={styles.footerLink}>Debitis / laborum</Text>
            <Text style={styles.footerLink}>Lorem & cupiditate</Text>
            <Text style={styles.footerLink}>Beguiled</Text>
            <Text style={styles.footerTitle}>CONTACT US</Text>
            <Text style={styles.footerContact}>123 Simply Quidem</Text>
            <Text style={styles.footerContact}>Soluta LOREM</Text>
            <Text style={styles.footerContact}>The Park</Text>
            <Text style={styles.footerContact}>AB 10000</Text>
            <Text style={styles.footerCopyright}>@2012 ABC WAS PRI...</Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.footerTitle}>FOLLOW US</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity>
                <Text style={styles.socialIcon}>f</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.socialIcon}>🐦</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Boutons de défilement à droite */}
      <View style={styles.scrollButtons}>
        <TouchableOpacity style={styles.scrollButton} onPress={scrollToTop}>
          <Text style={styles.scrollButtonText}>↑</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scrollButton} onPress={scrollToBottom}>
          <Text style={styles.scrollButtonText}>↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  menuIcon: {
    padding: 10,
  },
  menuLines: {
    fontSize: 30,
    color: '#4CAF50',
  },
  menuDropdown: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    alignItems: 'center',
  },
  menuItem: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },
  headerLine: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 5,
    backgroundColor: '#4CAF50',
  },
  titleSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  pawIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pawIcon: {
    fontSize: 24,
    margin: 2,
    color: '#FFC107',
  },
  section: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  advantages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  advantageItem: {
    alignItems: 'center',
  },
  advantageText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  illustration: {
    width: 200,
    height: 150,
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginVertical: 20,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  feedbackIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  starIcon: {
    fontSize: 24,
    color: '#f4a261',
  },
  feedbackImage: {
    width: 100,
    height: 100,
  },
  iconImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  footer: {
    backgroundColor: '#4CAF50',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerLogo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  footerSlogan: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  footerLink: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  footerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  footerContact: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  footerCopyright: {
    color: '#fff',
    fontSize: 12,
    marginTop: 20,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    fontSize: 24,
    color: '#fff',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
  },
  scrollButtons: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    alignItems: 'center',
  },
  scrollButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  scrollButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});