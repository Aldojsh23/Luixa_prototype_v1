import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function HomeScreen({ route, userData }) {
  // Priorizar userData de props, luego de route params
  const user = userData || route.params?.userData;

  // Mostrar loading si los datos no están cargados aún
  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Cargando información del usuario...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        ¡Bienvenido, {user.nombre_proveedor || 'Usuario'}!
      </Text>
      <Text>Negocio: {user.negocio_proveedor || 'No especificado'}</Text>
      <Text>Correo: {user.correo_proveedor || 'No especificado'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
  },
});