import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Vehicle from './Vehicle';
import { useCatalogData, useIsLoading } from '../vehicleContext/vehicleContext';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const VehicleList = () => {
    const data = useCatalogData();
    const loading = useIsLoading();
    const renderItem = ({ item }) => (
        <Vehicle
            key={item.id}
            imageUrl={item.imageUrl}
            description={item.description}
            price={item.price}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            {loading ? <ActivityIndicator animating={true} color={MD2Colors.red500} size={100} /> : null}
            <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 10 }}>
                Catalogo los chatarrudos
            </Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default VehicleList;
