import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import background from '../../../assets/background.png'
import setaVoltar from '../../../assets/seta-esquerda-preta.png'
import { ProcessDashboardContext } from "../../context/dashboard.context";

import player_happy from '../../../assets/personagem-comememorando.png'
import player_init from '../../../assets/pensagem-olhando.png'

import styles from './styles'

class Desafios extends Component{

    static contextType  = ProcessDashboardContext
    state ={
        complet:false
    }

    constructor(props) {
        super(props)
    }

    completTask(){
        //this.setState({complet:true});
        this.context.concluirDesafio()
    }

    cancelAction(){
        this.props.navigation.goBack(null)
    }
    desafio(){
        return (
            <View style={styles.viewMain}>
                <View>
                    <Text style={styles.titleChallenge}>
                        { "Desafio "+(this.context.currentChallenge+1)}
                    </Text>
                    <Text style={styles.TextDescription}>
                            {
                                this.context.challenge.descricao || "Erro"
                            }
                    </Text>
                    <View style={styles.viewImage}>
                        <Image source={
                            this.state.complet? player_happy:player_init
                            } style={styles.imgPersonagem} />
                        {
                            this.state.complet?null:(
                                <TouchableOpacity style={styles.buttom} onPress={()=>this.completTask()}>
                                    <Text style={styles.buttomText}>FEITO</Text>
                                </TouchableOpacity>
                            )
                        }
                        
                    </View>
                    
                </View>
            </View>
        )
    }

    render(){
        return (
            <ImageBackground style={styles.background} source={background}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.goBackArea} onTouchStart={()=> this.cancelAction()}>
                        <Image source={setaVoltar} style={styles.imgGoBackArea}/>
                    </View>
                    {
                        this.desafio()
                    }
                </ScrollView>
            </ImageBackground>
        )
    }
}

export default Desafios