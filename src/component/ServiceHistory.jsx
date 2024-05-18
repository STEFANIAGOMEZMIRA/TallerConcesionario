import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native'; 
import { Button, TextInput, Title, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ServiceHistory = () => {
  const [customerId, setCustomerId] = useState('');
  const [serviceHistory, setServiceHistory] = useState(null);

  const buscarHistorial = async () => {
    if (!customerId) {
      Alert.alert('Campo obligatorio', 'Por favor ingresa el ID del cliente.');
      return;
    }

    try {
      let dataFind = false;
      const data = await firestore().collection('ServiceHistory').get();
      for (let i = 0; i < data.docs.length; i++) {
        if (data.docs[i].id === customerId) {
          setServiceHistory([{ id: data.docs[i].id, ...data.docs[i].data() }]);
          dataFind = true;
          break;
        }
      }
      if (!dataFind) {
        setServiceHistory(null);
      }
    } catch (error) {
      console.error('Error al buscar historial:', error);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
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

        {serviceHistory ? (
          <View style={styles.historyContainer}>
            {serviceHistory.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyText}><Text style={styles.bold}>ID:</Text> {item.id}</Text>
                <Text style={styles.historyText}><Text style={styles.bold}>Fecha:</Text> {item.date}</Text>
                <Text style={styles.historyText}><Text style={styles.bold}>Descripción:</Text> {item.Descripción}</Text>
              </View>
            ))}
          </View>
        ) : <Text style={styles.noResultsText}>No se encontraron resultados</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#FFFFFF',
    minHeight: Dimensions.get('window').height,
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
  historyContainer: {
    marginTop: 20,
  },
  historyItem: {
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },
  historyText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  noResultsText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ServiceHistory;
