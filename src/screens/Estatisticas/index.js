import React, {Component} from 'react';
import {View, Text, ImageBackground, ScrollView, StatusBar} from 'react-native';
import moment from 'moment'
import 'moment/locale/pt-br'

import Calendario from '../../components/Calendario';

import background from '../../../assets/white-background.png';

import styles from './styles';

class Estatisticas extends Component{

    getClickedDay = date => {
        this.props.navigation.push('DiaEspecifico', {date: date.format('YYYY-MM-DD')});
    }

    render(){
        return (
            <ImageBackground source={background} style={styles.background} >
                <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.texts}>
                        <Text style={styles.primaryText}> você está a </Text> 
                        <Text style={styles.secondaryText}> xx dias</Text> 
                        <Text style={styles.primaryText}> sem consumir drogas </Text> 
                    </View>
                    <View style={styles.calendario} >
                        <Calendario day={new moment()} 
                                    getClickedDay={this.getClickedDay} 
                                    fontSize={15}
                                    width= {291}
                                    height= {218}/>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 2}}>
                            <View style={styles.circle} />
                            <Text style={styles.labelLegenda}> DIAS COM TODAS AS ATIVIDADES CUMPRIDAS</Text>
                        </View>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 2}}>
                            <View style={[styles.circle, {backgroundColor: '#000'}]} />
                            <Text style={styles.labelLegenda}> DIAS SEM TODAS AS ATIVIDADES CUMPRIDAS</Text>
                        </View>
                    </View>
                    <View style={styles.texts}>
                        <Text style={styles.primaryText}> você já deu </Text> 
                        <Text style={styles.secondaryText}> xx passos</Text> 
                        <Text style={styles.primaryText}> (desafios concluídos) </Text> 
                    </View>
                    <View style={styles.texts}>
                        <Text style={styles.primaryText}> você está à </Text> 
                        <Text style={styles.secondaryText}> xx dias </Text> 
                        <Text style={styles.primaryText}> acessando o app </Text> 
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }

}

export default Estatisticas;