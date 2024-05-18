import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Divider, Button } from 'react-native-paper';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'

const RequestaQuote = () => {
    const [fullname, setFullname] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSend = () => {
        if (fullname && contactNumber && message) {
            if (contactNumber.length !== 10) {
                Alert.alert('Error', 'Por favor ingresa un número de contacto válido');
                return;
            }
            firestore().collection('Solicitud Cotización').add({
                fullname: fullname,
                contactNumber: contactNumber,
                message: message,
            }).then(() => {
                Alert.alert('Mensaje enviado', 'Tu mensaje ha sido enviado correctamente');
                setFullname('');
                setContactNumber('');
                setMessage('');
            }).catch((error) => {
                console.error("Error al enviar el mensaje:", error);
                Alert.alert('Error', 'Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente.');
            });
        } else {
            Alert.alert('Error', 'Por favor completa todos los campos');
        }
    };

    return (
        <ScrollView>
            <TextInput
                label="Nombre y Apellido"
                placeholder='Campo obligatorio'
                value={fullname}
                onChangeText={setFullname}
            />
            <Divider />
            <TextInput
                label="Número de contacto"
                placeholder='Campo obligatorio'
                value={contactNumber}
                keyboardType='numeric'
                onChangeText={(text) => {
                    if (text.length <= 10) {
                        setContactNumber(text);
                    }
                }}
            />
            <Divider />
            <TextInput
                label="Deja aquí tu mensaje"
                placeholder='Campo obligatorio'
                value={message}
                multiline={true}
                onChangeText={setMessage}
            />
            <Divider />
            <Button icon="camera" mode="contained" onPress={handleSend}>
                Enviar información
            </Button>
        </ScrollView>
    );
};

export default RequestaQuote;
