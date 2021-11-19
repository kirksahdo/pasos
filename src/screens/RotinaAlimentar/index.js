import React, {Component} from 'react'
import { Text,ImageBackground, View, Image, TouchableOpacity } from 'react-native'

import styles from './styles'

import background from '../../../assets/background.png'
import setaVoltar from '../../../assets/seta-esquerda-preta.png'
import personagem from '../../../assets/personagens-pensando-2.png'
import maca from '../../../assets/maca.png'
import caneca from '../../../assets/caneca.png'
import prato from '../../../assets/almoco.png'

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'

import { ProcessDashboardContext } from '../../context/dashboard.context'

class RotinaAlimentar extends Component{

    static contextType  = ProcessDashboardContext

    state ={
        isPrepared:false
    }

    constructor(props) {
        super(props)
    
    }
    componentDidMount(){
        this.setState({
            checks:[
                false,
                false,
                false,
                false
            ]
        })
        this.values = [
            {
                id:1,
                title:'CAFÉ DA MANHÃ',
                description:'7h - 8h',
                icon:<Image source={caneca} style={styles.ico} />
            },
            {
                id:2,
                title:'ALMOÇO',
                description:'11h - 12h',
                icon:<Image source={prato} style={styles.ico} />
            },
            {
                id:3,
                title:'LANCHE',
                description:'15h - 16h',
                icon:<Image source={maca} style={styles.ico} />
            },
            {
                id:4,
                title:'JANTA',
                description:'19h - 20h',
                icon:<Image source={prato} style={styles.ico} />
            }
        ]
    }

    cancelAction(){
        this.props.navigation.goBack(null)
    }
    nextAction(){
        this.setState({isPrepared:true})
    }

    renderPreRotine(){
        return (
            <View>
                <View>
                    <Text style={styles.title}>ROTINA ALIMENTAR</Text>
                </View>
                <View>
                    <Text style={styles.description}>Você já foi em um nutricionista RECENTEMENTE?</Text>
                </View>
                <View style={styles.alignItemCenter}>
                    <Image source={personagem} />
                </View>

                <View style={styles.alignItemCenter}>
                    <TouchableOpacity style={[styles.areaAction,styles.buttomArea,styles.primary_background]} onPress={()=>this.nextAction()}>
                        <Text>SIM</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.alignItemCenter}>
                    <TouchableOpacity style={[styles.areaAction,styles.buttomArea,styles.neutra_background]} onPress={()=>this.nextAction()}>
                        <Text style={styles.font_color_black}>NÃO</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    CheckcompletExer(){
        this.context.concluirRotinaAlimentar()
        alert('Você concluiu sua rotina alimentar !!')
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

    renderRotineSelector(){
        return(
            <View>
                <View>
                    <Text style={styles.title}>ROTINA ALIMENTAR</Text>
                </View>
                {
                    this.values.map((item,index)=>(
                        <View style={styles.alignItemCenter} key={index}>
                            <TouchableOpacity style={[styles.areaAction,styles.areaSelect]} onPress={()=>this.checkI(index)}>
                                <View style={styles.r_area}>
                                    {
                                        item.icon
                                    }
                                </View>
                                <View style={styles.m_area}>
                                    <Text style={styles.titleSelect}>{item.title}</Text>
                                    <Text style={styles.descriptionSelect}>{item.description}</Text>
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
            </View>
        )
    }

    getViewContext(){
        if(this.state.isPrepared){
            return this.renderRotineSelector()
        }else{
            return this.renderPreRotine()
        }
    }

    render(){

        return (
            <ImageBackground style={styles.background} source={background}>
                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <View style={styles.goBackArea} onTouchStart={()=> this.cancelAction()}>
                    <Image source={setaVoltar} style={styles.imgGoBackArea}/>
                </View>
                {
                    this.getViewContext()
                }

            </ImageBackground>
        )
    }
}
export default RotinaAlimentar