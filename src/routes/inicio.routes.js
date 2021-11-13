import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from '../screens/Inicio';
import PreQuestionario from '../screens/PreQuestionario';
import Questionario from '../screens/Questionario';
import AdicionarEvento from '../screens/AdicionarEvento';

const Stack = createNativeStackNavigator();

const InicioRoutes = () => (
    <Stack.Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false }} >
        <Stack.Screen name='Dashboard' component={Inicio} />
        <Stack.Screen name="PreQuestionario" component={PreQuestionario} />
        <Stack.Screen name="Questionario" component={Questionario} />
        <Stack.Screen name="AdicionarEvento" component={AdicionarEvento} />
    </Stack.Navigator>
);


export default InicioRoutes;