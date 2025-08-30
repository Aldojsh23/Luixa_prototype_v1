import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getSession, clearSession } from './lib/session'; // Importa las funciones de sesión

import Login from "./Pantallas/Login";
import Navigation from './navigation';

const Stack = createNativeStackNavigator();

export default function App() {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Cambiar a false ya que no usamos auth de Supabase

  // Cargar sesión al iniciar la app
  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      if (session) {
        setUserData(session);
      }
      setLoading(false);
    };
    loadSession();
  }, []);

  // Función para manejar el login exitoso
  const handleLoginSuccess = async (providerData) => {
    setUserData(providerData); // Actualiza el estado inmediatamente

  };

  // Función para manejar logout
  const handleLogout = async () => {
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
          <Stack.Screen name="HomeScreen">
            {(props) => <Navigation {...props} userData={userData} onLogout={handleLogout} />}
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