import React, {Component} from 'react';
import {View, Text, ImageBackground, ScrollView, Alert, RefreshControl, TouchableOpacity, Image} from 'react-native';
import moment from 'moment'
import 'moment/locale/pt-br'

import Firebase from '../../config/firebase.config';
import Calendario from '../../components/Calendario';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Loading from '../../components/Loading';
import { dayIsConclused } from '../../utils/Events';
import IconeProximo from '../../../assets/icone-proximo.png';
import IconeAnterior from '../../../assets/icone-anterior.png';

import background from '../../../assets/white-background.png';
import styles from './styles';

class Estatisticas extends Component{

    state = {
        currentDate: moment(),
        daysInApp: 0,
        conclusedChallenges: 0,
        loading: true,
        refreshing: false,
        createdDate: '',
        dateArray: []
    }

    getClickedDay = date => {
        this.props.navigation.push('DiaEspecifico', {date: date.format('YYYY-MM-DD')});
    }

    getConclusedDays = async() => {
        try{
            const id = Firebase.auth().currentUser.uid;
            let daysInMonth = this.state.currentDate.daysInMonth();
            let dateFormat = this.state.currentDate.format('YYYY-MM-');
            let dateArray = [];
            for(let i = 1 ; i <= daysInMonth ; i++ ){
                let day = `${i}`;
                if(i >= 1 && i <= 9){
                    day = '0' + i;
                }
                let date = dateFormat + day;
                if(moment(date, 'YYYY-MM-DD').isBefore(this.state.createdDate) && date != this.state.createdDate.format('YYYY-MM-DD')){
                    continue;
                }
                if(moment(date, 'YYYY-MM-DD').isAfter(moment())){
                    break;
                }
                let conclused = await dayIsConclused(date, id);
                dateArray.push( {
                    date: dateFormat + day,
                    conclused
                });
            
            }
            return this.setState({dateArray});

        }catch(err){
            Alert.alert('Erro, contate o administrador do sistema!', err.toString());
        }
    }

    getConclusedChallenges = async () => {
        try{
            const id = Firebase.auth().currentUser.uid;
            const ref = Firebase.database().ref('Atividades');
            const result = await ref.child(id).get();
            const data = result.val();
            let conclusedChallenges = 0;
            for(let key in data){
                for(let key2 in data[key]){
                    let val = data[key][key2];
                    if(val.concluido & val.tipo.toLocaleLowerCase() == 'desafio') conclusedChallenges++;
                }
            }
            return this.setState({conclusedChallenges});
        }catch(err){
            Alert.alert('Erro, contate o administrador do sistema!', err.toString());
        }
    }

    getDaysInApp = async () => {
        const id = Firebase.auth().currentUser.uid;
        const ref = Firebase.database().ref('Users');
        await ref.child(id).get().then(snapshopt => {
            if(snapshopt.exists()){
                const user = snapshopt.val();
                const createdDate = moment(Number.parseInt(user.createdAt))
                const days = moment().diff(createdDate, 'days');
                this.setState({daysInApp: days+1, createdDate})
            }
        }).catch(err => {
            console.log(err);
        });
    }

    loadData = async () => {
        this.setState({loading: true});
        await this.getDaysInApp();
        await this.getConclusedChallenges();
        await this.getConclusedDays();
        this.setState({loading: false});
    }

    onArrow = (number) => {
        
        if(number > 0){
            const data = this.state.currentDate.add(1, 'month');
            this.setState( {currentData: moment(data).add(number, 'month')}) ;
        }
        else{
            const data = this.state.currentDate.subtract(1, 'month');
            this.setState( {currentData: moment(data).subtract(number, 'month')}) ;
        }
        this.loadData();
    }

    componentDidMount(){
        
        this.loadData();
    }

    onRefresh = async() => {
        this.setState({refreshing: true});
        await this.loadData();
        this.setState({refreshing: false});
    }

    render(){
        return (
            <ImageBackground source={background} style={styles.background} >
                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <ScrollView 
                    style={styles.content} 
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}/>
                    }>
                    <View style={styles.texts}>
                        <Text style={styles.primaryText}> você está a </Text> 
                        <Text style={styles.secondaryText}> xx dias</Text> 
                        <Text style={styles.primaryText}> sem consumir drogas </Text> 
                    </View>
                    <View style={styles.calendario} >
                        <View style={styles.header}>
                            <View style={styles.arrowLeft}>
                                <TouchableOpacity onPress={ () => this.onArrow(-1)}>
                                    <Image source={IconeAnterior}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.arrowRight}>
                                <TouchableOpacity onPress={ () => this.onArrow(+1)} >
                                    <Image source={IconeProximo}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Calendario day={this.state.currentDate} 
                                    getClickedDay={this.getClickedDay} 
                                    fontSize={15}
                                    width= {291}
                                    height= {218}
                                    events= {this.state.dateArray}/>
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
                        <Text style={styles.secondaryText}> {`${this.state.conclusedChallenges}  passos`}</Text> 
                        <Text style={styles.primaryText}> (desafios concluídos) </Text> 
                    </View>
                    <View style={styles.texts}>
                        <Text style={styles.primaryText}> você está à </Text> 
                        <Text style={styles.secondaryText}> {this.state.daysInApp == 1 ? this.state.daysInApp + '  dia': this.state.daysInApp + '  dias'} </Text> 
                        <Text style={styles.primaryText}> acessando o app </Text> 
                    </View>
                </ScrollView>
                {this.state.loading && <Loading />}
            </ImageBackground>
        );
    }

}

export default Estatisticas;