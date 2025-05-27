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
        <Text style={styles.title}>INSCRIVEZ-VOUS</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom d’utilisateur"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse Mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#666"
        />
         <TextInput
          style={styles.input}
          placeholder="Téléphone"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmez votre mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#666"
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
  container: { 
    flex: 1, 
    backgroundColor: '#C8E6C9', // vert clair
  },
  banner: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { 
    width: 80, 
    height: 80, 
    marginBottom: 20,
  },
  title: { 
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B3D0B',  // vert foncé
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#333',
  },
  accountText: { 
    color: '#0B3D0B',  // vert foncé
    fontSize: 14,
    marginBottom: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  button: { 
    backgroundColor: '#0B3D0B',  // bouton vert foncé
    paddingVertical: 15, 
    paddingHorizontal: 60, 
    borderRadius: 10, 
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff',  // texte blanc
    fontSize: 18, 
    fontWeight: 'bold',
  },
});
