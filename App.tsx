import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './src/component/Menu';
import SearchScreen from './src/component/Catalogo';
import TestDriveScreen from './src/component/Pruebamanejo';
import ContactScreen from './src/component/Contact';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="TestDrive" component={TestDriveScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
