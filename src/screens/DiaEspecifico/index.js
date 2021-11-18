import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';

import background from '../../../assets/background.png';
import setaesquerda from '../../../assets/seta-esquerda-preta.png';
import iconeVolume from '../../../assets/icone-volume.png';

import moment from 'moment';
import 'moment/locale/pt-br';

import calendarIcoPreto from '../../../assets/calendar.png'
import calendarIcoBranco from '../../../assets/icone-calendario-branco.png'
import desafioIcoPreto from '../../../assets/desafio.png'
import desafioIcoBranco from '../../../assets/icone-desafio-branco.png'
import questionarioIcoBranco from '../../../assets/questionario.png'
import questionarioIcoPreto from '../../../assets/icone-questionario-preto.png'
import pesoTreinoIcoBranco from '../../../assets/peso.png'
import pesoIcoPreto from '../../../assets/icone-peso-preto.png'
import macaIcoBranco from '../../../assets/maca.png'
import macaIcoPreto from '../../../assets/icone-maca-preto.png'

import styles from './styles';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Loading from '../../components/Loading';
import Firebase from '../../config/firebase.config';

class DiaEspecifico extends Component {

    state = {
        events: [],
        loading: true
    }

    getIcon = (iconName, concluido) => {
        iconName = iconName.toLowerCase();
        if(iconName == 'desafio'){
            return concluido ? desafioIcoBranco : desafioIcoPreto;
        }
        if(iconName == 'addEvento'){
            return concluido ? calendarIcoBranco : calendarIcoPreto;
        }
        if(iconName == 'questionario'){
            return concluido ? questionarioIcoBranco : questionarioIcoPreto;
        }
        if(iconName == 'treino'){
            return concluido ? pesoTreinoIcoBranco : pesoIcoPreto;
        }
        if(iconName == 'rotinaAlimentar'){
            return concluido ? macaIcoBranco : macaIcoPreto;
        }
        return concluido ? calendarIcoBranco : calendarIcoPreto;
    }

    getEvents = () => {
        try{    
            const currentUser = Firebase.auth().currentUser;
            this.databaseRef = Firebase
                .database()
                .ref('Atividades')
                .child(currentUser.uid)
                .child(this.props.route.params.date);
            this.databaseRef.get().then(snapshot => {
                if(snapshot.exists()){
                    let data = [];
                    snapshot.forEach((child) => {
                        data.push( child.val() )
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
                        this.state.events.map( item => (
                            <TouchableOpacity style={[styles.button, item.concluido?styles.conclused:styles.notConclused]} key={`${item.id}`}>
                                <View style={styles.icone} >
                                    <Image source={this.getIcon(item.tipo, item.concluido)} />
                                </View>
                                <Text style={[styles.buttonLabel, item.concluido?styles.conclused:styles.notConclused, {backgroundColor:'transparent'} ]}>{item.nome}</Text>
                            </TouchableOpacity>
                        ) )
                    }
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 2}}>
                            <View style={[styles.circle, {backgroundColor: '#000'}]} />
                            <Text style={styles.labelLegenda}> Atividade Cumprida</Text>
                        </View>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 2, marginBottom: 200}}>
                            <View style={[styles.circle, {backgroundColor: '#fff'}]} />
                            <Text style={styles.labelLegenda}> Atividade Não Cumprida</Text>
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.setaEsquerda} onPress={() => this.props.navigation.goBack()}>
                    <Image source={setaesquerda} />
                </TouchableOpacity>
                {this.state.loading && <Loading/>}
            </ImageBackground>
        );
    };

}

export default DiaEspecifico;