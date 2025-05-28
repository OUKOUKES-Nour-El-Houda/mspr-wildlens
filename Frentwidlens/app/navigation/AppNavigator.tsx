import React from 'react';
import { StyleSheet, View } from 'react-native';  // Import View pour le cadre
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../tabs/LoginScreen';
import RegisterScreen from '../tabs/RegisterScreen';
import AdminScreen from '../tabs/AdminScreen';
import MonProfil from '../tabs/MonProfil';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <View style={styles.phoneFrame}>  {/* Cadre extérieur */}
      <View style={styles.screen}>  {/* Écran intérieur */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen name="MonProfil" component={MonProfil} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  phoneFrame: {
    width: 400,
    height: 800,
    backgroundColor: '#000',   // Cadre noir
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',   // Fond blanc à l'intérieur
    borderRadius: 30,
    overflow: 'hidden',
  },
});
