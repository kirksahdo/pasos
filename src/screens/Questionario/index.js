import React,{ Component, useContext } from "react";
import {Image, ImageBackground, ScrollView, Text, View} from 'react-native'

import background from '../../../assets/background.png'
import setaVoltar from '../../../assets/seta-esquerda-preta.png'
import pensonagem from '../../../assets/personagens-pensando-2.png'
import setaInferiorVoltar from '../../../assets/seta-volta-preta.png'
import setaInferiorIda from '../../../assets/seta-ida-preta.png'


import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

import styles from './styles'
import { DateSelectQuestion, SelectInputQuestion, TextInputQuestion } from "../../components/Inputs/Inputs";
import { DotProgressIndicator } from "../../components/DotProgressIndicator";
import { ProcessDashboardContext } from "../../context/dashboard.context";

class Questionario extends Component{

    static contextType  = ProcessDashboardContext


    constructor(props) {
        super(props)
    }
    

    opterTipoInput(id){
        const input = this.context.questionary[id].input
        switch(input){
            case 'select':
                const list=this.context.questionary[id].opcoes
                return (<SelectInputQuestion listSelect={list} onItemSelected={()=>this.context.proximaQuestao()}/>)
            case 'date':
                return (<DateSelectQuestion/>)
            default:
                return (<TextInputQuestion/>)
        }
    }

    componentDidMount(){
        this.context.setNavigation(this.props.navigation)
    }

    cancelAction(){
        this.props.navigation.goBack(null)
    }

    questao(){
        if(
            !this.context.concluiuQuestionario
            && this.context.currentQuestion 
            && this.context.questionary.length
        ){
            return (
                <View style={styles.viewMain}>
                    <View>
                        <Text style={styles.progressNumberText}>
                            {this.context.currentQuestion}/{this.context.questionary.length}
                        </Text>
                        <Text style={styles.questionDescription}>
                            {
                                this.context.questionary[this.context.currentQuestion-1].descricao?
                                this.context.questionary[this.context.currentQuestion-1].descricao:
                                'Erro na Pergunta'
                            }
                        </Text>
                        {
                            this.opterTipoInput(
                                this.context.currentQuestion-1
                                )
                        }
                    </View>
                    
                    <Image source={pensonagem} style={styles.imgPersonagem} />

                    <View>
                        <View style={[styles.alignFlex, {paddingBottom: 30}]}>
                            <Image style={styles.icoSeta} source={setaInferiorVoltar} onTouchStart={()=>this.context.anteriorQuestao()}/>
                            <DotProgressIndicator 
                                numDots={this.context.questionary.length} 
                                currentProgess={this.context.currentQuestion}
                            />
                            <Image style={styles.icoSeta} source={setaInferiorIda} onTouchStart={()=>this.context.proximaQuestao()}/>
                        </View>
                    </View>     
                </View>
                
            )
        }else if(this.context.concluiuQuestionario){
            return <Text style={styles.progressNumberText}>Você concluiu o questionario de hoje</Text>
        }else{
            return <Text style={styles.progressNumberText}>Carregando...</Text>
        }
    }

    render(){
        return (
            
            <ImageBackground style={styles.background} source={background}>
                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <ScrollView keyboardShouldPersistTaps="always" style={styles.scroll}>
                    <View style={styles.goBackArea} onTouchStart={()=> this.cancelAction()}>
                        <Image source={setaVoltar} style={styles.imgGoBackArea}/>
                    </View>
                    {
                        this.questao()
                    }
                </ScrollView>
            </ImageBackground>
            
        )
    }
}
export default Questionario