import React, { Component } from "react";
import background from '../../../assets/black-background.png';
import { ImageBackground, Text, View, TextInput, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import style from './style.js'
import Firebase from '../../config/firebase.config';
import ContatoModel from "../../models/contato.model";
import Loading from "../../components/Loading";

import setaesquerda from '../../../assets/seta-esquerda-branca.png';
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";

class NovoContato extends Component {
    state = {
        nome: '',
        contato: '',
        observacao: '',
        loading: false
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
        this.setState({loading: true}, () => {
            const id = Date.now().toString()
            const contato = new ContatoModel(id, this.uid, this.state.nome, this.state.contato, this.state.observacao)
            this.database.child(contato.uid).child(id).set(contato).then((_) => {
                Alert.alert('Sucesso!', 'O contato foi salvo com êxito!');
                this.props.navigation.goBack();
            })
        });
        
    }

    onChangeNumber = (text) => {
        let r = text.replace(/\D/g, "");
        r = r.replace(/^0/, "");

        if (r.length > 11) {
            r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (r.length > 7) {
            r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
        } else if (r.length > 2) {
            r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else if (text.trim() !== "") {
            r = r.replace(/^(\d*)/, "($1");
        }
        this.setState({contato: r});
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
                            onChangeText={this.onChangeNumber}
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
                {this.state.loading && <Loading />}
            </ImageBackground>
        )
    }
}
export default NovoContato