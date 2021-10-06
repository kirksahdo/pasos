import React, {useState} from 'react';
import {Text, StatusBar, View, StyleSheet, ImageBackground, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import background from '../../../assets/background.png';
import logo from '../../../assets/logo-preta-2.png';
import crise from '../../../assets/esta-tendo-uma-crise.png';

import styles from './styles';

const Cadastro = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaRepetida, setSenhaRepetida] = useState('');


    async function register(){
        
    }


    return(
        <ImageBackground source={background} style={ styles.background }>
            <StatusBar translucent backgroundColor="transparent" />      

            <View style={styles.logo}>
                <Image source={logo} style={{margin: 20}} />
            </View>
            <View style={styles.form}>
                <View style={styles.header} >
                    <Text style={styles.headerTitle}>Cadastro</Text>
                </View>
                <View style={styles.inputs}> 
                    <TextInput style={styles.txtInput} placeholder='NOME COMPLETO' value = {nome} onChangeText={txt => setNome(txt)}  />
                    <TextInput style={styles.txtInput} placeholder='EMAIL' value = {email} onChangeText={txt => setEmail(txt)}  />
                    <TextInput style={styles.txtInput} placeholder='SENHA' value = {senha} onChangeText={txt => setSenha(txt)}  />
                    <TextInput style={styles.txtInput} placeholder='REPITA A SENHA' value = {senhaRepetida} onChangeText={txt => setSenhaRepetida(txt)}  />
                </View>
                <View style= {styles.buttons}> 
                    <TouchableWithoutFeedback >
                        <Text style={styles.txtExtras}>Já é cadastrado?</Text>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity style={styles.btnCadastrar} onPress={register}>
                        <Text style={styles.labelCadastrar}>ENTRAR</Text>
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