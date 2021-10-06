import React, {useState} from 'react';
import {Text, View, StyleSheet, ImageBackground, Image, TextInput} from 'react-native';

import background from '../../../assets/background.png'
import logo from '../../../assets/logo-preta-2.png'

const Login = () => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    return(
        <ImageBackground source={background} style={ styles.background }>
            <View style={styles.logo}>
                <Image source={logo} style={{margin: 20}} />
            </View>
            <View style={styles.form}>
                <View style={styles.header} >
                    <Text style={styles.headerTitle}>Login</Text>
                </View>
                <View style={styles.inputs}> 
                    <TextInput style={styles.txtInput} placeholder='EMAIL' value = {email} onChangeText={txt => setEmail(txt)}  />
                    <TextInput style={styles.txtInput} placeholder='SENHA' value = {senha} onChangeText={txt => setSenha(txt)}  />
                </View>
            </View>
        </ImageBackground>
            
    );

}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    logo: {
        width:'100%',
        alignItems: 'flex-end'
    },
    form: {
        width: '100%',
        alignItems: 'center',
        padding: '10%'

    },
    header: {
        width: '100%',
        borderBottomColor: '#000',
        borderBottomWidth: 3.5,
        alignItems: 'center'
    },
    headerTitle: {
        fontFamily: 'newake',
        fontSize: 40,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#000',
        marginBottom: 10
    },
    inputs: {
        width: '100%',
        marginTop: 22
    },
    txtInput: {
        fontFamily: 'pompadour',
        fontSize: 16,
        fontWeight: 'normal',
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 12
    }
});

export default Login;