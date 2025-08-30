//Esta pantalla es para la creación de un nuevo usuario

import React, { useState } from "react";
import { 
    StyleSheet, View, Text, FlatList, SafeAreaView, ScrollView 
} from 'react-native';

import { supabase } from "../lib/supabase";
import { getSession } from "../lib/session";

const Clientes_view = ({ route }) => {

    
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