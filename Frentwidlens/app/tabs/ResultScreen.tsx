import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image,  Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function ResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { imageUri, base64, location, source } = route.params || {};

  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleHome = () => {
    navigation.navigate('Admin');
    setMenuVisible(false);
  };

  const handleProfile = () => {
    navigation.navigate('MonProfil');
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const analyzeImage = async () => {
    try {
      if (!imageUri || !base64 || !location) {
        throw new Error('Données manquantes (image, base64 ou localisation)');
      }

      const latitude = location.coords.latitude.toString();
      const longitude = location.coords.longitude.toString();
      const profilId = '1'; // À personnaliser

      const extension = imageUri.split('.').pop().toLowerCase();
      const mimeType = `image/${extension === 'jpg' ? 'jpeg' : extension}`;

      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: `photo.${extension}`,
        type: mimeType,
      });
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('profilId', profilId);

      const url = 'http://192.168.223.227:8082/api/v1/images';

      console.log('Envoi de l\'image au backend...');

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Réponse backend :', data);

      if (data && (data.success || data.success === null)) {
        setResult({
          espece: data.espece || 'Espèce non identifiée',
          description: data.description || 'Aucune description disponible',
          confiance: data.confidence !== undefined ? (data.confidence * 100).toFixed(2) + '%' : 'Non disponible',
          habitat: data.habitat || 'Information non disponible',
          famille: data.famille || 'Non spécifiée',
          funFact: data.funFact || 'Aucune anecdote disponible',
          nomLatin: data.nomLatin || 'Nom latin inconnu',
          region: data.region || 'Région non spécifiée',
          taille: data.taille || 'Taille inconnue',
          DateIdentification: data.identificationDate || 'Date non connue',
        });
      } else {
        throw new Error('Réponse inattendue du backend');
      }

    } catch (error) {
      console.error('Erreur lors de l\'analyse :', error);
      setError(error.message || 'Erreur inattendue lors de l\'analyse');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (imageUri && base64 && location) {
      setTimeout(() => {
        analyzeImage();
      }, 1000);
    } else {
      setError('Données manquantes pour l\'analyse');
      setIsLoading(false);
    }
  }, [imageUri, base64, location]);
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
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Section : Affichage de l'image */}
        <View style={styles.imageSection}>
          <Text style={styles.sectionTitle}>IMAGE SCANNÉE OU TÉLÉCHARGÉE</Text>
          <Image source={{ uri: imageUri }} style={styles.resultImage} />
          <Text style={styles.sectionText}>
            Voici l'image que vous avez scannée ou téléchargée.
          </Text>

          <View style={styles.resultsContainer}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Analyse en cours...</Text>
              </View>
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <View style={styles.especeDetectedContainer}>
                  <Text style={styles.especeLabel}>ESPÈCE DÉTECTÉE :</Text>
                  <Text style={styles.especeName}>{result.espece}</Text>
                </View>
                <Text style={styles.text}>Nom Latin: {result.nomLatin}</Text>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>
                  Confiance: {result.confiance}
                </Text>
                <Text style={styles.text}>Description: {result.description}</Text>
                <Text style={styles.text}>Famille: {result.famille}</Text>
                <Text style={styles.text}>Habitat: {result.habitat}</Text>
                <Text style={styles.text}>Région: {result.region}</Text>
                <Text style={styles.text}>Taille: {result.taille}</Text>
                <Text style={styles.text}>Date d'identification: {result.DateIdentification}</Text>
                <Text style={styles.text}>Fun Fact: {result.funFact}</Text>
              </>
            )}
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={handleHome}>
            <Text style={styles.buttonText}>Retour à l'accueil</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  especeDetectedContainer: {
  alignItems: 'center',
  marginBottom: 15,
  marginTop: 10,
},

    especeLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#31C48D',
      textTransform: 'uppercase',
      marginBottom: 4,
    },

    especeName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#31C48D',
    },
    loadingContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
    loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  resultsContainer: {
  marginVertical: 10,
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
  imageSection: {
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
  resultImage: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#31C48D',
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
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
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
});