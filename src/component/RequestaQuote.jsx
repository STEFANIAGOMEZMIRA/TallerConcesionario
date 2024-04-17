import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Divider, Button } from 'react-native-paper';
import { Alert } from 'react-native'

const RequestaQuote = () => {

    const [fullname, setFullname] = React.useState("");
    const [contactNumber, setContactNumber] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleSend = () => {
        if (fullname && contactNumber && message) {
            if (contactNumber.length !== 10) {
                Alert.alert('Error', 'Por favor ingresa un número de contacto válido');
                return;
            }
            Alert.alert('Mensaje enviado', 'Tu mensaje ha sido enviado correctamente');
            setFullname('');
            setContactNumber('');
            setMessage('');
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
                onChangeText={fullname => setFullname(fullname)}
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
                onChangeText={message => setMessage(message)}
            />

            <Divider />

            <Button icon="camera" mode="contained" onPress={handleSend}>
                Enviar información
            </Button>



        </ScrollView>
    )
}

export default RequestaQuote
