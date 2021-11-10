import React,{ Component } from "react";
import {Image, ImageBackground, ScrollView, Text, View} from 'react-native'

import Firebase from '../../config/firebase.config';
import moment from "moment";

import background from '../../../assets/background.png'
import setaVoltar from '../../../assets/seta-esquerda-preta.png'
import pensonagem from '../../../assets/personagens-pensando-2.png'
import setaInferiorVoltar from '../../../assets/seta-volta-preta.png'
import setaInferiorIda from '../../../assets/seta-ida-preta.png'


import styles from './styles'
import { DateSelectQuestion, SelectInputQuestion, TextInputQuestion } from "../../components/Inputs/Inputs";
import { DotProgressIndicator } from "../../components/DotProgressIndicator";

class Questionario extends Component{

    constructor(props) {
        super(props)
    }
    state ={
        concluido:false,
        questionary:[],
        currentQuestion:0,
        currentQuestionarySet:'S1'
    }
    currentDate = moment().format('YYYY-MM-DD')
    user = Firebase.auth().currentUser;
    database = Firebase.database()

    componentDidMount(){
        this.database.ref('Atividades').child(this.user.uid).child(this.currentDate).get().then((items)=>{
            if(items){
                items.forEach((item)=>{
                    if(item.toJSON().tipo =='Questionario' && item.toJSON().concluido){
                        this.setState({concluido:true})
                    }
                })
            }
        })
        let currentQuestionarySet = 'S1'
        this.database.ref('Users').child(this.user.uid).get().then(userData=>{
            var lastQuestionary = ""+userData.toJSON().lastQuestionary
            if(!lastQuestionary){
                lastQuestionary="S0"
            }
            if(lastQuestionary){
                let numberLastQuestionary = Number.parseInt(lastQuestionary.split('S')[1])
                if(!isNaN(numberLastQuestionary)){
                    if((numberLastQuestionary+1)>14){
                        numberLastQuestionary=0
                    }
                    currentQuestionarySet = "S"+(numberLastQuestionary+1)
                    
                    const ref = this.database
                        .ref('Questionario')
                        .child(currentQuestionarySet)
                    
                    ref.on('value', querySnapShot => {
                        var questionarioArray = []
                        querySnapShot.forEach(item => {questionarioArray.push(item.val())})
                        
                        this.setState({
                            questionary: [...questionarioArray],
                            currentQuestion:1,
                            currentQuestionarySet:currentQuestionarySet
                        })
                        
                    })
                        
                }
            }
        })
        
        
        
    } 

    opterTipoInput(id){
        const input = this.state.questionary[id].input
        switch(input){
            case 'select':
                const list=this.state.questionary[id].opcoes
                return (<SelectInputQuestion listSelect={list} />)
            case 'date':
                return (<DateSelectQuestion/>)
            default:
                return (<TextInputQuestion/>)
        }
    }

    proximaQuestao(){
        let nValue = this.state.currentQuestion+1
        if(nValue<=this.state.questionary.length){
            this.setState({currentQuestion:nValue})
        }else if(nValue>=this.state.questionary.length){
            this.database.ref('Users').child(this.user.uid).update(
                {
                    lastQuestionary:this.state.currentQuestionarySet
                }
            )
            const key = this.database.ref('Atividades')
                .child(this.user.uid)
                .child(moment().format('YYYY-MM-DD')).push().key;
            
            this.database.ref('Atividades').child(this.user.uid).child(moment().format('YYYY-MM-DD')).child(key).set({
                    id: key,
                    tipo: 'Questionario',
                    nome: 'Questionario '+this.state.currentQuestionarySet,
                    concluido: true,
                });
            this.props.navigation.navigate('Dashboard')
        }
    }
    anteriorQuestao(){
        let nValue = this.state.currentQuestion-1
        if(nValue>=0){
            this.setState({currentQuestion:nValue})
        }
    }
    validarProximoQuestionario(){
        if(!this.state.concluido && this.state.currentQuestion){
            return (
                <View style={styles.viewMain}>
                    <View>
                        <Text style={styles.progressNumberText}>{this.state.currentQuestion}/{this.state.questionary.length}</Text>
                        <Text style={styles.questionDescription}>
                            {
                                this.state.questionary[this.state.currentQuestion-1].descricao?
                                    this.state.questionary[this.state.currentQuestion-1].descricao:
                                'Erro na Pergunta'
                            }
                        </Text>
                        {
                            this.opterTipoInput(
                                this.state.currentQuestion-1
                                )
                        }
                    </View>
                    
                    <Image source={pensonagem} style={styles.imgPersonagem} />

                    <View>
                        <View style={styles.alignFlex}>
                            <Image source={setaInferiorVoltar} onTouchStart={()=>this.anteriorQuestao()}/>
                            <DotProgressIndicator 
                                numDots={this.state.questionary.length} 
                                currentProgess={this.state.currentQuestion}
                            />
                            <Image source={setaInferiorIda} onTouchStart={()=>this.proximaQuestao()}/>
                        </View>
                    </View>     
                </View>
                
            )
        }else if(this.state.concluido){
            return <Text style={styles.progressNumberText}>Você concluiu o questionario de hoje</Text>
        }else{
            return <Text style={styles.progressNumberText}>Carregando ...</Text>
        }
    }

    render(){
        return (
            
            <ImageBackground style={styles.background} source={background}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.goBackArea} onTouchStart={()=> this.cancelAction()}>
                        <Image source={setaVoltar} style={styles.imgGoBackArea}/>
                    </View>
                    {
                        this.validarProximoQuestionario()
                    }
                </ScrollView>
            </ImageBackground>
            
        )
    }
}
export default Questionario