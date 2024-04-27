import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Vehicle from './Vehicle'; 
import DialogAlert from './DialogAlert';
import { useSearchVehicle } from '../vehicleContext/vehicleContext';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customHelperMessage, setCustomHelperMessage] = useState('');
  const [carInformation, setCarInformation] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const searchVehicle = useSearchVehicle();

  const renderItem = ({ item }) => (
    <Vehicle
      key={item.id}
      imageUrl={item.imageUrl}
      description={item.description}
      price={item.price}
    />
  );

  const handleSearch = () => {
    if (searchQuery.trim().length === 0) {
      setCustomHelperMessage('¡No deje el campo de búsqueda vacío!');
      setVisible(true);
    } else if (searchQuery.trim().length < 3) {
      setCustomHelperMessage('¡Escriba al menos 3 caracteres!');
      setVisible(true);
    } else {
      setIsLoadingData(true);
      searchVehicle(
        searchQuery.trim(),
        setCarInformation,
        setIsLoadingData
      );
    }
  };

  return (
    <>
      <Searchbar
        placeholder="Busca por marca, año, modelo o precio"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        onSubmitEditing={handleSearch}
      />
      {isLoadingData ? (
        <ActivityIndicator
          animating={true}
          color="#6200EE"
          size="large"
          style={{ marginTop: 20 }}
        />
      ) : carInformation.length > 0 ? (
        <FlatList
          data={carInformation}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={{ padding: 20 }}>
          <Text style={{ textAlign: 'center' }}>
            ¡No se encontraron resultados para su búsqueda!
          </Text>
        </View>
      )}
      {visible && <DialogAlert alertMessage={customHelperMessage} changeVisibility={setVisible} />}
    </>
  );
};

export default SearchScreen;
