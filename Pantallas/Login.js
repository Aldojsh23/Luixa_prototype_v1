import React, { useState } from "react";
import { StatusBar } from "react-native";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import { supabase } from "../lib/supabase";
import bcrypt from 'bcryptjs'; // Asegúrate de instalarla con npm install bcryptjs
import { saveSession, clearSession } from "../lib/session"; // Asegúrate que la ruta sea correcta


export default function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        if (!email.trim()) {
            setErrorMsg("Por favor ingresa tu correo electrónico.");
            return;
        }

        if (!password.trim()) {
            setErrorMsg("Por favor ingresa tu contraseña.");
            return;
        }

        setLoading(true);
        setErrorMsg("");

        try {
            const { data, error } = await supabase
                .from("proveedores")
                .select("*")
                .eq("correo_proveedor", email.toLowerCase().trim())
                
                .single();

            if (error || !data) {
                await clearSession(); // Limpia sesión si hay error
                setErrorMsg(error?.code === 'PGRST116' ? "Correo no encontrado." : "Error al conectarse a la base de datos.");
                return;
            }

            if (!data) {
                setErrorMsg("Correo no encontrado.");
                return;
            }

            // Comprobación segura del hash
            const passwordMatch = await bcrypt.compare(password, data.password_hash);

            if (!passwordMatch) {
                setErrorMsg("Contraseña incorrecta.");
                return;
            }

            // Login exitoso
            console.log("Inicio de sesión exitoso:", data);
            await saveSession(data); // Guarda los datos del proveedor

            //
            console.log("Datos del proveedor:", {
                id_proveedor: data.id_proveedor, // Verifica este campo
                ...data
            });
            await saveSession(data);

            setEmail("");
            setPassword("");
            setErrorMsg("");
            onLoginSuccess?.(data);

        } catch (err) {
            await clearSession();
            console.error("Error inesperado:", err);
            setErrorMsg("Ocurrió un error inesperado. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={style.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />

            <Text style={style.Titulo}>Hola</Text>
            <Text style={style.Text}>Bienvenido a Luixa :)</Text>

            <TextInput
                placeholder="ejemplo@email.com"
                style={style.textinput}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
                editable={!loading}
            />

            <TextInput
                placeholder="Contraseña"
                secureTextEntry
                style={style.textinput}
                value={password}
                onChangeText={(text) => setPassword(text)}
                editable={!loading}
            />

            {errorMsg ? <Text style={style.errorText}>{errorMsg}</Text> : null}

            <TouchableOpacity
                style={[style.button, loading && style.buttonDisabled]}
                onPress={login}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={style.buttonText}>Iniciar sesión</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Titulo: {
        fontSize: 60,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    Text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 30,
    },
    textinput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        width: '80%',
        height: 50,
        marginTop: 10,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        marginTop: 30,
        minWidth: 150,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#95a5a6',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 15,
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});