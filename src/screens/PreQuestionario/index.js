import React,{ Component } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";

import background from '../../../assets/background.png'
import setaVoltar from '../../../assets/seta-esquerda-preta.png'
import pensonagem from '../../../assets/personagens-pensando.png'


import styles from './styles'
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";

class PreQuestionario extends Component{

    cancelAction(){
        this.props.navigation.goBack(null)
    }
    nextAction(){
        this.props.navigation.goBack(null)
        this.props.navigation.navigate('Questionario')
    }

    render(){
        return (
            <ImageBackground style={styles.background} source={background}>
                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <View style={styles.goBackArea} onTouchStart={()=> this.cancelAction()}>
                    <Image source={setaVoltar} style={styles.imgGoBackArea}/>
                </View>
                <View>
                    <Text style={styles.title}>QUESTIONÁRIO</Text>
                </View>
                <View style={styles.areaDescription}>
                    <Text style={styles.description}>
                        ESTÁ PRONTO PARA RESPONDER ALGUMAS 
                        PERGUNTAS E NOS AJUDAR A
                        PERSONALIZAR SUA CAMINHADA?
                    </Text>
                </View>
                <View style={styles.alignItemCenter}>
                    <Image source={pensonagem} />
                </View>
                <View style={styles.alignItemCenter}>
                    <TouchableOpacity style={styles.buttomAction} onPress={()=>this.nextAction()}>
                        <Text>COMEÇAR</Text>
                    </TouchableOpacity>
                </View>
                
            </ImageBackground>
        )
        
    }
}
export default PreQuestionario