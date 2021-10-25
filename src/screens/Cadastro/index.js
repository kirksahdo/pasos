import React, { useState } from 'react';
import { Text, StatusBar, View, ScrollView, ImageBackground, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

import background from '../../../assets/background.png';
import logo from '../../../assets/logo-preta-2.png';
import crise from '../../../assets/esta-tendo-uma-crise.png';

import styles from './styles';
import UserModel from '../../models/user.model'
import Firebase from '../../config/firebase.config';
import { DateUtils } from '../../common/date.utils';

const Cadastro = ({ navigation }) => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [senhaRepetida, setSenhaRepetida] = useState('');
    const [showDate, setShowDate] = useState(false);
    const [dataDeNascimento, setDataDeNascimento] = useState('');
    const [dataDeNascimentoEditado, setDataDeNascimentoEditado] = useState('');
    const database = Firebase.database()
    const authentication = Firebase.auth()


    async function register() {
        try {

            await authentication.createUserWithEmailAndPassword(email, senha).then(async (userCredentials) => {
                const user = new UserModel(userCredentials.user.uid, nome, email, altura, dataDeNascimento, peso)
                await database.ref(`Users`).child(user.uid).set(user);
                const key = database.ref('Atividades').child(user.uid).child(moment().format('YYYY-MM-DD')).push().key;
                await database.ref('Atividades').child(user.uid).child(moment().format('YYYY-MM-DD')).child(key).set({
                    id: key,
                    tipo: 'Desafio',
                    nome: 'Desafio 1',
                    concluido: false,
                });
                navigation.navigate('Login');
            })

        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

    function onChange (event, selectedDate){
        setShowDate(false);
        if(selectedDate){
            const currentDate = selectedDate.getTime();
            setDataDeNascimentoEditado(DateUtils.MillisecToFormatedDate(currentDate));
            setDataDeNascimento(currentDate);
            return;
        }
    };


    return (
        <ImageBackground source={background} style={styles.background}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />

            <View style={styles.logo}>
                <Image source={logo} style={{ margin: 20 }} />
            </View>
            <ScrollView style={styles.scrollView} >
                <View style={styles.form}>
                    <View style={styles.header} >
                        <Text style={styles.headerTitle}>Cadastro</Text>
                    </View>
                    
                    <View style={styles.inputs}>
                        <TextInput style={styles.txtInput} placeholder='NOME COMPLETO' placeholderTextColor='#7d7d7d' value={nome} onChangeText={txt => setNome(txt)} />
                        <TextInput keyboardType='email-address' style={styles.txtInput} placeholder='EMAIL' placeholderTextColor='#7d7d7d' value={email} onChangeText={txt => setEmail(txt)} />
                        <TouchableOpacity
                                onPress={() => setShowDate(true)} >
                                <TextInput
                                    placeholder='DATA DE NASCIMENTO'
                                    style={styles.txtInput}
                                    value={dataDeNascimentoEditado}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            {
                                showDate && (
                                    <DateTimePicker
                                        locale="es-ES"
                                        testID="dateTimePicker"
                                        value={new Date(Date.UTC(2000, 1, 1))}
                                        mode='date'
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )
                            }
                        <TextInput placeholder='PESO' keyboardType="decimal-pad" style={styles.txtInput} value={peso} onChangeText={text => setPeso(text)} />
                        <TextInput placeholder='ALTURA' keyboardType="decimal-pad" style={styles.txtInput} value={altura} onChangeText={text => setAltura(text)} />
                        <TextInput secureTextEntry={true} style={styles.txtInput} placeholder='SENHA' placeholderTextColor='#7d7d7d' value={senha} onChangeText={txt => setSenha(txt)} />
                        <TextInput secureTextEntry={true} style={styles.txtInput} placeholder='REPITA A SENHA' placeholderTextColor='#7d7d7d' value={senhaRepetida} onChangeText={txt => setSenhaRepetida(txt)} />
                    </View>
                    <View style={styles.buttons}>
                        <TouchableWithoutFeedback >
                            <Text style={styles.txtExtras}>Já é cadastrado?</Text>
                        </TouchableWithoutFeedback>
                        <TouchableOpacity style={styles.btnCadastrar} onPress={register}>
                            <Text style={styles.labelCadastrar}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.crise}>
                <Image source={crise} />
            </TouchableOpacity>
        </ImageBackground>

    );

}

export default Cadastro;