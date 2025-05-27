import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MonProfil({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    nom: 'Es-Saiydy',
    prenom: 'Abir',
    email: 'abir@example.com',
    telephone: '+212 600 000 000',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  });

  const updateField = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const onSave = () => {
    setIsEditing(false);
    navigation.navigate('MonProfil'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Profil */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: profile.image }} style={styles.profileImage} />
        {isEditing && (
          <TouchableOpacity style={styles.editImageBtn}>
            <Ionicons name="camera" size={24} color="#28a745" />
          </TouchableOpacity>
        )}
      </View>

      {/* Informations */}
      <View style={styles.infoContainer}>
        {['nom', 'prenom', 'email', 'telephone'].map((field) => (
          <View key={field} style={styles.row}>
            <Ionicons
              name={
                field === 'nom'
                  ? 'person'
                  : field === 'prenom'
                  ? 'person-outline'
                  : field === 'email'
                  ? 'mail'
                  : 'call'
              }
              size={28}
              color="#28a745"
              style={styles.icon}
            />
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile[field]}
                onChangeText={(text) => updateField(field, text)}
              />
            ) : (
              <Text style={styles.text}>{profile[field]}</Text>
            )}
          </View>
        ))}
      </View>

      {/* Boutons */}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Ionicons name="save" size={22} color="#fff" />
            <Text style={styles.btnText}>Enregistrer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsEditing(true)}
          >
            <Ionicons name="pencil" size={22} color="#fff" />
            <Text style={styles.btnText}>Modifier</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.navigate('Admin')}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
          <Text style={styles.btnText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: '#28a745', // vert autour de l'image
    borderRadius: 75,
    padding: 4,
    marginBottom: 30,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  editImageBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#e0f8e9', // vert clair en background
    borderRadius: 20,
    padding: 6,
  },
  infoContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  icon: {
    marginRight: 15,
  },
  text: {
    fontSize: 20,
    color: '#28a745',
    flex: 1,
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: '#28a745',
    color: '#28a745',
    flex: 1,
    paddingVertical: 4,
  },
  buttonContainer: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 35,
    alignItems: 'center',
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: '#1e7e34', // vert foncé pour le bouton retour
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 12,
    fontWeight: '600',
  },
});
