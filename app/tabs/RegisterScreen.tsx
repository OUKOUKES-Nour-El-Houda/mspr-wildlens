import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    alert(`Inscription avec : ${username}, ${email}, ${password}, ${confirmPassword}`);
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image source={require('../../assets/images/logo_vert.png')} style={styles.logo} />
        <Text style={styles.title}>INSCRIVEZ VOUS</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom d’utilisateur"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse Mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmez votre mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableWithoutFeedback onPress={handleLoginPress}>
          <Text style={styles.accountText}>Vous avez déjà un compte ?</Text>
        </TouchableWithoutFeedback>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>S’inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: require('../../assets/images/banner-shape-green.png'),
  },
  logo: { width: 50, height: 50, marginBottom: 20 },
  title: { color: '#4CAF50', fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 0,
    color: '#fff',
  },
  accountText: { color: '#B0BEC5', fontSize: 14, marginBottom: 20, textDecorationLine: 'underline' },
  button: { backgroundColor: '#4CAF50', paddingVertical: 15, paddingHorizontal: 60, borderRadius: 10, marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});