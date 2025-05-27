import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, FlatList, SafeAreaView, ScrollView } from 'react-native';


const Inventario = () => {

    const [inventarioItems, setInventarioItems] = useState([
        { id: '1', nombre: 'Producto A', cantidad: 25, precio: 19.99, talla: 'Grande', categoria: 'Electrónica' },
        { id: '2', nombre: 'Producto B', cantidad: 15, precio: 29.99, categoria: 'Hogar' },
        { id: '3', nombre: 'Producto C', cantidad: 8, precio: 49.99, categoria: 'Electrónica' },
        { id: '4', nombre: 'Producto D', cantidad: 32, precio: 9.99, categoria: 'Oficina' },
        { id: '5', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '6', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '7', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '8', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '9', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '10', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '11', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '12', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '13', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '14', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '15', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '16', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },
        { id: '17', nombre: 'Producto E', cantidad: 12, precio: 39.99, categoria: 'Hogar' },


    ]);

    // Renderizado del encabezado de la tabla
    const TableHeader = () => (
        <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Nombre</Text>
            <Text style={styles.headerCell}>Cantidad</Text>
            <Text style={styles.headerCell}>Precio</Text>
            <Text style={styles.headerCell}>Talla</Text>
            <Text style={styles.headerCell}>Color</Text>
        </View>
    );


    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.nombre}</Text>
            <Text style={[styles.cell, styles.centeredCell]}>{item.cantidad}</Text>
            <Text style={[styles.cell, styles.centeredCell]}>€{item.precio}</Text>
            <Text style={styles.cell}>{item.talla}</Text>
            <Text style={styles.cell}>{item.categoria}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar backgroundColor="#f0f0f0" />

                <Text style={styles.title}>Inventario</Text>

                {/* Scroll lateral solo para la tabla */}
                <ScrollView horizontal={true} style={styles.tableContainer}>
                    <View>
                        <TableHeader />
                        <FlatList
                            data={inventarioItems}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            nestedScrollEnabled={true} // Para permitir scroll dentro de ScrollView
                            style={{ height: 300 }} // Evita problemas de renderizado
                        />
                    </View>
                </ScrollView>

                {/* Formulario de registro de productos */}
                <View style={styles.View_add_producto}>
                    <Text style={styles.titulo}>Agregar un producto</Text>

                    <TextInput style={styles.textInput} placeholder="Nombre del producto" />
                    <TextInput style={styles.textInput} placeholder="Cantidad" keyboardType="numeric" />
                    <TextInput style={styles.textInput} placeholder="Precio" keyboardType="numeric" />
                    <TextInput style={styles.textInput} placeholder="Talla" />
                    <TextInput style={styles.textInput} placeholder="Categoría" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        marginTop: "10%",
        marginBottom: 20,
        fontWeight: 'bold',
    },
    View_add_producto: {
        alignItems: 'center',
    },
    titulo: {
        fontSize: 25,
        padding: 20,
        textAlign: 'center',
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginHorizontal: 10,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
        minWidth: 600, // Para permitir el scroll horizontal
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 10,
        minWidth: 600, // Mantiene alineación con el header
    },
    cell: {
        flex: 1,
        padding: 5,
    },
    centeredCell: {
        textAlign: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        marginTop: 15,
        height: 50,
    },
});

export default Inventario;