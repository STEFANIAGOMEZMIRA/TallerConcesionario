// Menu.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Menu = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido a la Concesionaria de Vehículos!</Text>
        <Text style={styles.subtitle}>Selecciona una opción:</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Catalog')}
        >
          <Text style={styles.optionText}>Catalogo de Vehículos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.optionText}>Buscar Vehículos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('TestDrive')}

        >

          <Text style={styles.optionText}>Solicitud de prueba de manejo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('RequestaQuote')}
        >
          <Text style={styles.optionText}>Solicitar cotización</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('WorkshopServic')}
        >
          <Text style={styles.optionText}>Servicio de taller</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ServiceHistory')}
        >
          <Text style={styles.optionText}>Historial de servicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('NotificationSettings')}
        >
          <Text style={styles.optionText}>Ofertas y promociones</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Contact')}
        >
          <Text style={styles.optionText}>Contacto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'right',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#e76aa9',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Menu;
