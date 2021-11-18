import React, { Component } from 'react';
import { Text, View, TextInput, StatusBar, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Firebase from '../../config/firebase.config';

import background from '../../../assets/background.png';
import setaesquerda from '../../../assets/seta-esquerda-preta.png';

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Loading from './../../components/Loading';

import styles from './styles';
import { DateUtils } from '../../common/date.utils';


class EditarPerfil extends Component {


    state = {
        nome: '',
        email: '',
        senha: '',
        dataDeNascimento: 0,
        dataDeNascimentoEditado: '00/00/0000',
        peso: '',
        altura: '',
        showDate: false,
        loading: true
    };

    getUserData = () => {
        const user = Firebase.auth().currentUser;
        const database = Firebase.database().ref('Users');
        database.child(user.uid).get().then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const load = {
                    nome: userData.nome ? userData.nome : '',
                    email: userData.email ? userData.email : '',
                    dataDeNascimento: userData.dataDeNascimento ? userData.dataDeNascimento : '',
                    dataDeNascimentoEditado: DateUtils.MillisecToFormatedDate(userData.dataDeNascimento),
                    peso: userData.peso ? Number(userData.peso).toString() + ' kg' : '',
                    altura: userData.altura ? Number(userData.altura).toString() + ' m' : '',
                };
                this.setState({ ...load, loading: false });
            }
        })
    }

    saveUserData = () => {
        const peso = Number.parseFloat((this.state.peso).split(' ')[0])
        const altura = Number.parseInt((this.state.altura).split(' ')[0])
        const uid = Firebase.auth().currentUser.uid;
        const database = Firebase.database().ref('Users');
        database.child(uid).update(
            {
                nome: this.state.nome,
                peso: peso,
                altura: altura,
                dataDeNascimento: this.state.dataDeNascimento

            }
        ).then(() => {
            alert('Dados atualizados ...')
        }).catch((e) => {
            alert(e)
        })

    }
    onChange = (event, selectedDate) => {
        this.setState({
            showDate: false
        })
        if(selectedDate){
            const currentDate = selectedDate.getTime();
            this.setState({
                dataDeNascimentoEditado: DateUtils.MillisecToFormatedDate(currentDate),
                dataDeNascimento: currentDate
            });
        }
        

    };

    componentDidMount(){
        this.getUserData();
    }

    render() {
        return (
            <ImageBackground source={background} style={styles.background}>

                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <ScrollView style={styles.scroll} keyboardShouldPersistTaps="always">
                    <View style={styles.form}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Editar Perfil</Text>
                        </View>
                        <View style={styles.inputs}>
                            <TextInput placeholder='NOME' style={styles.input} value={this.state.nome} onChangeText={text => this.setState({ nome: text })} />
                            <TextInput placeholder='EMAIL' editable={false} style={styles.input} value={this.state.email} onChangeText={text => this.setState({ email: text })} />
                            <TouchableOpacity
                                onPress={() => this.setState({ showDate: true })}
                            >
                                <TextInput
                                    placeholder='DATA DE NASCIMENTO'
                                    style={styles.input}
                                    value={this.state.dataDeNascimentoEditado}
                                    editable={false}
                                />
                            </TouchableOpacity>

                            {
                                this.state.showDate && (
                                    <DateTimePicker
                                        locale="es-ES"
                                        testID="dateTimePicker"
                                        value={new Date(Date.UTC(2000, 1, 1))}
                                        mode='date'
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.onChange}
                                    />
                                )
                            }
                            <TextInput placeholder='PESO' keyboardType="decimal-pad" style={styles.input} value={this.state.peso} onChangeText={text => this.setState({ peso: text })} />
                            <TextInput placeholder='ALTURA' keyboardType="decimal-pad" style={styles.input} value={this.state.altura} onChangeText={text => this.setState({ altura: text })} />
                            <TouchableOpacity style={styles.btnAdicionar} title='Adicionar' onPress={() => this.saveUserData()}>
                                <Text style={styles.btnText}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.setaEsquerda} onPress={() => this.props.navigation.goBack()}>
                    <Image source={setaesquerda} />
                </TouchableOpacity>
                {this.state.loading && <Loading />}
            </ImageBackground>
        );
    };

}

export default EditarPerfil;