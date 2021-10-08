import React, {Component} from 'react';
import {Text, View, TextInput, StatusBar, ImageBackground, TouchableOpacity, Image, ScrollView} from 'react-native';

import background from '../../../assets/background.png';
import setaesquerda from '../../../assets/seta-esquerda-preta.png';

import styles from './styles';

class EditarPerfil extends Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        dataDeNascimento: '',
        peso: '',
        altura: ''
    };

    render(){
        return (
            <ImageBackground source={background} style={styles.background}>
                
                <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <ScrollView style={styles.scroll}>
                    <View style={styles.form}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Editar Perfil</Text>
                        </View>
                        <View style={styles.inputs}>
                            <TextInput placeholder='NOME' style={styles.input} value={this.state.nome} onChangeText={text => this.setState({nome: text})} />
                            <TextInput placeholder='EMAIL' style={styles.input} value={this.state.email} onChangeText={text => this.setState({email: text})} />
                            <TextInput placeholder='SENHA' style={styles.input} value={this.state.senha} onChangeText={text => this.setState({senha: text})} />
                            <TextInput placeholder='DATA DE NASCIMENTO' style={styles.input} value={this.state.dataDeNascimento} onChangeText={text => this.setState({dataDeNascimento: text})} />
                            <TextInput placeholder='PESO' style={styles.input} value={this.state.peso} onChangeText={text => this.setState({peso: text})} />
                            <TextInput placeholder='ALTURA' style={styles.input} value={this.state.altura} onChangeText={text => this.setState({altura: text})} />
                            <TouchableOpacity style={styles.btnAdicionar} title='Adicionar'>
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

export default EditarPerfil;