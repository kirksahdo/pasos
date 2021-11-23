import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Configuracoes from '../screens/Configuracoes';
import EditarPerfil from '../screens/EditarPerfil';
import Sugestoes from '../screens/Sugestoes';

const Stack = createNativeStackNavigator();

const ConfigRoutes = () => (
    <Stack.Navigator initialRouteName='ConfiguracoesInicio' screenOptions={{headerShown: false}} >
        <Stack.Screen name='ConfiguracoesInicio' component={Configuracoes} />
        <Stack.Screen name='ConfiguracoesEditarPerfil' component={EditarPerfil} />
        <Stack.Screen name='ConfiguracoesSugestoes' component={Sugestoes} />
    </Stack.Navigator>
);


export default ConfigRoutes;