import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const imageUri = route.params?.imageUri || 'https://images.unsplash.com/photo-1605723517503-3cadb131dd8e';
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleViewFeedback = () => {
    Alert.alert('Feedback', 'Fonctionnalité à venir');
  };

  const handleScanFootprint = () => {
    navigation.navigate('Admin');
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
          <Image
            source={{ uri: imageUri }}
            style={styles.resultImage}
          />
          <Text style={styles.sectionText}>
            Voici l'image que vous avez scannée ou téléchargée. Vous pouvez maintenant analyser cette empreinte.
          </Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleScanFootprint}>
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