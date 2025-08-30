import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';

// Guardar sesión
export const saveSession = async (userData) => {
  try {
    await AsyncStorage.setItem('proveedorSession', JSON.stringify({
      id: userData.id_proveedor, // Guarda el ID con el nombre correcto
      email: userData.correo_proveedor,
      negocio: userData.negocio_proveedor,
    }));
    console.log("✅ Sesión guardada");
  } catch (error) {
    console.error("❌ Error al guardar sesión:", error);
  }
};

// Leer sesión
export const getSession = async () => {
  try {
    const session = await AsyncStorage.getItem('proveedorSession');
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error("❌ Error al leer sesión:", error);
    return null;
  }
};

// Cerrar sesión
export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem('proveedorSession');
    await supabase.auth.signOut();
  } catch (error) {
    console.error("❌ Error al cerrar sesión:", error);
  }
};