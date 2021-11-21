import React, { Component } from 'react';
import { Text, View, TextInput, ImageBackground, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import {StyleSheet, Dimensions, StatusBar} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

import Firebase from '../../config/firebase.config';

import background from '../../../assets/background.png';
import setaesquerda from '../../../assets/seta-esquerda-preta.png';

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import moment from 'moment';
import Loading from '../../components/Loading';

//import styles from './styles';

class EditarEvento extends Component {

    state = {
        nome: '',
        repetir: false,
        showDate: false,
        showTime: false,
        date: new Date(),
        loading: true
    }

    loadData = async() => {
        try{
            const userId = Firebase.auth().currentUser.uid;
            const databaseRef = Firebase.database()
                .ref('Atividades')
                .child(userId)
                .child(this.props.route.params.data)
                .child(this.props.route.params.id);
            const result = await databaseRef.get();
            if(result.exists()){
                const event = result.val();
                let dataString = `${event.data}-${event.horario}`
                this.setState({
                    date: new Date(moment(dataString, 'YYYY-MM-DD-HH:mm').toISOString()),
                    nome: event.nome,
                    repetir: event.repetir,
                    loading: false
                });
            }else{
                this.props.navigation.goBack();
            }
        }catch(err){
            Alert.alert('Erro, contate o administrador do sistema!', err.toString());
        }
    }

    componentDidMount(){
        if(!this.props.route.params){
            this.props.navigation.goBack();
            return;
        } 
        this.setState({loading: true}, this.loadData);
        
    }

    onChangeDate = (event, selectedDate) => {
        this.setState({showDate: false});
        if(selectedDate){
            const currentDate = selectedDate;
            this.setState({date: currentDate, showTime: true})
        }
    };

    onChangeTime = (event, selectedDate) => {
        this.setState({showTime: false});
        if(selectedDate){
            const currentDate = selectedDate;
            this.setState({date: currentDate})
        }
    };

    validateFields = () => {
        if(this.state.nome.trim().length == 0) {
            Alert.alert('Erro', 'Você deve preencher o nome do evento!');
            return false;
        }

        const date = moment();
        const selectedDate = moment(this.state.date.getTime());
        if(selectedDate.isSameOrBefore(date)){
            Alert.alert('Erro', 'A data e o horário do evento precisam ser no futuro!');
            return false;
        }

        return true;
    }

    saveEvent = async () => {
        if(!this.validateFields()) return;
        this.setState({loading: true})
        try{
            await this.deleteEvent();
            const dateFormatted = moment(this.state.date.getTime()).format('YYYY-MM-DD');
            const timeFormatted = moment(this.state.date.getTime()).format('HH:mm');
            const currentUser = Firebase.auth().currentUser;
            const databaseRef = Firebase.database().ref('Atividades')
                .child(currentUser.uid)
                .child(dateFormatted);
            const key = databaseRef.push().key;
            await databaseRef.child(key).set({
                id: key,
                tipo: 'Evento Personalizado',
                nome: this.state.nome,
                data: dateFormatted,
                horario: timeFormatted,
                concluido: false,
                repetir: this.state.repetir
            });
            Alert.alert('Sucesso', 'Os dados do evento foram salvos com êxito!');
            this.props.navigation.goBack();
        }catch(err){
            Alert.alert('Erro, contate o administrador do sistema!', err.toString());
        }
    }  

    deleteEvent = async() => {
        try{
            const currentUser = Firebase.auth().currentUser;
            const databaseRef = Firebase.database().ref('Atividades')
                .child(currentUser.uid)
                .child(this.props.route.params.data)
                .child(this.props.route.params.id);
            await databaseRef.remove();
        }catch(err){
            Alert.alert('Erro, contate o administrador do sistema!', err.toString());
        }
    }
    
    removeEvent = async() => {
        this.setState({loading: true});
        try{
            await this.deleteEvent();
            Alert.alert('Sucesso', 'O Evento foi excluído com êxito!');
            this.props.navigation.goBack();
        }catch(err){
            Alert.alert('Erro, contate o administrador do sistema!', err.toString());
        }
    }

    concludeEvent = async() => {
        this.setState({loading: true});
        try{
            const currentUser = Firebase.auth().currentUser;
            const databaseRef = Firebase.database().ref('Atividades')
                .child(currentUser.uid)
                .child(this.props.route.params.data)
                .child(this.props.route.params.id);
            await databaseRef.update({
                concluido: true
            })
            Alert.alert('Sucesso', 'O Evento foi concluído com êxito!');
            this.props.navigation.goBack();
        }catch(err){
            Alert.alert('Erro, contate o administrador do sistema!', err.toString());
        }
    }

    render() {
        return (
            <ImageBackground source={background} style={styles.background}>
                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>{'Editar ou Concluir Evento'}</Text>
                    </View>
                    <ScrollView style={styles.content} keyboardShouldPersistTaps="always">
                        <TextInput 
                            style={styles.textInput}
                            value={this.state.nome}
                            onChangeText={text => this.setState({nome: text})}
                            placeholder='NOME DO EVENTO'>
                        </TextInput>

                        <Text style={styles.titleDate}>DATA E HORÁRIO</Text>
                        <TouchableOpacity style={styles.date} onPress={() => this.setState({showDate: true})}>
                            <>
                                <View style={styles.box}>
                                        <Text style={styles.boxText}>{moment(this.state.date.getTime()).format('DD')}</Text>
                                        <Text style={styles.boxText2}>DIA</Text>
                                </View>
                                <View style={styles.box}>
                                        <Text style={styles.boxText}>{moment(this.state.date.getTime()).format('MM')}</Text>
                                        <Text style={styles.boxText2}>MÊS</Text>
                                </View>
                                <View style={styles.box}>
                                        <Text style={styles.boxText}>{moment(this.state.date.getTime()).format('HH')}</Text>
                                        <Text style={styles.boxText2}>HORA</Text>
                                </View>
                                <View style={styles.box}>
                                        <Text style={styles.boxText}>{moment(this.state.date.getTime()).format('mm')}</Text>
                                        <Text style={styles.boxText2}>MIN</Text>
                                </View>
                            </>
                        </TouchableOpacity>
                        {this.state.showDate && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.date}
                                mode='date'
                                is24Hour={true}
                                display="default"
                                onChange={this.onChangeDate}
                            />
                        )}
                        {this.state.showTime && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.date}
                                mode='time'
                                is24Hour={true}
                                display="default"
                                onChange={this.onChangeTime}
                            />
                        )}
                        <View style={styles.checkBox}>
                            <CheckBox
                                disabled={false}
                                value={this.state.repetir}
                                onValueChange={(newValue) => this.setState({repetir: newValue})}
                                style={styles.checkBox}
                                tintColors={{true:'#000', false:'#000'}}
                            />
                            <Text style={styles.txtRepetir}>Repetir</Text>
                        </View>
                        <View style={styles.buttons} >
                            <TouchableOpacity style={styles.btnExcluir} onPress={this.removeEvent}>
                                    <Text style={[styles.btnText, {color: '#d12c38', fontWeight: 'bold'}]}>Excluir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnSalvar} onPress={this.saveEvent}>
                                <Text style={styles.btnText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnConcluir} onPress={this.concludeEvent}>
                                    <Text style={styles.btnText}>Concluir</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.setaEsquerda} onPress={() => this.props.navigation.goBack()}>
                    <Image source={setaesquerda} />
                </TouchableOpacity>
                {this.state.loading && <Loading />}
            </ImageBackground>
        );
    };

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 100
    },
    setaEsquerda: {
        position: 'absolute',
        left: 18,
        top: StatusBar.currentHeight + 21
    },
    container:{
        width: 0.90*Dimensions.get('window').width,
    },
    header: {
        marginTop: StatusBar.currentHeight + 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    headerTitle: {
        fontFamily: 'newake',
        color: '#000',
        fontSize: 35,
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    content: {
        width: '100%'
    },
    textInput: {
        width: '100%',
        fontFamily: 'pompadour',
        fontSize: 18,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 0
    },
    titleDate: {
        width: '100%',
        fontSize: 16,
        fontFamily: 'pompadour',
        color: '#000',
        textAlign: 'center',
        marginTop: 36,
        marginBottom: 10
    },
    date: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30
    },
    box: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 30,
        width: 66,
        height: 94,
        justifyContent: 'center',
        alignItems:'center'
    },
    boxText: {
        fontSize: 23,
        fontFamily: 'pompadour',
        color: '#000'
    },
    boxText2: {
        fontFamily: 15,
        fontFamily: 'pompadour',
        color: '#000'
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtRepetir: {
        fontFamily: 'pompadour',
        fontSize: 20,
        marginTop: 2,
        color: '#000',
        textTransform: 'uppercase'
    },
    btnText: {
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: 17
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btnExcluir: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.0)',
        color: '#d12c38',
        borderColor: '#d12c38',
        borderWidth: 3,
        borderRadius: 8,
        marginTop: 40,
        marginBottom: 20
    },
    btnSalvar: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#2579bc',
        borderRadius: 8,
        marginTop: 40,
        marginBottom: 20
    },
    btnConcluir: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#23cf5c',
        borderRadius: 8,
        marginTop: 40,
        marginBottom: 20
    }
});

export default EditarEvento;