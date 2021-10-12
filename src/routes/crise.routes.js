import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Crise from '../screens/Crise';
import ListaContatos from '../screens/ListaContatos';
import NovoContato from '../screens/NovoContato';

const Stack = createNativeStackNavigator();

const CriseRoutes = () => (
    <Stack.Navigator initialRouteName='CriseHome' screenOptions={{ headerShown: false }} >
        <Stack.Screen name='CriseHome' component={Crise} />
        <Stack.Screen name="ListaContato" component={ListaContatos} />
        <Stack.Screen name="AddContato" component={NovoContato} />
    </Stack.Navigator>
);


export default CriseRoutes;