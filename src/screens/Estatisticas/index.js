import React, {Component} from 'react';
import {View, StyleSheet, Text, ImageBackground, Dimensions} from 'react-native';
import moment from 'moment'
import 'moment/locale/pt-br'

import Calendario from '../../components/Calendario';

import background from '../../../assets/white-background.png';

class Estatisticas extends Component{

    getClickedDay = date => {
        console.log( date.format('DD/MM/YYYY') );
    }

    render(){
        return (
            <ImageBackground source={background} style={styles.background} >
                <View style={styles.calendario} >
                    <Calendario day={new moment()} 
                                getClickedDay={this.getClickedDay} 
                                fontSize={20}
                                width= {Dimensions.get('window').width * 0.8}
                                height= {Dimensions.get('window').width * 0.7}/>
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 2}}>
                        <View style={styles.circle} />
                        <Text style={styles.labelLegenda}> DIAS COM TODAS AS ATIVIDADES CUMPRIDAS</Text>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 2}}>
                        <View style={[styles.circle, {backgroundColor: '#000'}]} />
                        <Text style={styles.labelLegenda}> DIAS SEM TODAS AS ATIVIDADES CUMPRIDAS</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FACC29'
    },
    labelLegenda: {
        marginTop: 2,
        fontSize: 13,
        fontFamily: 'pompadour',
        color: '#000'
    }
})

export default Estatisticas;