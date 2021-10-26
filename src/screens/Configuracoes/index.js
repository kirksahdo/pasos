import React from 'react';
import { View, Text, Image, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';

import Firebase from '../../config/firebase.config';
import background from '../../../assets/white-background.png';
import iconeEditarPerfil from '../../../assets/icone-editar-perfil.png'
import iconeGeral from '../../../assets/icone-geral.png'
import iconeNotificacoes from '../../../assets/icone-notificacoes.png'
import iconeSugestoes from '../../../assets/icone-sugestoes.png'
import iconeSair from '../../../assets/icone-sair.png'


import styles from './styles';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

const Configuracoes = ({navigation}) => (
    <ImageBackground source={background} style={styles.background}>
        <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
        <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConfiguracoesEditarPerfil')} >
                <View style={styles.icone} >
                    <Image source={iconeEditarPerfil} />
                </View>
                <Text style={styles.buttonLabel}>Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConfiguracoesGeral')}>
                <View style={styles.icone} >
                    <Image source={iconeGeral} />
                </View>
                <Text style={styles.buttonLabel}>Geral</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConfiguracoesNotificacoes')}>
                <View style={styles.icone} >
                    <Image source={iconeNotificacoes} />
                </View>
                <Text style={styles.buttonLabel}>Notificações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConfiguracoesSugestoes')}>
                <View style={styles.icone} >
                    <Image source={iconeSugestoes} />
                </View>
                <Text style={styles.buttonLabel}>Fazer Sugestões</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Configuracoes'}]
                    });
                    Firebase.auth().signOut();
                }}>
                <View style={styles.icone} >
                    <Image source={iconeSair} />
                </View>
                <Text style={styles.buttonLabel}>Sair</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
);


export default Configuracoes;
