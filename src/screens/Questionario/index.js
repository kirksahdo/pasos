import React,{ Component } from "react";
import {Image, ImageBackground, Text, View} from 'react-native'

import background from '../../../assets/background.png'
import setaVoltar from '../../../assets/seta-esquerda-preta.png'

import styles from './styles'

class Questionario extends Component{
    render(){
        return (
            <ImageBackground style={styles.background} source={background}>
                <View style={styles.goBackArea} onTouchStart={()=> this.cancelAction()}>
                    <Image source={setaVoltar} style={styles.imgGoBackArea}/>
                </View>
                
            </ImageBackground>
        )
    }
}
export default Questionario