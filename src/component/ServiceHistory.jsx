import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, DataTable } from 'react-native-paper';

const ServiceHistory = () => {
  const [customerId, setCustomerId] = useState('');
  const [serviceHistory, setServiceHistory] = useState([]);

  const buscarHistorial = () => {
    // Aquí iría la lógica para buscar el historial de servicios por cliente
    // Por ejemplo, podrías hacer una petición a una API
    // y luego actualizar el estado `serviceHistory` con los datos obtenidos
    // Este es solo un ejemplo simplificado

    if (!customerId) {
      Alert.alert('Campo obligatorio', 'Por favor ingresa el ID del cliente.');
      return;
    }

    
    const dummyServiceHistory = [
      { id: 1, date: '2024-04-01', description: 'Cambio de aceite' },
      { id: 2, date: '2024-03-15', description: 'Reparación de frenos' },
      { id: 3, date: '2024-02-10', description: 'Mantenimiento preventivo' },
    ];

    setServiceHistory(dummyServiceHistory);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={customerId}
          onChangeText={setCustomerId}
          label="ID del cliente"
          keyboardType="numeric"
          right={<TextInput.Icon icon="account" />}
        />

        <Button icon="search-web" mode="contained" onPress={buscarHistorial}>Buscar historial</Button>

        {serviceHistory.length > 0 && (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title>Fecha</DataTable.Title>
              <DataTable.Title>Descripción</DataTable.Title>
            </DataTable.Header>

            {serviceHistory.map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>{item.id}</DataTable.Cell>
                <DataTable.Cell>{item.date}</DataTable.Cell>
                <DataTable.Cell>{item.description}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#EEEEEE',
  },
  input: {
    marginBottom: 23,
    paddingHorizontal: 12,
  },
});

export default ServiceHistory;
