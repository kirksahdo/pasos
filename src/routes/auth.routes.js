import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';

const Stack = createNativeStackNavigator();

const AuthRoutes = ({login}) => {


    return(
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Login' >
                {props => <Login {...props} login={login} />}
            </Stack.Screen>
            <Stack.Screen name='Cadastro' component={Cadastro} />
        </Stack.Navigator>
    )

}

export default AuthRoutes;