import React,{Component} from 'react'
import {View,Text,ImageBackground, Image, TouchableOpacity, ScrollView} from 'react-native'
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
    
    e1v= this.getRandomValue()
    e2v= this.getRandomValue()
    e3v= this.getRandomValue()
    e4v= this.getRandomValue()
    e5v= this.getRandomValue()

    state ={
        isPrepared:true,
        e1:false,
        e2:false,
        e3:false,
        e4:false,
        e5:false
    }

    completExer(){
        this.context.concluirExercicio()
        alert('Você concluiu seus exercícios diários !!')
        this.props.navigation.goBack(null)
    }
    

    renderExerc(){
        if(this.state.e1 && this.state.e2 && this.state.e3 && this.state.e4 && this.state.e5){
            this.completExer()
        }
        return(
            <View>
                <View>
                    <Text style={styles.title}>TREINO FÍSICO</Text>
                </View>
                
                <View style={styles.alignItemCenter}>
                    <TouchableOpacity style={[styles.areaAction,styles.areaSelect]} onPress={
                        ()=> {
                            this.setState({e1:!this.state.e1})
                        }
                    }>
                        <View style={styles.l_area}>
                            <Text style={styles.descriptionExer}>{this.e1v +" POLICHINELOS"}</Text>
                        </View>
                        <View style={styles.r_area}>
                            <View style={[
                                styles.checkbox_area,
                                this.state.e1?styles.checked:null
                                ]}>
                                

                            </View>
                         
                        </View>
                    </TouchableOpacity>
                    
                </View>
                
                <View style={styles.alignItemCenter}>
                    <TouchableOpacity style={[styles.areaAction,styles.areaSelect]} onPress={()=> this.setState({e2:!this.state.e2})}>
                        <View style={styles.l_area}>
                            <Text style={styles.descriptionExer}>{this.e2v +" AGACHAMENTOS"}</Text>
                        </View>
                        <View style={styles.r_area}>
                            <View style={[
                                styles.checkbox_area,
                                this.state.e2?styles.checked:null
                                ]}>
                                

                            </View>
                         
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.alignItemCenter}>
                    <TouchableOpacity style={[styles.areaAction,styles.areaSelect]} onPress={()=> this.setState({e3:!this.state.e3})}>
                        <View style={styles.l_area}>
                            <Text style={styles.descriptionExer}>{this.e3v +" FLEXÕES"}</Text>
                        </View>
                        <View style={styles.r_area}>
                            <View style={[
                                styles.checkbox_area,
                                this.state.e3?styles.checked:null
                                ]}>
                                

                            </View>
                         
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.alignItemCenter}>
                    <TouchableOpacity style={[styles.areaAction,styles.areaSelect]} onPress={()=> this.setState({e4:!this.state.e4})}>
                        <View style={styles.l_area}>
                            <Text style={styles.descriptionExer}>{this.e4v +"S DE CORRIDA ESTACIONADA"}</Text>
                        </View>
                        <View style={styles.r_area}>
                            <View style={[
                                styles.checkbox_area,
                                this.state.e4?styles.checked:null
                                ]}>
                                

                            </View>
                         
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={[styles.alignItemCenter, {marginBottom: 150}]}>
                    <TouchableOpacity style={[styles.areaAction,styles.areaSelect]} onPress={()=> this.setState({e5:!this.state.e5})}>
                        <View style={styles.l_area}>
                            <Text style={styles.descriptionExer}>{this.e5v +"S DE PRANCHA"}</Text>
                        </View>
                        <View style={styles.r_area}>
                            <View style={[
                                styles.checkbox_area,
                                this.state.e5?styles.checked:null
                                ]}>
                                

                            </View>
                         
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
                <View style={styles.alignItemCenter}>
                    <Image source={pensonagemInicioExercicio} />
                </View>
                <View style={styles.alignItemCenter}>
                    <TouchableOpacity style={[styles.areaAction,styles.buttomArea]} onPress={()=>this.nextAction()}>
                        <Text>COMEÇAR</Text>
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
                <ScrollView>
                    {
                        this.state.isPrepared? this.renderExerc():this.renderPreExerc()
                    }
                </ScrollView>
                
            </ImageBackground>
        )
    }
}
export default Exercicios