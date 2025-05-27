import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, TouchableWithoutFeedback, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      navigation.navigate('Admin');
    } else {
      Alert.alert('Erreur', 'Identifiants incorrects. Utilisez "admin" pour le nom d\'utilisateur et le mot de passe.');
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo_vert.png')} style={styles.logo} />
      <Text style={styles.loginText}>Entrez vos identifiants</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableWithoutFeedback onPress={handleRegisterPress}>
        <Text style={styles.firstLogin}>C’est votre première connexion ?</Text>
      </TouchableWithoutFeedback>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8E6C9',  // même fond vert clair
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B3D0B',  // vert foncé
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  firstLogin: {
    color: '#0B3D0B',  // vert foncé
    fontSize: 14,
    marginBottom: 30,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0B3D0B',  // bouton vert foncé
    width: '100%',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',  // texte blanc
    fontSize: 18,
    fontWeight: 'bold',
  },
});
