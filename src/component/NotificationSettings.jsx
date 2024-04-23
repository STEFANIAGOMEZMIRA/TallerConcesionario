// NotificationSettings.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';

const NotificationSettings = () => {
  const [receiveNotifications, setReceiveNotifications] = useState(false);

  const toggleNotifications = () => {
    setReceiveNotifications(!receiveNotifications);
  };

  const saveSettings = () => {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
      receiveNotifications: receiveNotifications
    }).then(() => {
      console.log('Configuración de notificaciones guardada:', receiveNotifications);
    }).catch(error => {
      console.error('Error al guardar la configuración de notificaciones:', error);
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
