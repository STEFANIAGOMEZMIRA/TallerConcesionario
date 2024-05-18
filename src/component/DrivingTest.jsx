import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerInput, registerTranslation, es, TimePickerModal } from 'react-native-paper-dates';
import firestore from '@react-native-firebase/firestore';
registerTranslation('es', es);

const DrivingTest = () => {
  const [date, setDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateTime, setDateTime] = useState('Click en el icono...');
  const [visible, setVisible] = useState(false)

  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      if (minutes < 10) minutes = '0' + minutes.toString();
      if (hours < 10) hours = '0' + hours.toString();
      setVisible(false);
      setDateTime('Hora: ' + hours + ':' + minutes);
    },
    [setVisible]
  );

  const enviarSolicitud = () => {
    if (!date || !fullName || !identificationNumber || !phoneNumber) {
      Alert.alert('Campos obligatorios', 'Por favor completa todos los campos.');
      return;
    }

    firestore().collection('Solicitud de prueba de manejo').add({
        date: date.toISOString(),
        fullName: fullName,
        identificationNumber: identificationNumber,
        phoneNumber: phoneNumber,
        email: email,
        dateTime: dateTime,
      })
      .then(() => {
        Alert.alert('Solicitud enviada', 'Tu solicitud de prueba de manejo ha sido enviada correctamente.');
        setDate('');
        setFullName('');
        setIdentificationNumber('');
        setPhoneNumber('');
        setEmail('');
        setDateTime('Click en el icono...');
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
        Alert.alert('Error', 'Ocurrió un error al enviar la solicitud. Por favor, intenta nuevamente.');
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <DatePickerInput
          locale="es"
          label="Seleccione la fecha de la cita"
          value={date}
          onChange={(d) => setDate(d)}
          inputMode="start"
          validRange={{ startDate: new Date(), endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 14) }}
        />

        <TextInput
          style={{ marginBottom: 23, marginTop: 23 }}
          value={dateTime === 'Click en el icono...' ? '' : dateTime.substring(6)}
          right={<TextInput.Icon icon="clock" onPress={() => setVisible(true)} />}
          editable={false}
          label={dateTime != 'Click en el icono...' ? 'Hora' : dateTime}
        />
        <TimePickerModal
          label='Selecciona la hora de la cita'
          locale="es"
          visible={visible}
          hours={new Date().getHours().toString()}
          minutes={new Date().getMinutes().toString()}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
        />

        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          label="Nombre y apellidos"
          right={<TextInput.Icon icon="account" />}
        />

        <TextInput
          style={styles.input}
          value={identificationNumber}
          onChangeText={setIdentificationNumber}
          label="Número de Identificación"
          keyboardType="numeric"
          right={<TextInput.Icon icon="identifier" />}
        />

        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          label="Número de celular"
          keyboardType="numeric"
          right={<TextInput.Icon icon="cellphone" />}
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          label="Correo electrónico (opcional)"
          right={<TextInput.Icon icon="email" />}
        />

        <Button icon="send" mode="contained" onPress={enviarSolicitud}>Enviar solicitud</Button>
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

export default DrivingTest;
