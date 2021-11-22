import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, Text, View, Alert } from "react-native";
import background from '../../../assets/blank-background.png';
import CardDays from "../../components/CardDays";
import styles from './styles';
import moment from 'moment';
import 'moment/locale/pt-br';
import { DateUtils } from "../../common/date.utils";

import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import degraus from '../../../assets/retangulo-degrau.png';
import boneco from '../../../assets/user_idle.png';

import EventButton from "../../components/EventButton";
import Loading from '../../components/Loading';
import Firebase from '../../config/firebase.config';

class Inicio extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        days: [
            moment().subtract(2, 'days'),
            moment().subtract(1, 'days'),
            moment(),
            moment().add(1, 'days'),
            moment().add(2, 'days')
        ],
        dayWorkContext: 0,
        loading: true,
        events: []
    }

    gotToQuestionary(){
        this.props.navigation.navigate("PreQuestionario")
    }

    getEvents(){
        try{    
            const currentUser = Firebase.auth().currentUser;
            this.databaseRef = Firebase
                .database()
                .ref('Atividades')
                .child(currentUser.uid)
                .child(this.state.days[2].format('YYYY-MM-DD'));
            this.listener = this.databaseRef.on('value', snapshot => {
                if(snapshot.exists()){
                    let data = [];
                    snapshot.forEach((child) => {
                        data.push( {...child.val(), id:child.key} )
                    });
                    data.sort((a,b) => {
                        if(a.concluido && !b.concluido) return 1;
                        if(!a.concluido && b.concluido) return -1;
                        return 0;
                    })
                    this.setState({events: data})
                }
                this.setState({loading: false})
            });
        }catch(err){
            Alert.alert('Erro, contate o administrador do sistema!', err.toString());
        }
    }


    componentDidMount(){
        this.getEvents();
    }

    componentWillUnmount(){
        this.databaseRef.off('value', this.listener);
    }
    getNavigateEvent(tipo, concluido, id, data){
        switch(tipo){
            case 'questionario':
                return () => this.props.navigation.navigate('PreQuestionario')
            case 'desafio':
                return () => this.props.navigation.navigate('Desafio')
            case 'exercicio':
                return ()=> this.props.navigation.navigate('Exercicios')
            case 'rotina-alimentar':
                return ()=> this.props.navigation.navigate('RotinaAlimentar')
            case 'Evento Personalizado':
                return () => !concluido && this.props.navigation.navigate('EditarEvento', {id, data});
            default:
                return null
        }
    }

    render() {
        return (
            <ImageBackground source={background} style={styles.background}>
                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <ScrollView keyboardShouldPersistTaps="always" >
                    <View style={styles.viewDays}>
                        {
                            this.state.days.map((item, index) => (
                                <CardDays key={index} index={index} day={item.date()} dayWeek={DateUtils.getDayofWeekBR(item.weekday())} isComplet={index < 2} />
                            ))
                        }
                    </View>
                    <View style={styles.containerStairs} >
                        <View style={styles.viewInit}>
                            {this.state.dayWorkContext ? null : <Image source={boneco} />}

                        </View>
                        <View>

                            <View style={styles.topRow}>
                                <View style={styles.viewStepImg}>
                                    <Image source={degraus} style={styles.degrauImage} />
                                </View>
                                <Text style={styles.numDegrausLabel}>{this.state.dayWorkContext + 3}</Text>
                            </View>
                            <View style={styles.midRow}>
                                <View style={styles.viewStepImg}>
                                    <Image source={degraus} style={styles.degrauImage} />
                                </View>
                                <Text style={styles.numDegrausLabel}>{this.state.dayWorkContext + 2}</Text>
                            </View>
                            <View style={styles.viewUserStep}>
                                {this.state.dayWorkContext ? <Image source={boneco} /> : null}
                            </View>

                            <View style={styles.bottomRow}>
                                <View style={styles.viewStepImg}>
                                    <Image source={degraus} style={styles.degrauImage} />
                                </View>
                                <Text style={styles.numDegrausLabel}>{this.state.dayWorkContext + 1}</Text>
                            </View>

                        </View>

                    </View>
                    <View style={styles.buttons}>
                        <EventButton tipo='addEvento' 
                            nome='ADICIONAR EVENTO' 
                            onPress={() => this.props.navigation.navigate('AdicionarEvento')} key={0} />
                        {
                        this.state.events && this.state.events.map(item => (

                            <EventButton 
                                key={item.id}
                                tipo={item.tipo}
                                onPress={this.getNavigateEvent(item.tipo, item.concluido, item.id, item.data?item.data:{})}
                                nome={item.horario ? item.nome + ' - ' + item.horario : item.nome}
                                concluido={item.concluido}/>
                                
                        ))
                        }

                    </View>
                </ScrollView>
                {this.state.loading && <Loading />}
            </ImageBackground >
        )
    }
}
export default Inicio;