import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./Pantallas/Login";
import Navigation from './navigation';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false); // Cambiar a false ya que no usamos auth de Supabase

  // Función para manejar el login exitoso
  const handleLoginSuccess = (providerData) => {
    console.log('Usuario autenticado:', providerData);
    setUserData(providerData);
  };

  // Función para manejar logout (puedes usarla más tarde)
  const handleLogout = () => {
    setUserData(null);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userData ? (
          <Stack.Screen name="MainApp">
            {(props) => <Navigation {...props} userData={userData} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {(props) => <Login {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}