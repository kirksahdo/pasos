import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar, Image } from 'react-native'
import { DateUtils } from '../../common/date.utils'
import Firebase from '../../config/firebase.config'

import background from '../../../assets/white-background.png'
import iconePessoa from '../../../assets/icone-pessoa.png'

class Perfil extends Component {

    state = {
        nome: '',
        dataDeNascimento: '',
        peso: '',
        altura: '',
        idade: 0
    }

    constructor(props) {
        super(props);
        this.db = Firebase.database().ref('Users');
        this.db.child(Firebase.auth().currentUser.uid).on('value', snapshot => {
            if (snapshot.exists()) {
                let user = snapshot.val();
                this.setState({
                    nome: user.nome ? user.nome : '',
                    altura: user.altura ? user.altura : '',
                    peso: user.peso ? user.peso : '',
                    dataDeNascimento: user.dataDeNascimento ? DateUtils.MillisecToFormatedDate(user.dataDeNascimento) : '',
                    idade: DateUtils.old(user.dataDeNascimento)
                })
            }
        });
    }

    getUser = (uid) => {
        this.db.child(uid).get().then(snapshot => {
            if (snapshot.exists()) {
                let user = snapshot.val();
                this.setState({
                    nome: user.nome ? user.nome : '',
                    altura: user.altura ? user.altura : '',
                    peso: user.peso ? user.peso : '',
                    dataDeNascimento: user.dataDeNascimento ? DateUtils.MillisecToFormatedDate(user.dataDeNascimento) : '',
                    idade: DateUtils.old(user.dataDeNascimento)
                })
            }
        }).catch(error => {
            alert(error);
        });
    }

    render() {
        return (
            <ImageBackground source={background} style={styles.background}>
                <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <View style={styles.userNameAndPhoto}>
                    <Image source={iconePessoa} />
                    <Text style={styles.nome}>{this.state.nome}</Text>
                </View>
                <View style={styles.userData}>
                    <Text style={styles.data}>
                        {`${this.state.idade}\nANOS`}
                    </Text>
                    <Text style={styles.data}>
                        {`${this.state.peso}\nKG`}
                    </Text>
                    <Text style={styles.data}>
                        {`${this.state.altura}\nM`}
                    </Text>
                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20
    },
    userNameAndPhoto: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 25
    },
    nome: {
        marginTop: 17,
        fontFamily: 'newake',
        color: '#000',
        fontSize: 35,
        textTransform: 'uppercase'
    },
    userData: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    data: {
        fontFamily: 'pompadour',
        fontSize: 20,
        color: '#000',
        textAlign: 'center'
    }
})

export default Perfil;