import React from 'react';
import { Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Cadastro from '../screens/Cadastro';
import Login from '../screens/Login';
import ConfigRoutes from './config.routes';
import CriseRoutes from './crise.routes';
import Perfil from '../screens/Perfil';

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

                switch (route.name) {
                    case 'Inicio':
                        image = focused ? iconeInicioAtivo : iconeInicio;
                        break;
                    case 'Estatisticas':
                        image = focused ? iconeEstatisticasAtivo : iconeEstatisticas;
                        break;
                    case 'Crise':
                        image = focused ? iconeCriseAtivo : iconeCrise;
                        return <Image source={image} style={{ marginBottom: 16 }} />;
                    case 'Perfil':
                        image = focused ? iconePerfilAtivo : iconePerfil;
                        break;
                    case 'Configuracoes':
                        image = focused ? iconeConfiguracoesAtivo : iconeConfiguracoes;
                        break;
                        

                }

                // You can return any component that you like here!
                return <Image source={image} />;
            },
            tabBarShowLabel: false,
            tabBarStyle: { height: 60, borderTopLeftRadius: 15, borderTopRightRadius: 15, position: 'absolute' },
            headerShown: false,
            tabBarVisibilityAnimationConfig: true,
            tabBarHideOnKeyboard: true
        })}
    >
        <Tab.Screen name='Inicio' component={Cadastro} />
        <Tab.Screen name='Estatisticas' component={Login} />
        <Tab.Screen name='Crise' component={CriseRoutes} />
        <Tab.Screen name='Perfil' component={Perfil} />
        <Tab.Screen name='Configuracoes' component={ConfigRoutes} />
    </Tab.Navigator>
)

export default AppRoutes;