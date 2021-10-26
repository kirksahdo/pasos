import React, { Component } from 'react';
import { Text, View, StatusBar, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';

import background from '../../../assets/background.png';
import setaesquerda from '../../../assets/seta-esquerda-preta.png';
import iconeVolume from '../../../assets/icone-volume.png'

import moment from 'moment';
import 'moment/locale/pt-br';

import styles from './styles';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

class DiaEspecifico extends Component {

    state = {
        atividades: [{
            id: 1,
            nome: 'Desafio 1',
            tipo: 'Desafio',
            cumprido: true
        },{
            id: 2,
            nome: 'Questionário',
            tipo: 'Questionario',
            cumprido: true
        },{
            id: 3,
            nome: 'Treino Físico',
            tipo: 'Treino',
            cumprido: true
        },
        {
            id: 4,
            nome: 'Rotina Alimentar',
            tipo: 'Rotina Alimentar',
            cumprido: true
        }]
    }

    render() {
        const date = moment(this.props.route.params.date, 'YYYY-MM-DD');
        return (
            <ImageBackground source={background} style={styles.background}>
                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>{moment(date).format('DD[  de  ]MMMM')}</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        this.state.atividades.map( item => (
                            <TouchableOpacity style={[styles.button, item.cumprido?styles.conclused:styles.notConclused]} key={item.id}>
                                <View style={styles.icone} >
                                    <Image source={iconeVolume} />
                                </View>
                                <Text style={[styles.buttonLabel, item.cumprido?styles.conclused:styles.notConclused, {backgroundColor:'transparent'} ]}>{item.nome}</Text>
                            </TouchableOpacity>
                        ) )
                    }
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 2}}>
                            <View style={[styles.circle, {backgroundColor: '#000'}]} />
                            <Text style={styles.labelLegenda}> Atividade Cumprida</Text>
                        </View>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 2}}>
                            <View style={[styles.circle, {backgroundColor: '#fff'}]} />
                            <Text style={styles.labelLegenda}> Atividade Não Cumprida</Text>
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.setaEsquerda} onPress={() => this.props.navigation.goBack()}>
                    <Image source={setaesquerda} />
                </TouchableOpacity>
            </ImageBackground>
        );
    };

}

export default DiaEspecifico;