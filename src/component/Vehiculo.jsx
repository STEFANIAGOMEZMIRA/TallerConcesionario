import React from "react"
import { View, StyleSheet, Image, Text, ScrollView } from "react-native"

const Vehiculo = ({ imageUrl, description, price }) => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.img}
                    source={{ uri: imageUrl }}
                />
                <Text style={styles.title}>{description}</Text>
                <Text style={[styles.title, styles.price]}>$ {price}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    img: {
        width: 300,
        height: 300,
        marginBottom: 10,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 5,
    },
    price: {
        fontSize: 20,
        color: 'green',
    },
})

export default Vehiculo;
