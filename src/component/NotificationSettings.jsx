import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const NotificationSettings = () => {
  const [receiveNotifications, setReceiveNotifications] = useState(false);

  const toggleNotifications = () => {
    setReceiveNotifications(!receiveNotifications);
  };

  const saveSettings = () => {
    firestore()
      .collection('notificationSettings')
      .add({
        receiveNotifications: receiveNotifications,
        timestamp: firestore.FieldValue.serverTimestamp() // Guarda la fecha y hora de la configuración
      })
      .then(() => {
        Alert.alert('Configuración guardada', 'Tu configuración de notificaciones ha sido guardada correctamente');
      })
      .catch((error) => {
        console.error('Error al guardar la configuración de notificaciones:', error);
        Alert.alert('Error', 'Ocurrió un error al guardar la configuración. Por favor, intenta nuevamente.');
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Checkbox.Item
          label="Recibir notificaciones sobre ofertas especiales y promociones"
          status={receiveNotifications ? 'checked' : 'unchecked'}
          onPress={toggleNotifications}
        />

        <Button icon="content-save" mode="contained" onPress={saveSettings}>Guardar</Button>
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
});

export default NotificationSettings;
