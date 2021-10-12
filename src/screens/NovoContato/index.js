import React, { Component } from "react";
import background from '../../../assets/black-background.png';
import { ImageBackground, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import style from './style.js'
import Firebase from '../../config/firebase.config';
import ContatoModel from "../../models/contato.model";

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
        const id = Date.now().toString()
        const contato = new ContatoModel(id, this.uid, this.state.nome, this.state.contato, this.state.observacao)
        await this.database.child(contato.uid).child(id).set(contato).then(() => {
            alert('Contanto Salvo ...')
            this.state({
                nome: '',
                contato: '',
                observacao: ''
            })
        })
    }
    render() {
        return (
            <ImageBackground source={background} style={style.background}>
                <ScrollView style={style.scroll}>
                    <View>
                        <Text style={style.viewLabelTitle}>ADICIONAR CONTATO</Text>
                    </View>
                    <View style={style.inputs}>
                        <TextInput
                            style={style.input}
                            placeholder='NOME'
                            value={this.state.nome}
                            onChangeText={text => this.setState({ nome: text })}
                        />
                        <TextInput
                            style={style.input}
                            placeholder='CONTATO'
                            keyboardType="phone-pad"
                            value={this.state.contato}
                            onChangeText={text => this.setState({ contato: text })}
                        />
                        <TextInput
                            style={style.input}
                            placeholder='OBSERVAÇÃO (OPCIONAL)'
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
            </ImageBackground>
        )
    }
}
export default NovoContato