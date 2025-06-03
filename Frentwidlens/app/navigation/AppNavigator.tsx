import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../tabs/SplashScreen';
import LoginScreen from '../tabs/LoginScreen';
import RegisterScreen from '../tabs/RegisterScreen';
import AdminScreen from '../tabs/AdminScreen';
import MonProfil from '../tabs/MonProfil';
import ResultScreen from '../tabs/ResultScreen';
import ForgotPasswordScreen from '../tabs/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <View style={styles.screen}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"  // On démarre par l'écran Splash
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="MonProfil" component={MonProfil} />
          <Stack.Screen name="ResultScreen" component={ResultScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
  },
});
