import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Clientes = () => {

    const navigation =useNavigation();

    return(
        <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%",
                    marginBottom: "10%"
                }}
            >Clientes</Text>

            {/* Ver clientes*/}
            <TouchableOpacity
                onPress={() => navigation.navigate("Clientes_view")}
                style={styles.button}
            >
                <Text style={styles.text}>Ver clientes</Text>

            </TouchableOpacity>  

            <TouchableOpacity
                onPress={() => navigation.navigate("Clientes_agregar")}
                style={styles.button}
            >
                <Text style={styles.text}>Agregar clientes</Text>
                
            </TouchableOpacity>          
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
    },

    button: {
      alignItems: 'center',
      margin: "10%",
      backgroundColor: "#2196F3",
      borderRadius: 15,
      padding: 10,
    },
    
    text:{
        fontSize: 20, 
        color: "#000", 
        textAlign: "center", 
        padding: 15,
    },
  });

export default Clientes;