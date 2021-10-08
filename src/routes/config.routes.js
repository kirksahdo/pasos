import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Configuracoes from '../screens/Configuracoes';
import EditarPerfil from '../screens/EditarPerfil';

const Stack = createNativeStackNavigator();

const ConfigRoutes = () => (
    <Stack.Navigator initialRouteName='ConfiguracoesInicio' screenOptions={{headerShown: false}} >
        <Stack.Screen name='ConfiguracoesInicio' component={Configuracoes} />
        <Stack.Screen name='ConfiguracoesEditarPerfil' component={EditarPerfil} />
    </Stack.Navigator>
);


export default ConfigRoutes;