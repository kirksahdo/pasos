import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Configuracoes from '../screens/Configuracoes';
import EditarPerfil from '../screens/EditarPerfil';
import Geral from '../screens/Geral';
import Notificacoes from '../screens/Notificacoes';
import Sugestoes from '../screens/Sugestoes';

const Stack = createNativeStackNavigator();

const ConfigRoutes = () => (
    <Stack.Navigator initialRouteName='ConfiguracoesInicio' screenOptions={{headerShown: false}} >
        <Stack.Screen name='ConfiguracoesInicio' component={Configuracoes} />
        <Stack.Screen name='ConfiguracoesEditarPerfil' component={EditarPerfil} />
        <Stack.Screen name='ConfiguracoesGeral' component={Geral} />
        <Stack.Screen name='ConfiguracoesNotificacoes' component={Notificacoes} />
        <Stack.Screen name='ConfiguracoesSugestoes' component={Sugestoes} />
    </Stack.Navigator>
);


export default ConfigRoutes;