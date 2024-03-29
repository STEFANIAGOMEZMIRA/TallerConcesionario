import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './src/component/Menu';
import CatalogScreen from './src/component/Catalog';
import TestDriveScreen from './src/component/DrivingTest';
import ContactScreen from './src/component/Contact';
import SearchScreen from './src/component/SearchScreen';
import RequestaQuote from './src/component/RequestaQuote';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Catalog" component={CatalogScreen} />
        <Stack.Screen name="TestDrive" component={TestDriveScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="RequestaQuote" component={RequestaQuote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
