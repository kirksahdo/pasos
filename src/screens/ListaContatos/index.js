import React, { Component } from "react";
import { View, Text, ImageBackground, ScrollView } from "react-native"
import background from '../../../assets/black-background.png';
import styles from "./style";
import Firebase from "../../config/firebase.config";

class ListaContatos extends Component {

    state = {
        contatos: []
    }

    constructor(props) {
        super(props)
        this.database = Firebase.database().ref('Contatos')
        this.uid = Firebase.auth().currentUser.uid
    }
    async componentDidMount() {
        var contatosArray = []
        await this.database.child(this.uid).on('value', querySnapShot => {
            querySnapShot.forEach((item) => contatosArray.push(item.toJSON()))
            this.setState({
                contatos: contatosArray
            })
        });
    }

    render() {
        return (
            <ImageBackground source={background} style={styles.background}>
                <ScrollView>
                    <Text style={styles.viewLabelTitle}>CONTATOS</Text>
                    {
                        this.state.contatos.map((item) => (
                            <View>
                                <Text>{item.contato}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </ImageBackground>
        )
    }
}
export default ListaContatos