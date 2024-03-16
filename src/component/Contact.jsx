import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';


const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (name && email && message) {
      Alert.alert('Mensaje enviado', 'Tu mensaje ha sido enviado correctamente');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos');
    }
  };

  return (
    <View>
      <Text>Contacto</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
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

export default Contact;
