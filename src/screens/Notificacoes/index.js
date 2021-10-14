import React, { Component } from 'react';
import { Text, View, StatusBar, ImageBackground, TouchableOpacity, Image } from 'react-native';

import background from '../../../assets/background.png';
import setaesquerda from '../../../assets/seta-esquerda-preta.png';
import iconeVolume from '../../../assets/icone-volume.png'

import styles from './styles';

class Notificacoes extends Component {

    render() {
        return (
            <ImageBackground source={background} style={styles.background}>

                <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>NOTIFICAÇÕES</Text>
                    </View>
                    <TouchableOpacity style={styles.button} >
                        <View style={styles.icone} >
                            <Image source={iconeVolume} />
                        </View>
                        <Text style={styles.buttonLabel}>NOTIFICAÇÕES</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.setaEsquerda} onPress={() => this.props.navigation.goBack()}>
                    <Image source={setaesquerda} />
                </TouchableOpacity>
            </ImageBackground>
        );
    };

}

export default Notificacoes;