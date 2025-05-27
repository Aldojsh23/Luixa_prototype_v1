//Esta pantalla es para la creación de un nuevo usuario

import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, ScrollView } from 'react-native';

const Clientes_view = () => {

    //Se definen los datos que se importan de la base de datos
    const [clientesItems, setClientesItems] = useState([
        { id: '1', nombre: 'Aldo Santamaria', alias: 'El aldo', telefono: '7491142375', date_create: '10/20/1999', estado_cliente: 'Tlaxcala' },
    ]);

    //Renderizado del encabezado de la tabla
    const TableHeader = () => (
        <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Nombre</Text>
            <Text style={styles.headerCell}>Alias</Text>
            <Text style={styles.headerCell}>Telefono</Text>
            <Text style={styles.headerCell}>Fecha</Text>
            <Text style={styles.headerCell}>Estado</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.nombre}</Text>
            <Text style={styles.cell}>{item.alias}</Text>
            <Text style={styles.cell}>{item.telefono}</Text>
            <Text style={styles.cell}>{item.date_create}</Text>
            <Text style={styles.cell}>{item.estado_cliente}</Text>
        </View>
    );


    return (

        <SafeAreaView style={styles.container}>

            <ScrollView  >
                <ScrollView horizontal={true}>


                    <View style={styles.tableContainer}>
                        <TableHeader />
                        <FlatList
                            data={clientesItems}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            nestedScrollEnabled={true} // Para permitir scroll dentro de ScrollView
                            style={{ height: 300 }} // Evita problemas de renderizado
                        />
                    </View>
                </ScrollView>

            </ScrollView>

        </SafeAreaView>
    );



}

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
});

export default Clientes_view;