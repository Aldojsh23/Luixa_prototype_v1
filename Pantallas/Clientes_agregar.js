//Esta hoja nos ayuda a crear los usuarios

import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Clientes_agregar = () => {

    const [selectedState, setSelectedState] = useState(""); // Estado para almacenar la selección

    return (

        <View style={styles.container}>
            <Text style={styles.titulo}>Nuevo cliente</Text>

            <TextInput
                style={styles.textInput}
                placeholder="Nombres del cliente"
            />

            <TextInput
                style={styles.textInput}
                placeholder="Apellido paterno"
            />

            <TextInput
                style={styles.textInput}
                placeholder="Apellido materno"
            />

            <TextInput
                style={styles.textInput}
                placeholder="Alias del cliente"
            />

            <TextInput
                style={styles.textInput}
                placeholder="Número de teléfono"
                
            />

            {/* Contenedor con estilos de TextInput para el Picker */}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedState}
                    onValueChange={(itemValue) => setSelectedState(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="gray" // Color del ícono desplegable
                >
                    <Picker.Item label="Selecciona un estado" value="" />
                    <Picker.Item label="México" value="mexico" />
                    <Picker.Item label="Tlaxcala" value="tlaxcala" />
                    <Picker.Item label="Puebla" value="puebla" />
                    <Picker.Item label="Jalisco" value="jalisco" />
                </Picker>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },

    titulo: {
        fontSize: 30,
        padding: 20,
    },

    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        marginTop: 20,
        height: 50,

    },

    // Contenedor del Picker con borde
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        width: '80%',
        marginTop: 20,
        //backgroundColor: "#fff",
        overflow: "hidden" // Evita que el picker sobresalga
    },

    // Picker sin estilos de borde, ya que se aplican al contenedor
    picker: {
        width: "100%",
        height: 50,
        color: "black", // Color del texto dentro del Picker
    }

});

export default Clientes_agregar;