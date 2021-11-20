import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Estatisticas from '../screens/Estatisticas';
import DiaEspecifico from '../screens/DiaEspecifico';

import {ProcessDashboardContextProvider} from '../context/dashboard.context'

const Stack = createNativeStackNavigator();

const EstatisticasRoutes = () => (
    <ProcessDashboardContextProvider>
        <Stack.Navigator initialRouteName='EstatisticasInicio' screenOptions={{headerShown:false}}>
            <Stack.Screen name='EstatisticasInicio' component={Estatisticas} />
            <Stack.Screen name='DiaEspecifico' component={DiaEspecifico} />
        </Stack.Navigator>
    </ProcessDashboardContextProvider>
);

export default EstatisticasRoutes;