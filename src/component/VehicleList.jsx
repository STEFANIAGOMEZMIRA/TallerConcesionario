import React from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { useCatalogData, useIsLoading, useSearchVehicle } from '../vehicleContext/vehicleContext';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import TopBar from './TopBar';

const VehicleList = () => {
    const data = useCatalogData();
    const loading = useIsLoading();
    const searchVehicle = useSearchVehicle();

    const [selectedVehicles, setSelectedVehicles] = React.useState({});

    const handleAdd = (item) => {
        setSelectedVehicles({
            ...selectedVehicles,
            [item.id]: (selectedVehicles[item.id] || 0) + 1,
        });
    };

    const handleRemove = (item) => {
        if (selectedVehicles[item.id] > 0) {
            setSelectedVehicles({
                ...selectedVehicles,
                [item.id]: selectedVehicles[item.id] - 1,
            });
        }
    };

    const totalPrice = Object.keys(selectedVehicles).reduce((total, key) => {
        const quantity = selectedVehicles[key];
        const vehicle = data.find(item => item.id === key);
        return total + (quantity * vehicle.price);
    }, 0);

    const renderItem = ({ item }) => {
        const quantity = selectedVehicles[item.id] || 0;

        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text>{item.description}</Text>
                    <Text>Precio: ${item.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <Button title="+" onPress={() => handleAdd(item)} color="#007bff" />
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <Button title="-" onPress={() => handleRemove(item)} color="#007bff" disabled={quantity === 0} />
                </View>
            </View>
        );
    };

    return (
        <TopBar>
        <View style={{ flex: 1 }}>
            {loading ? <ActivityIndicator animating={true} color={MD2Colors.red500} size={100} /> : null}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${totalPrice}</Text>
            </View>
           
        </View>
        </TopBar>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 150, 
        height: 150, 
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        padding: 10,
    },
});

export default VehicleList;
