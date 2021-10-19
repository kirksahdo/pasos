import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Estatisticas from '../screens/Estatisticas';
import DiaEspecifico from '../screens/DiaEspecifico';

const Stack = createNativeStackNavigator();

const EstatisticasRoutes = () => (
    <Stack.Navigator initialRouteName='EstatisticasInicio' screenOptions={{headerShown:false}}>
        <Stack.Screen name='EstatisticasInicio' component={Estatisticas} />
        <Stack.Screen name='DiaEspecifico' component={DiaEspecifico} />
    </Stack.Navigator>
);

export default EstatisticasRoutes;