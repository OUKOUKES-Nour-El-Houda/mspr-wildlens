import React from 'react';
import { StyleSheet, View } from 'react-native';  // Import View pour le cadre
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../tabs/LoginScreen';
import RegisterScreen from '../tabs/RegisterScreen';
import AdminScreen from '../tabs/AdminScreen';
import MonProfil from '../tabs/MonProfil';
import ResultScreen from '../tabs/ResultScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
      <View style={styles.screen}>  {/* Écran intérieur */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen name="MonProfil" component={MonProfil} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
  );
}

const styles = StyleSheet.create({
  
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',   // Fond blanc à l'intérieur
    borderRadius: 30,
    overflow: 'hidden',
  },
});
