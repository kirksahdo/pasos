import React, { Component } from 'react';
import { Text, View, TextInput, StatusBar, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Firebase from '../../config/firebase.config';

import background from '../../../assets/background.png';
import setaesquerda from '../../../assets/seta-esquerda-preta.png';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';


class Sugestoes extends Component {


    state = {
        sugestao: ''
    };

    saveSugestion = () => {
        if(this.state.sugestao.trim().length == 0) return Alert.alert('Erro!', 'Você deve preencher o campo sugestão!');
        const db = Firebase.database().ref('Sugestoes');
        const uid = Firebase.auth().currentUser.uid;
        const sid = db.push().key;
        db.child(sid).set({
            uid,
            sid,
            sugestao: this.state.sugestao
        }).then(() => {
            Alert.alert('Sucesso!', 'Sugestão enviada com sucesso!');
            this.props.navigation.goBack();
        }).catch(err => {
            Alert.alert('Erro', err);
        });
    }

    render() {
        return (
            <ImageBackground source={background} style={styles.background}>

                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <ScrollView style={styles.scroll}>
                    <View style={styles.form}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>FAZER SUGESTÕES</Text>
                        </View>
                        <View style={styles.inputs}>
                            <TextInput clearButtonMode='while-editing' placeholder='SUGESTAO' style={styles.input} value={this.state.sugestao} onChangeText={text => this.setState({ sugestao: text })} />
                            
                            <TouchableOpacity style={styles.btnAdicionar} title='Adicionar' onPress={() => this.saveSugestion()}>
                                <Text style={styles.btnText}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.setaEsquerda} onPress={() => this.props.navigation.goBack()}>
                    <Image source={setaesquerda} />
                </TouchableOpacity>
            </ImageBackground>
        );
    };
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    setaEsquerda: {
        position: 'absolute',
        left: 18,
        top: StatusBar.currentHeight + 21
    },
    scroll: {
        flex: 1,
    },
    form:{
        width: '100%',
        alignItems: 'center'
    },
    header: {
        marginTop: StatusBar.currentHeight + 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontFamily: 'newake',
        color: '#000',
        fontSize: 35,
        textTransform: 'uppercase'
    },
    inputs: {
        width: 0.8*Dimensions.get('window').width
    },
    input: {
        fontFamily: 'pompadour',
        fontSize: 18,
        color: '#000',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        padding: 0,
        marginTop: 40
    },
    btnAdicionar: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#000',
        borderRadius: 8,
        marginTop: 50,
        marginBottom: 20
    },
    btnText: {
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: 17
    }
});


export default Sugestoes;