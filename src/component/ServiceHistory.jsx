import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, DataTable, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ServiceHistory = () => {
  const [customerId, setCustomerId] = useState('');
  const [serviceHistory, setServiceHistory] = useState([]);

  const buscarHistorial = async () => {
    if (!customerId) {
      Alert.alert('Campo obligatorio', 'Por favor ingresa el ID del cliente.');
      return;
    }

    try {
      const data = await firestore().collection('ServiceHistory').get();
      setServiceHistory(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error al buscar historial:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.title}>Historial de Servicios</Title>
        <TextInput
          style={styles.input}
          value={customerId}
          onChangeText={setCustomerId}
          label="ID del cliente"
          keyboardType="numeric"
          right={<TextInput.Icon name="account" />}
        />

        <Button icon="search-web" mode="contained" onPress={buscarHistorial}>Buscar historial</Button>

        {serviceHistory.length > 0 && (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>id</DataTable.Title>
              <DataTable.Title>date</DataTable.Title>
              <DataTable.Title>Descripción</DataTable.Title>
            </DataTable.Header>

            {serviceHistory.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.id}</DataTable.Cell>
                <DataTable.Cell>{item.date}</DataTable.Cell>
                <DataTable.Cell>{item.Descripción}</DataTable.Cell>
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
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginBottom: 23,
    paddingHorizontal: 12,
  },
});

export default ServiceHistory;
