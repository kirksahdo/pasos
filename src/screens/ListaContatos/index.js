import React, { Component } from "react";
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, Linking} from "react-native"
import background from '../../../assets/black-background.png';
import styles from "./style";
import Firebase from "../../config/firebase.config";

import iconeContato from './../../../assets/icone-contato-pessoa.png'
import iconeAdd from './../../../assets/icone-add-branco.png'
import setaesquerda from '../../../assets/seta-esquerda-branca.png';

class ListaContatos extends Component {

    state = {
        contatos: [],
        uid: Firebase.auth().currentUser.uid
    }

    constructor(props) {
        super(props);
        this.database = Firebase.database().ref('Contatos');
    }
    async componentDidMount() {
        this.getContatos();
    }

    getContatos = () => {
        var countRef = this.database.child(this.state.uid);
        countRef.on('value', querySnapShot => {
            var contatosArray = []
            querySnapShot.forEach(item => {contatosArray.push(item.val())})
            this.setState({
                contatos: [...contatosArray]
            })
        });
    }


    callNumber = (number) => {
        Linking.openURL(`tel:${number}`)
    }

    render() {
        return (
            <ImageBackground source={background} style={styles.background}>
                <View style={styles.title}>
                    <Text style={styles.titleLabel}>CONTATOS</Text>
                </View>
                <FlatList 
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    data={this.state.contatos} 
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.contato} key={item.id}>
                                <View style={styles.contatoData}>
                                    <Image source={iconeContato} />
                                    <View style={styles.nomeContato} >
                                        <Text style={styles.labelNome}>{item.nome}</Text>
                                        <Text style={styles.labelContato}>{item.contato}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.btnLigar} onPress={() => this.callNumber(item.contato)}>
                                    <Text style={styles.btnLabel}>LIGAR</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
                <TouchableOpacity style={styles.setaEsquerda} onPress={() => this.props.navigation.goBack()}>
                    <Image source={setaesquerda} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addBranco} onPress={() => this.props.navigation.navigate('AddContato')}>
                    <Image source={iconeAdd} />
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}


export default ListaContatos