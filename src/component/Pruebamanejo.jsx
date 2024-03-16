import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const scheduledrivingtest = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setDate(formattedDate);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (selectedTime) => {
    const formattedTime = selectedTime.toTimeString().split(' ')[0];
    setTime(formattedTime);
    hideTimePicker();
  };

  const confirmarPrueba = () => {
    Alert.alert('Prueba programada', `Fecha: ${date}, Hora: ${time}`);
    
  };

  return (
    <View>
      <Text>Programar Prueba de Manejo</Text>
      <Button title="Seleccionar fecha" onPress={showDatePicker} />
      <Text>{date}</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      <Button title="Seleccionar hora" onPress={showTimePicker} />
      <Text>{time}</Text>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />

      <Button title="Confirmar Prueba" onPress={confirmarPrueba} />
    </View>
  );
};

export default scheduledrivingtest;
