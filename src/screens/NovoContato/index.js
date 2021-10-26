import React, { Component } from "react";
import background from '../../../assets/black-background.png';
import { ImageBackground, Text, View, TextInput, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import style from './style.js'
import Firebase from '../../config/firebase.config';
import ContatoModel from "../../models/contato.model";

import setaesquerda from '../../../assets/seta-esquerda-branca.png';
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";

class NovoContato extends Component {
    state = {
        nome: '',
        contato: '',
        observacao: ''
    }
    constructor(props) {
        super(props)
        this.database = Firebase.database().ref('Contatos')
        this.uid = Firebase.auth().currentUser.uid
    }
    async saveContato() {
        let err = this.validateFields();
        if(err != ''){
            Alert.alert('Erro', err);
            return;
        }
        const id = Date.now().toString()
        const contato = new ContatoModel(id, this.uid, this.state.nome, this.state.contato, this.state.observacao)
        this.database.child(contato.uid).child(id).set(contato).then((_) => {
            alert('Contato salvo com sucesso ...')
            this.props.navigation.goBack();
        })
    }

    validateFields = () => {
        let err = '';
        if(this.state.nome.trim().length == 0 || this.state.contato.trim().length == 0){
            err = 'Você deve preencher os campos: nome e contato';
        }
        return err;
    }

    render() {
        return (
            <ImageBackground source={background} style={style.background}>
                <FocusAwareStatusBar barStyle='light-content' translucent backgroundColor="transparent" />
                <ScrollView style={style.scroll} keyboardShouldPersistTaps='always'>
                    <View>
                        <Text style={style.viewLabelTitle}>ADICIONAR CONTATO</Text>
                    </View>
                    <View style={style.inputs}>
                        <TextInput
                            style={style.input}
                            placeholder='NOME'
                            placeholderTextColor='#fff'
                            value={this.state.nome}
                            onChangeText={text => this.setState({ nome: text })}
                        />
                        <TextInput
                            style={style.input}
                            placeholder='CONTATO'
                            placeholderTextColor='#fff'
                            keyboardType="phone-pad"
                            value={this.state.contato}
                            onChangeText={text => this.setState({ contato: text })}
                        />
                        <TextInput
                            style={style.input}
                            placeholder='OBSERVAÇÕES (OPCIONAL)'
                            placeholderTextColor='#fff'
                            value={this.state.observacao}
                            onChangeText={text => this.setState({ observacao: text })}
                        />
                    </View>
                    <TouchableOpacity style={style.button} onPress={() => this.saveContato()} >
                        <Text style={style.buttonLabelTitle}>
                            ADICIONAR
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity style={style.setaEsquerda} onPress={() => this.props.navigation.goBack()}>
                    <Image source={setaesquerda} />
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}
export default NovoContato