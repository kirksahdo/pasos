import React, {Component} from 'react';
import {View, Text, ImageBackground, ScrollView} from 'react-native';
import moment from 'moment'
import 'moment/locale/pt-br'

import Firebase from '../../config/firebase.config';

import Calendario from '../../components/Calendario';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

import background from '../../../assets/white-background.png';

import styles from './styles';

class Estatisticas extends Component{

    state = {
        daysInApp: 0
    }

    getClickedDay = date => {
        this.props.navigation.push('DiaEspecifico', {date: date.format('YYYY-MM-DD')});
    }

    componentDidMount(){
        const id = Firebase.auth().currentUser.uid;
        const ref = Firebase.database().ref('Users');
        ref.child(id).get().then(snapshopt => {
            if(snapshopt.exists()){
                const user = snapshopt.val();
                const createdDate = moment(Number.parseInt(user.createdAt))
                const days = moment().diff(createdDate, 'days');
                this.setState({daysInApp: days+1})
            }
        }).catch(err => {
            console.log(err);
        })
    }

    render(){
        return (
            <ImageBackground source={background} style={styles.background} >
                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
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
                        <Text style={styles.secondaryText}> {this.state.daysInApp == 1 ? this.state.daysInApp + '  dia': this.state.daysInApp + '  dias'} </Text> 
                        <Text style={styles.primaryText}> acessando o app </Text> 
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }

}

export default Estatisticas;