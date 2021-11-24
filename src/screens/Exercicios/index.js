import React,{Component} from 'react'
import {View,Text,ImageBackground, Image, TouchableOpacity, ScrollView, Alert} from 'react-native'
import styles from './styles'

import background from '../../../assets/background.png'
import setaVoltar from '../../../assets/seta-esquerda-preta.png'
import pensonagemInicioExercicio from '../../../assets/p-exercitando0.png'
import { ProcessDashboardContext } from '../../context/dashboard.context'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'

class Exercicios extends Component {

    static contextType  = ProcessDashboardContext

    constructor(props) {
        super(props)
    }

    getRandomValue(min=1, max=6) {
        return Number.parseInt(Math.random() * (max - min) + min)*5;
    }

    componentDidMount(){
        this.setState({
            checks:[
                false,
                false,
                false,
                false,
                false
            ]
        })
        this.values =[
            {
                description: this.getRandomValue()+" POLICHINELOS"
            },
            {
                description: this.getRandomValue()+" AGACHAMENTOS"
            },
            {
                description: this.getRandomValue()+" FLEXÕES"
            },
            {
                description: this.getRandomValue()+"S DE CORRIDA ESTACIONADA"
            },
            {
                description: this.getRandomValue()+"S DE PRANCHA"
            }

        ]
    }
    state ={
        isPrepared:false
    }

    CheckcompletExer(){
        this.context.concluirExercicio()
        Alert.alert('Parabéns!', 'Você concluiu seus exercícios diários!')
        this.props.navigation.navigate('Dashboard')
    }
    checkI(index){
        var nCheck = this.state.checks
        nCheck[index] = !nCheck[index]

        var vYu = nCheck.filter((x)=> !x)
        if(!vYu.length){
            this.CheckcompletExer()
        }else{
            this.setState({checks: nCheck})
        }
        
    }
    
    renderExercF(){
        return this.values.map((item,index) => (
            <View style={styles.alignItemCenter} key={index}>
                    <TouchableOpacity style={[styles.areaAction,styles.areaSelect]} onPress={()=>this.checkI(index)}>
                        <View style={styles.l_area}>
                            <Text style={styles.descriptionExer}>{item.description}</Text>
                        </View>
                        <View style={styles.r_area}>
                            <View style={[
                                styles.checkbox_area,
                                this.state.checks[index]?styles.checked:null
                                ]}>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                </View>
        ))

    }
    cancelAction(){
        this.props.navigation.goBack(null)
    }
    nextAction(){
        this.setState({isPrepared:true})
    }

    renderPreExerc(){
        return(
            <View>
                
                <View>
                    <Text style={styles.title}>TREINO FÍSICO</Text>
                </View>
                <View style={styles.areaDescription}>
                    <Text style={styles.description}>
                        ESTÁ PRONTO PARA COMEÇAR SEU 
                        TREINO FÍSICO DE HOJE?

                    </Text>
                </View>
                <View style={[styles.alignItemCenter]}>
                    <Image source={pensonagemInicioExercicio} style={styles.imgPlayer} />
                </View>
                <View style={styles.alignItemCenter}>
                    <TouchableOpacity style={[styles.areaAction,styles.buttomArea]} onPress={()=>this.nextAction()}>
                        <Text style={{color: '#fff'}}>COMEÇAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(){
        return(
            <ImageBackground style={styles.background} source={background}>
                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <View style={styles.goBackArea} onTouchStart={()=> this.cancelAction()}>
                    <Image source={setaVoltar} style={styles.imgGoBackArea}/>
                </View>
                <ScrollView keyboardShouldPersistTaps="always">
                    {
                        this.state.isPrepared? this.renderExercF():this.renderPreExerc()
                    }
                </ScrollView>
                
            </ImageBackground>
        )
    }
}
export default Exercicios