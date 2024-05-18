import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (name && email && phone && message) {
      if (!validateEmail(email)) {
        Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
        return;
      }
      if (!validatePhone(phone)) {
        Alert.alert('Error', 'Por favor ingresa un número de teléfono válido');
        return;
      }

  
      firestore().collection('Contacto').add({
          name: name,
          email: email,
          phone: phone,
          message: message,
        })
        .then(() => {
          Alert.alert('Mensaje enviado', 'Tu mensaje ha sido enviado correctamente');
          setName('');
          setEmail('');
          setPhone('');
          setMessage('');
        })
        .catch((error) => {
          console.error("Error al enviar el mensaje:", error);
          Alert.alert('Error', 'Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente.');
        });
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos');
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\d+$/;
    return re.test(phone);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Mensaje"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      <Button title="Enviar mensaje" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  messageInput: {
    height: 100,
  },
});

export default Contact;
