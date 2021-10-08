import React from 'react';
import {Image, View} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Cadastro from '../screens/Cadastro';
import Login from '../screens/Login';
import ConfigRoutes from './config.routes';

import iconeInicio from './../../assets/icone-inicio.png'
import iconeInicioAtivo from './../../assets/icone-inicio-ativo.png'
import iconeEstatisticas from './../../assets/icone-estatisticas.png'
import iconeEstatisticasAtivo from './../../assets/icone-estatisticas-ativo.png'
import iconeCrise from './../../assets/icone-crise.png'
import iconeCriseAtivo from './../../assets/icone-crise-ativo.png'
import iconePerfil from './../../assets/icone-perfil.png'
import iconePerfilAtivo from './../../assets/icone-perfil-ativo.png'
import iconeConfiguracoes from './../../assets/icone-configuracoes.png'
import iconeConfiguracoesAtivo from './../../assets/icone-configuracoes-ativo.png'

const Tab = createBottomTabNavigator();

const AppRoutes = () => (
    <Tab.Navigator initialRouteName='Configuracoes' 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let image;

            if (route.name === 'Inicio') {
                image = focused ? iconeInicioAtivo : iconeInicio;
            } else if (route.name === 'Estatisticas') {
                image = focused ? iconeEstatisticasAtivo : iconeEstatisticas;
            } else if (route.name === 'Crise') {
                image = focused ? iconeCriseAtivo : iconeCrise;
                return <Image source = {image} style = { {marginBottom: 16} }/>;
            } else if (route.name === 'Perfil') {
                image = focused ? iconePerfilAtivo : iconePerfil;
            } else if (route.name === 'Configuracoes') {
                image = focused ? iconeConfiguracoesAtivo : iconeConfiguracoes;
            }

            // You can return any component that you like here!
            return <Image source = {image} />;
            },
            tabBarShowLabel: false,
            tabBarStyle: { height: 60, borderTopLeftRadius: 40 },
            headerShown: false,
            tabBarBackground: () => (
                <View style = {{backgroundColor: '#fff', height: '100%', borderTopLeftRadius: 10}} />
            ),
            tabBarVisibilityAnimationConfig:true
        })}
        >
        <Tab.Screen name='Inicio' component={Cadastro}/>
        <Tab.Screen name='Estatisticas' component={Login}/>
        <Tab.Screen name='Crise' component={Cadastro}/>
        <Tab.Screen name='Perfil' component={Login}/>
        <Tab.Screen name='Configuracoes' component={ConfigRoutes}/>
    </Tab.Navigator>
)

export default AppRoutes;