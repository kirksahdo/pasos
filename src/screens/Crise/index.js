import React, { Component } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import background from '../../../assets/black-background.png';
import iLigar from '../../../assets/icone-notificacoes.png';
import iLocal from '../../../assets/icone-inicio-ativo.png'
import styles from './styles';
import Firebase from "../../config/firebase.config";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import Loading from "../../components/Loading";

class Crise extends Component {

    state = {
        existeContatos : false,
        loading: true
    }
    constructor(props) {
        super(props)
        this.database = Firebase.database().ref('Contatos')
        this.uid = Firebase.auth().currentUser.uid

    }

    componentDidMount(){
        this.getContatos()
    }

    getContatos() {
        this.database.child(this.uid).on('value', querySnapShot => {
            this.setState({
                existeContatos: !!querySnapShot.val(),
                loading: false
            })
        })

    }

    clickAdicionarContato() {
        this.props.navigation.navigate("AddContato")
    }

    getErrorContatos() {
        if (this.state.contatosStatus.tocado && !this.state.contatosStatus.existeContatos) {
            return false
        }
        return true
    }

    clickContatos(){
        this.props.navigation.navigate("ListaContato")
    }

    render() {
        const Contantos = () => (
            <TouchableOpacity style={styles.button} onPress={() => this.clickContatos()} >
                <View style={styles.icone} >
                    <Image source={iLigar} />
                </View>
                <View style={styles.viewLabels}>
                    <Text style={styles.buttonLabelTitleLarge}>LIGUE</Text>
                    <Text style={styles.buttonLabelDescription}>
                        Para um dos
                        seus contatos
                        de emergência
                    </Text>
                </View>
            </TouchableOpacity>
        )
        const ErroContatos = () => (
            <View style={styles.errorInfor}>
                <Text style={styles.viewLabelTitleError}>ERRO!</Text>
                <Text style={styles.viewLabelDescriptionError}>
                VOCÊ AINDA NÃO ADICIONOU NENHUM CONTATO À LISTA. ADICIONE AGORA OU LOCALIZE O CAPS MAIS PRÓXIMO DE SUA LOCALIZAÇÃO ATUAL.
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => this.clickAdicionarContato()}>
                    <Text style={styles.buttonLabelTitle}>
                        ADICIONAR
                    </Text>
                </TouchableOpacity>
                <Text style={styles.viewLabelSeparator}>OU</Text>
            </View>
        )

        return (
            <ImageBackground source={background} style={styles.background}>
                <FocusAwareStatusBar barStyle='light-content' translucent backgroundColor="transparent" />
                <View style={styles.buttons}>

                    {this.state.existeContatos ? <Contantos /> : <ErroContatos />}

                    <TouchableOpacity style={styles.buttonLarge} >
                        <View style={styles.icone} >
                            <Image source={iLocal} />
                        </View>
                        <View style={styles.viewLabels}>
                            <Text style={styles.buttonLabelTitleLarge}>LOCALIZE</Text>
                            <Text style={styles.buttonLabelDescription}>
                                O CAPS mais próximo de sua localização.
                            </Text>
                        </View>

                    </TouchableOpacity>
                </View>
                {this.state.loading && <Loading />}
            </ImageBackground>
        )
    }
}
export default Crise