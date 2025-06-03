import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, TouchableWithoutFeedback, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ALLOWED_EMAILS = ['admin@example.com'];

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(''); // <-- nouvel état pour erreur mdp
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase());
  };

  const isEmailAllowed = (email) => {
    return ALLOWED_EMAILS.includes(email.toLowerCase());
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (!text.trim()) {
      setEmailError('Veuillez entrer une adresse e-mail.');
    } else if (!validateEmail(text)) {
      setEmailError('Veuillez entrer une adresse e-mail valide (ex. : user@example.com).');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!text.trim()) {
      setPasswordError('Veuillez entrer un mot de passe.');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    // Reset errors
    setPasswordError('');

    if (!email.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail valide.');
      return;
    }

    if (!isEmailAllowed(email)) {
      Alert.alert('Erreur', 'Votre email n’est pas validé.');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Veuillez entrer un mot de passe.');
      return;
    }

    if (email.toLowerCase() === 'admin@example.com' && password === 'admin') {
      Alert.alert('Succès', 'Connexion réussie !');
      navigation.navigate('Admin');
    } else {
      setPasswordError('Votre mot de passe est incorrect.');
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
        placeholder="Adresse e-mail"
        placeholderTextColor="#666"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#666"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableWithoutFeedback onPress={handleRegisterPress}>
        <Text style={styles.firstLogin}>C’est votre première connexion ?</Text>
      </TouchableWithoutFeedback>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8E6C9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  forgotPassword: {
    color: '#0B3D0B',
    fontSize: 14,
    marginBottom: 10,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B3D0B',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  firstLogin: {
    color: '#0B3D0B',
    fontSize: 14,
    marginTop: 20, 
    marginBottom: 30,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0B3D0B',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
