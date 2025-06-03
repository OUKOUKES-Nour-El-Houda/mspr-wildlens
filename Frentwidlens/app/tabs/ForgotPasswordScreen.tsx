import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSendLink = () => {
    if (!email.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse email.');
    } else {
      // Ici tu peux ajouter l'envoi réel de l'email plus tard
      Alert.alert('Lien envoyé', `Un lien de réinitialisation a été envoyé à ${email}`);
    }
  };

  const handleBack = () => {
    navigation.goBack(); // Retour à l'écran précédent
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo_vert.png')} style={styles.logo} />
      <Text style={styles.title}>Réinitialiser le mot de passe</Text>

      <TextInput
        style={styles.input}
        placeholder="Entrez votre adresse email"
        placeholderTextColor="#555"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendLink}>
        <Text style={styles.buttonText}>Envoyer le lien</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>← Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8E6C9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    color: '#0B3D0B',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#0B3D0B',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#0B3D0B',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    color: '#0B3D0B',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
