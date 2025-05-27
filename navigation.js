// navigation.js
import React from "react";
import { StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Pantallas
import Home_screen from "./Pantallas/HomeScreen";
import Pedidos from "./Pantallas/Pedidos";
import Clientes from "./Pantallas/Clientes";
import Inventario from "./Pantallas/Inventario";
import Clientes_view from "./Pantallas/Clientes_view";
import Clientes_agregar from "./Pantallas/Clientes_agregar";

const HomeStackNavigator = createNativeStackNavigator();

function Mystack({ userData }) {
    return (
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen
                name="Clientes_view"
                component={Clientes_view}
            />
            <HomeStackNavigator.Screen
                name="Clientes_agregar"
                component={Clientes_agregar}
            />
        </HomeStackNavigator.Navigator>
    );
}

const ClientesStack = createNativeStackNavigator();

function ClientesNavigator({ userData }) {
    return (
        <ClientesStack.Navigator>
            <ClientesStack.Screen
                name="Clientes"
                component={Clientes}
                options={{ headerShown: false }}
            />
            <ClientesStack.Screen
                name="Clientes_view"
                component={Clientes_view}
                styles={styles.headerTitle}
                options={{
                    headerTitle: "Clientes registrados",
                    headerBackTitleVisible: false
                }}
            />
            <ClientesStack.Screen
                name="Clientes_agregar"
                component={Clientes_agregar}
                styles={styles.headerTitle}
                options={{
                    headerTitle: "Agregar clientes",
                    headerBackTitleVisible: false
                }}
            />
        </ClientesStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function Mytabs({ userData }) {
    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={{
                tabBarActiveTintColor: 'blue',
            }}
        >
            <Tab.Screen
                name="Inicio"
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" color={color} size={24} />
                    ),
                    headerShown: false,
                }}
            >
                {(props) => <Home_screen {...props} userData={userData} />}
            </Tab.Screen>
            <Tab.Screen
                name="Pedidos"
                options={{
                    tabBarLabel: 'Pedidos',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="edit-note" size={24} color={color} />
                    ),
                    headerShown: false,
                }}
            >
                {(props) => <Pedidos {...props} userData={userData} />}
            </Tab.Screen>
            <Tab.Screen
                name="Clientes"
                options={{
                    tabBarLabel: 'Clientes',
                    tabBarIcon: ({ color }) => (
                        <Feather name="users" size={24} color={color} />
                    ),
                    headerShown: false,
                }}
            >
                {(props) => <ClientesNavigator {...props} userData={userData} />}
            </Tab.Screen>
            <Tab.Screen
                name="Inventario"
                options={{
                    tabBarLabel: 'Inventario',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="inventory" size={24} color={color} />
                    ),
                    headerShown: false,
                }}
            >
                {(props) => <Inventario {...props} userData={userData} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

// Recibe userData como prop y lo pasa a Mytabs
export default function Navigation({ userData }) {
    return <Mytabs userData={userData} />;
}

const styles = StyleSheet.create({
    headerTitle: {
        textAlign: 'center',
    },
});