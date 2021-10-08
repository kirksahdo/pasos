import React, { useState } from 'react';
import { Text, StatusBar, View, StyleSheet, ImageBackground, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import background from '../../../assets/background.png';
import logo from '../../../assets/logo-preta-2.png';
import crise from '../../../assets/esta-tendo-uma-crise.png';

import styles from './styles';
import UserModel from '../../models/user.model'
import Firebase from '../../config/firebase.config';

const Cadastro = ({ navigation }) => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaRepetida, setSenhaRepetida] = useState('');
    const database = Firebase.database()
    const authentication = Firebase.auth()


    async function register() {
        try {

            await authentication.createUserWithEmailAndPassword(email, senha).then(async (userCredentials) => {
                const user = new UserModel(userCredentials.user.uid, nome, email)
                
                await database.ref(`Users`).child(user.uid).set(user).then(() => {
                    alert('Usuário Criado ...')

                });
                navigation.navigate('Login');
            })

        } catch (error) {
            console.error(error)
            alert(error)
        }
    }


    return (
        <ImageBackground source={background} style={styles.background}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />

            <View style={styles.logo}>
                <Image source={logo} style={{ margin: 20 }} />
            </View>
            <View style={styles.form}>
                <View style={styles.header} >
                    <Text style={styles.headerTitle}>Cadastro</Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput style={styles.txtInput} placeholder='NOME COMPLETO' placeholderTextColor='#7d7d7d' value={nome} onChangeText={txt => setNome(txt)} />
                    <TextInput keyboardType='email-address' style={styles.txtInput} placeholder='EMAIL' placeholderTextColor='#7d7d7d' value={email} onChangeText={txt => setEmail(txt)} />
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
            <TouchableOpacity style={styles.crise}>
                <Image source={crise} />
            </TouchableOpacity>
        </ImageBackground>

    );

}

export default Cadastro;