import React from 'react'
import { Text } from 'react-native-paper'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import {useNavigation} from '@react-navigation/native';

const BottomBar = props => {
    
    const navigation = useNavigation();

  return (
    <>
        <View style={{flex: 1}}>
            <View style={{alignItems: 'center'}}>
                <Text variant="titleLarge" onPress={() => navigation.navigate('Search')}>Buscar vehículo</Text>
                <Text variant="titleLarge" onPress={() => navigation.navigate('RequestaQuote')}>Solicitar cotización</Text>
                <Text variant="titleLarge" onPress={() => navigation.navigate('NotificationSettings')}>Ofertas y promociones</Text>
            </View>
            <View style={styles.childrenStyle}>{props.children}</View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    childrenStyle: {
        flex: 1,
        position: 'relative',
    },
    
});

export default BottomBar
