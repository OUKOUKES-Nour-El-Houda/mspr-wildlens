import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
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
      <View style={styles.banner}>
        <Image source={require('../../assets/images/wildlens-logo-paw-white.png')} style={styles.logo} />
        <Text style={styles.slogan}>Les connaître, c’est les aimer</Text>
        <Text style={styles.loginText}>Entrez vos identifiants</Text>
        <TextInput style={styles.input} placeholder="Nom d'utilisateur" value={username} onChangeText={setUsername} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableWithoutFeedback onPress={handleRegisterPress}>
          <Text style={styles.firstLogin}>C’est votre première connexion ?</Text>
        </TouchableWithoutFeedback>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: { flex: 1, backgroundColor: '#4DB6AC', width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  logo: { width: 250, height: 125, marginBottom: 30 },
  slogan: { color: '#000', fontSize: 18, marginBottom: 30 },
  loginText: { color: '#000', fontSize: 22, marginBottom: 30 },
  input: { width: '80%', height: 50, backgroundColor: '#E0F2F7', borderRadius: 5, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#B0BEC5' },
  firstLogin: { color: '#000', fontSize: 14, marginTop: 20, marginBottom: 20, textDecorationLine: 'underline' },
  button: { backgroundColor: '#fff', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
  buttonText: { color: '#4DB6AC', fontSize: 18, fontWeight: 'bold' },
});