import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function AdminScreen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const scrollViewRef = useRef(null);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleManageUsers = () => {
    Alert.alert('Gérer les utilisateurs', 'Fonctionnalité à venir');
  };

  const handleViewFeedback = () => {
    Alert.alert('Feedback', 'Fonctionnalité à venir');
  };

  // Demander la permission pour accéder à la position
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Autorisation de localisation nécessaire.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  // Fonction pour obtenir la localisation
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Activez la localisation pour utiliser cette fonction.');
        return null;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      return currentLocation;
    } catch (error) {
      console.error('Erreur localisation:', error);
      Alert.alert('Erreur', 'Impossible d\'obtenir la localisation.');
      return null;
    }
  };

  // Scanner avec la caméra
  const handleScanFootprint = async () => {
    try {
      // Vérifier la localisation
      const currentLocation = await getLocation();
      if (!currentLocation) return;

      // Demander la permission pour la caméra
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Erreur', 'Permission d\'accès à la caméra requise !');
        return;
      }

      // Ouvrir la caméra
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: false,
        base64: true, // Important pour l'upload
      });

      // Vérifier si l'utilisateur n'a pas annulé
      if (!result.canceled && result.assets && result.assets[0]) {
        // Message de succès
        Alert.alert('Succès', 'Image capturée avec succès !', [
          {
            text: 'OK',
            onPress: () => {
              // Naviguer vers ResultScreen avec toutes les données
              navigation.navigate('ResultScreen', {
                imageUri: result.assets[0].uri,
                base64: result.assets[0].base64,
                location: currentLocation,
                source: 'camera'
              });
            }
          }
        ]);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture de la caméra :', error);
      Alert.alert('Erreur', `Impossible d\'ouvrir la caméra : ${error.message}`);
    }
  };

  // Upload depuis la galerie
  const handlePickImage = async () => {
    try {
      // Vérifier la localisation
      const currentLocation = await getLocation();
      if (!currentLocation) return;

      // Demander la permission pour la galerie
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Erreur', 'Permission d\'accès à la galerie requise !');
        return;
      }

      // Ouvrir la galerie
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: false,
        base64: true, // Important pour l'upload
      });

      if (result.canceled || !result.assets || !result.assets[0]) {
        return; // L'utilisateur a annulé
      }

      // Vérifier si base64 est disponible
      if (!result.assets[0].base64) {
        Alert.alert('Erreur', 'Impossible de traiter l\'image sélectionnée.');
        return;
      }

      // Message de succès
      Alert.alert('Succès', 'Image chargée avec succès !', [
        {
          text: 'OK',
          onPress: () => {
            // Naviguer vers ResultScreen avec toutes les données
            navigation.navigate('ResultScreen', {
              imageUri: result.assets[0].uri,
              base64: result.assets[0].base64,
              location: currentLocation,
              source: 'gallery'
            });
          }
        }
      ]);

    } catch (error) {
      console.error('Erreur lors de la sélection d\'image:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors du traitement.');
    }
  };

  const handleLeaveFeedback = () => {
    Alert.alert('Laisser un avis', 'Fonctionnalité à venir');
  };

  const handleHome = () => {
    setMenuVisible(false);
    // Reste sur AdminScreen (Accueil)
  };

  const handleProfile = () => {
    navigation.navigate('MonProfil');
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  return (
    <View style={styles.container}>
      {/* En-tête fixe avec menu */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/images/LogoPatteWildlens.png')}
            style={styles.logo}
          />
          <Text style={styles.headerText}>WIDLENS</Text>
        </View>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
          <Text style={styles.menuLines}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Barre de navigation */}
      {menuVisible && (
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem} onPress={handleHome}>
            <Text style={styles.navText}>Accueil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleScanFootprint}>
            <Text style={styles.navText}>Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleViewFeedback}>
            <Text style={styles.navText}>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleProfile}>
            <Text style={styles.navText}>Mon Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
            <Text style={styles.navText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Section 1 : Titre Principal */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>BIENVENUE !</Text>
          <View style={styles.pawIcons}>
            {[...Array(8)].map((_, index) => (
              <Text key={index} style={styles.pawIcon}>🐾</Text>
            ))}
          </View>
        </View>

        {/* Section 2 : Scan Intro */}
        <View style={styles.scanSection}>
          <Text style={styles.sectionTitle}>DÉMARREZ VOTRE ANALYSE</Text>
          <Image
            source={require('../../assets/images/icono-de-camara-verte.png')}
            style={styles.scanImage}
          />
          <Text style={styles.sectionText}>
            Scannez une empreinte ou importez une photo pour identifier l’animal en quelques secondes.
          </Text>
          <View style={styles.scanButtons}>
            <TouchableOpacity style={styles.scanButton} onPress={handleScanFootprint}>
              <Text style={styles.buttonText}>Scanner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={handlePickImage}>
              <Text style={styles.buttonText}>Uploader</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 3 : Avantages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LES AVANTAGES DE NOTRE APPLICATION ?</Text>
          <View style={styles.advantages}>
            <View style={styles.advantageItem}>
              <Image
                source={require('../../assets/images/Image5Min.jpg')}
                style={styles.iconImage}
              />
              <Text style={styles.advantageText}>rapide à configurer</Text>
            </View>
            <View style={styles.advantageItem}>
              <Image
                source={require('../../assets/images/DrapeauFrance.png')}
                style={styles.iconImage}
              />
              <Text style={styles.advantageText}>made in france</Text>
            </View>
            <View style={styles.advantageItem}>
              <Image
                source={require('../../assets/images/ImageSecurisé.png')}
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
            source={require('../../assets/images/ImageScanAccueil2.png')}
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
            source={require('../../assets/images/ImageScanAccueil1.webp')}
            style={styles.illustration}
          />
        </View>

        {/* Section 6 : Scanner une empreinte */}
        <View style={styles.section}>
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
            source={require('../../assets/images/ImageAvis1.png')}
            style={styles.illustration}
          />
          <View style={styles.feedbackIcons}>
            <Text style={styles.starIcon}>⭐⭐⭐⭐⭐</Text>
            <Image
              source={{ uri: 'https://via.placeholder.com/100x100' }}
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
              source={require('../../assets/images/WildlensLogoVert.png')}
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

      {/* Boutons de défilement */}
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
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#31C48D',
  },
  menuIcon: {
    padding: 8,
  },
  menuLines: {
    fontSize: 24,
    color: '#31C48D',
  },
  navBar: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    zIndex: 999,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  navText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  titleSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#e8f5e9',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#31C48D',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  pawIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pawIcon: {
    fontSize: 20,
    margin: 2,
    color: '#FFC107',
  },
  scanSection: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  section: {
    padding: 15,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#31C48D',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  sectionText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  scanImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#31C48D',
  },
  scanButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  scanButton: {
    backgroundColor: '#31C48D',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  uploadButton: {
    backgroundColor: '#31C48D',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  advantages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  advantageItem: {
    alignItems: 'center',
    width: '30%',
  },
  advantageText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  illustration: {
    width: 180,
    height: 135,
    marginVertical: 10,
    borderRadius: 8,
  },
  actionButton: {
    backgroundColor: '#31C48D',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 8,
    width: '70%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: '#31C48D',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 15,
    width: '70%',
    alignItems: 'center',
  },
  feedbackIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  starIcon: {
    fontSize: 20,
    color: '#f4a261',
  },
  feedbackImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  iconImage: {
    width: 35,
    height: 35,
    marginBottom: 5,
    borderRadius: 5,
  },
  footer: {
    backgroundColor: '#31C48D',
    padding: 15,
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
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  footerSlogan: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 8,
  },
  footerLink: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
  },
  footerTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  footerContact: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
  },
  footerCopyright: {
    color: '#fff',
    fontSize: 10,
    marginTop: 15,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    fontSize: 20,
    color: '#fff',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
  },
  scrollButtons: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    alignItems: 'center',
  },
  scrollButton: {
    backgroundColor: '#31C48D',
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  scrollButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});