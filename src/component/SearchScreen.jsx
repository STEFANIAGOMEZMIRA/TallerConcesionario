import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { useSearchVehicle } from '../vehicleContext/vehicleContext';
import { useState } from 'react';
import DialogAlert from './DialogAlert';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  //Estados para mostrar el helper
  const [customHelperMessage, setCustomHelperMessage] = useState('')
  //Estados para la barra de búsqueda
  const [carInformation, setCarInformation] = useState(null)

  //Estado para mostrar el activity indicator
  const [visible, setVisible] = useState(false)

  //Función para buscar vehículos
  const searchVehicle = useSearchVehicle();
  const [isLoadingData, setIsLoadingData] = useState(false)

  const renderItem = ({ item }) => (
    <Vehicle
        key={item.id}
        imageUrl={item.imageUrl}
        description={item.description}
        price={item.price}
    />
  );

  return (
    <>
      <Searchbar
        placeholder="Busca por marca, año, modelo o precio"
        onChangeText={(query) => {
          setSearchQuery(query)
        }}
        value={searchQuery}
        onSubmitEditing={() => {
          if (searchQuery.length <= 0) {
            setVisible(true)
            setCustomHelperMessage("¡No deje el campo de búsqueda vacío!")
          } else if (/^\s*$/.test(searchQuery)) {
            setVisible(true)
            setCustomHelperMessage("¡No escriba solo espacios!")
            setSearchQuery('')
          } else if (searchQuery.length <= 2) {
            setVisible(true)
            setCustomHelperMessage("¡Escriba al menos 3 caracteres!")
          } else if (/^\s/.test(searchQuery) || /\s$/.test(searchQuery) || /\s{2,}/.test(searchQuery)) {
            setSearchQuery(searchQuery.trim().replace(/\s{2,}/g, ' '))
            searchVehicle(keyword = searchQuery.trim().replace(/\s{2,}/g, ' '), setVehicles = setCarInformation, showActivity = setIsLoadingData)
          } else {
            searchVehicle(keyword = searchQuery, setVehicles = setCarInformation, showActivity = setIsLoadingData)
          }
        }}
      />
        {isLoadingData ? <ActivityIndicator animating={true} color={MD2Colors.deepPurple500} size={100} style={{ paddingTop: 100 }} /> : (carInformation && carInformation.length >= 1) ? [...carInformation].map((vehicle) => (
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 10 }}>
                Mi catálogo
            </Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
        )) : carInformation ? <View style={{ padding: 20, paddingTop: 0, flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text variant="headlineSmall" style={{ textAlign: "center" }}>¡No se encontraron resultados para su búsqueda!</Text>
        </View> : null}
      {visible && <DialogAlert alertMessage={customHelperMessage} changeVisibility={setVisible} />}
    </>
  );
};

export default SearchScreen;