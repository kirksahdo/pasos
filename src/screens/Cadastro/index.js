import React, { useState, useRef } from 'react';
import { Text, StatusBar, View, ScrollView, ImageBackground, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

import background from '../../../assets/background.png';
import logo from '../../../assets/logo-preta-2.png';
import crise from '../../../assets/esta-tendo-uma-crise.png';

import styles from './styles';
import UserModel from '../../models/user.model'
import Firebase from '../../config/firebase.config';
import { DateUtils } from '../../common/date.utils';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Loading from '../../components/Loading';

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
    const [loading, setLoading] = useState(false);
    const database = Firebase.database()
    const authentication = Firebase.auth()

    const nomeRef = useRef('');
    const emailRef = useRef('');
    const pesoRef = useRef('');
    const alturaRef = useRef('');
    const senhaRef = useRef('');
    const senhaRepetidaRef = useRef('');


    async function register() {
        let err = validateFields();
        if(err != ''){
            Alert.alert('Erro', err);
            return;
        }
        setLoading(true);
        try {
            await authentication.createUserWithEmailAndPassword(email, senha).then(async (userCredentials) => {
                const user = new UserModel(userCredentials.user.uid, nome, email, Number.parseFloat(altura.replace(' m', '')), dataDeNascimento, Number.parseFloat(peso.replace(' kg', '')))
                await database.ref(`Users`).child(user.uid).set(user);
                navigation.navigate('Login');
            })

        } catch (error) {
            Alert.alert('Erro', error.toString())
            setLoading(false);
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


    const onChangePeso = (text) => {
        return isNaN(text) ? {} : setPeso(text);
    }

    const onChangeAltura = (text) => {
        return isNaN(text) ? {} : setAltura(text);
    }

    function validateFields(){
        let err = '';
        if(nome.trim().length == 0 || email.trim().length == 0 || dataDeNascimentoEditado.trim().length == 0 || peso.trim().length == 0
        || peso.trim().length == 0 || altura.trim().length == 0 || senha.trim().length == 0 || senhaRepetida.trim().length == 0 ){
            err = 'Você deve preencher todos os campos!'
        }
        if(senhaRepetida != senha){
            err = 'Ambas as senhas devem ser iguais!'
        }
        return err;
    }

    return (
        <ImageBackground source={background} style={styles.background}>
            <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
            
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always" >
                <View style={styles.logo}>
                    <Image source={logo} style={{ margin: 20 }} />
                </View>
                <View style={styles.form}>
                    <View style={styles.header} >
                        <Text style={styles.headerTitle}>Cadastro</Text>
                    </View>
                    
                    <View style={styles.inputs}>
                        <TextInput style={styles.txtInput} 
                            placeholder='NOME COMPLETO' 
                            placeholderTextColor='#7d7d7d' 
                            value={nome} 
                            onChangeText={txt => setNome(txt)}
                            ref={nomeRef}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                emailRef.current.focus();
                            }}
                            blurOnSubmit={false} />
                        <TextInput keyboardType='email-address' style={styles.txtInput}
                            placeholder='EMAIL' 
                            placeholderTextColor='#7d7d7d' 
                            value={email} onChangeText={txt => setEmail(txt)}
                            ref={emailRef}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                emailRef.current.blur();
                                setShowDate(true);
                            }}
                            blurOnSubmit={false} />
                        <TouchableOpacity
                                onPress={() => setShowDate(true)} >
                                <TextInput
                                    placeholder='DATA DE NASCIMENTO'
                                    placeholderTextColor='#7d7d7d' 
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
                        <TextInput placeholder='PESO (em quilogramas)' keyboardType="decimal-pad" style={styles.txtInput} 
                            value={peso} 
                            placeholderTextColor='#7d7d7d' 
                            onChangeText={onChangePeso}
                            onFocus= {() => setPeso(peso.replace(' kg', ''))}
                            onBlur={() => setPeso(peso + ' kg')}
                            ref={pesoRef}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                alturaRef.current.focus();
                            }}
                            blurOnSubmit={false} />
                        <TextInput 
                            placeholder='ALTURA (em metros)' 
                            placeholderTextColor='#7d7d7d' 
                            keyboardType="decimal-pad" 
                            style={styles.txtInput} 
                            value={altura} 
                            onChangeText={onChangeAltura}
                            onFocus= {() => setAltura(altura.replace(' m', ''))}
                            onBlur={() => setAltura(altura + ' m')}
                            ref={alturaRef}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                senhaRef.current.focus();
                            }}
                            blurOnSubmit={false} />
                        <TextInput 
                            secureTextEntry={true} 
                            style={styles.txtInput} 
                            placeholder='SENHA' 
                            placeholderTextColor='#7d7d7d' 
                            value={senha} onChangeText={txt => setSenha(txt)}
                            ref={senhaRef}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                senhaRepetidaRef.current.focus();
                            }}
                            blurOnSubmit={false} />
                        <TextInput 
                            secureTextEntry={true} 
                            style={styles.txtInput} 
                            placeholder='REPITA A SENHA' 
                            placeholderTextColor='#7d7d7d' 
                            value={senhaRepetida} onChangeText={txt => setSenhaRepetida(txt)}
                            ref={senhaRepetidaRef}
                            returnKeyType="go"
                            onSubmitEditing={() => {
                                senhaRepetidaRef.current.blur();
                                register();
                            }}
                            blurOnSubmit={false} />
                    </View>
                    <View style={styles.buttons}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <Text style={styles.txtExtras}>Já é cadastrado?</Text>
                        </TouchableWithoutFeedback>
                        <TouchableOpacity style={styles.btnCadastrar} onPress={register}>
                            <Text style={styles.labelCadastrar}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.crise}>
                <Image source={crise} />
            </TouchableOpacity>
            </ScrollView> 
            {loading && <Loading />}
        </ImageBackground>

    );

}

export default Cadastro;