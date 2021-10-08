import React, { useState } from 'react';
import { Text, View, StatusBar, ImageBackground, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import background from '../../../assets/background.png';
import logo from '../../../assets/logo-preta-2.png';
import crise from '../../../assets/esta-tendo-uma-crise.png';

import Firebase from '../../config/firebase.config';

import styles from './styles';


const Login = ({ navigation, login }) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const authentication = Firebase.auth()

    function setAuth() {
        authentication.signInWithEmailAndPassword(email, senha).then((response) => {
            alert(response)
        }).catch((error) => [
            alert(error)
        ])
    }

    return (
        <ImageBackground source={background} style={styles.background}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />

            <View style={styles.logo}>
                <Image source={logo} style={{ margin: 20 }} />
            </View>
            <View style={styles.form}>
                <View style={styles.header} >
                    <Text style={styles.headerTitle}>Login</Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput keyboardType='email-address' style={styles.txtInput} placeholder='EMAIL' placeholderTextColor='#7d7d7d' value={email} onChangeText={txt => setEmail(txt)} />
                    <TextInput secureTextEntry={true} style={styles.txtInput} placeholder='SENHA' placeholderTextColor='#7d7d7d' value={senha} onChangeText={txt => setSenha(txt)} />
                </View>
                <View style={styles.buttons}>
                    <TouchableWithoutFeedback >
                        <Text style={styles.txtExtras}>Esqueceu sua senha?</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Text style={styles.txtExtras} onPress={() => navigation.navigate('Cadastro')}  >Ainda não é cadastrado?</Text>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity style={styles.btnEntrar} onPress={setAuth}>
                        <Text style={styles.labelEntrar}>ENTRAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.crise}>
                <Image source={crise} />
            </TouchableOpacity>
        </ImageBackground>

    );

}



export default Login;