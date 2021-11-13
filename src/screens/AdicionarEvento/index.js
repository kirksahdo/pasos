import React, { Component } from 'react';
import { Text, View, TextInput, ImageBackground, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

import Firebase from '../../config/firebase.config'

import background from '../../../assets/background.png';
import setaesquerda from '../../../assets/seta-esquerda-preta.png';

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import moment from 'moment';
import Loading from '../../components/Loading';

import styles from './styles';

class AdicionarEvento extends Component {

    state = {
        nome: '',
        repetir: false,
        showDate: false,
        showTime: false,
        date: new Date(),
        loading: false
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
        if(selectedDate.isSameOrBefore()){
            Alert.alert('Erro', 'A data e o horário do evento precisam ser no futuro!');
            return false;
        }

        return true;
    }

    saveEvent = async () => {
        if(!this.validateFields()) return;
        this.setState({loading: true})
        try{
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
            this.props.navigation.goBack();
            return;
        }catch(err){
            Alert.alert('Erro, contate o administrador do sistema!', err.toString());
        }
        finally{
            this.setState({loading:false})
        }
    }  
    

    render() {
        return (
            <ImageBackground source={background} style={styles.background}>
                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>{'Adicionar\nEvento'}</Text>
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
                        <TouchableOpacity style={styles.btnAdicionar} title='Adicionar' onPress={this.saveEvent}>
                                <Text style={styles.btnText}>Adicionar</Text>
                        </TouchableOpacity>
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

export default AdicionarEvento;