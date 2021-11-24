import React, {Component} from 'react'
import { Text,ImageBackground, View, Image, TouchableOpacity, Alert } from 'react-native'

import styles from './styles'

import background from '../../../assets/background.png'
import setaVoltar from '../../../assets/seta-volta-preta.png'
import personagem from '../../../assets/personagens-pensando-2.png'
import maca from '../../../assets/maca.png'
import caneca from '../../../assets/caneca.png'
import prato from '../../../assets/almoco.png'

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'

import { ProcessDashboardContext } from '../../context/dashboard.context'
import Firebase from '../../config/firebase.config'
import moment from 'moment'

class RotinaAlimentar extends Component{

    static contextType  = ProcessDashboardContext
    database = Firebase.database()
    user = Firebase.auth().currentUser;
    currentDate = moment().format('YYYY-MM-DD')
    currentH = moment().format('h a')
    values = [
        {
            id:1,
            title:'CAFÉ DA MANHÃ',
            description:'7h - 8h',
            icon:<Image source={caneca} style={styles.ico2} />,
            h:7
        },
        {
            id:2,
            title:'ALMOÇO',
            description:'11h - 12h',
            icon:<Image source={prato} style={styles.ico1} />,
            h:11
        },
        {
            id:3,
            title:'LANCHE',
            description:'15h - 16h',
            icon:<Image source={maca} style={styles.ico} />,
            h:15
        },
        {
            id:4,
            title:'JANTA',
            description:'19h - 20h',
            icon:<Image source={prato} style={styles.ico1} />,
            h:19
        }
    ]
    

    state ={
        isPrepared:false,
        checks:[
            false,
            false,
            false,
            false
        ],
        isCheckabble:[
            false,
            false,
            false,
            false
        ]
    }

    constructor(props) {
        super(props)

        var [h,a]= this.currentH.split(' ')
        h = Number.parseInt(h)
        if(a==="pm") h=h+12

        console.log(h)

        var nCheckAbble = this.state.isCheckabble
        var rotina = {cafe:false,almoco:false,lanche:false,janta:false}

        this.values.forEach((item,index)=>{
            if(item.h<=h){
                console.log('j')
                nCheckAbble[index]=true
            }
        })

        this.database.ref('Atividades')
            .child(this.user.uid)
            .child(this.currentDate)
            .get()
            .then(async(items)=>{
                if(items.hasChildren()){
                    items.forEach((item)=>{
                        if(item.toJSON().tipo==='rotina-alimentar'){
                            rotina = item.toJSON().rotina
                        }
                    })
                }
                this.setState({
                    isCheckabble:nCheckAbble,
                    checks:[
                        rotina.cafe,
                        rotina.almoco,
                        rotina.lanche,
                        rotina.janta
                    ]
                })
            })


        
    }
    componentWillUnmount(){

        var concluido = false
        var nCheck = this.state.checks
        var vYu = nCheck.filter((x)=> !x)
        if(!vYu.length) concluido = true

        this.database.ref('Atividades')
        .child(this.user.uid)
        .child(this.currentDate)
        .get()
        .then(async(items)=>{
            if(items.hasChildren()){
                items.forEach((item)=>{
                    if(item.toJSON().tipo==='rotina-alimentar'){
                        item.ref.update({
                            concluido: concluido,
                            rotina: {
                                cafe:nCheck[0],
                                almoco:nCheck[1],
                                lanche:nCheck[2],
                                janta:nCheck[3]
                            }
                        })
                    }
                })
            }
        })
    }
    cancelAction(){
        this.props.navigation.goBack(null)
    }
    CheckcompletExer(){
        this.context.concluirRotinaAlimentar(true,true,true,true)
        Alert.alert('Parabéns!', 'Você concluiu sua rotina alimentar!')
        this.props.navigation.navigate('Dashboard')
    }

    checkI(index){
        if(this.state.isCheckabble[index]){
            var nCheck = this.state.checks
            nCheck[index] = !nCheck[index]

            var vYu = nCheck.filter((x)=> !x)
            if(!vYu.length){
                this.CheckcompletExer()
            }else{
                this.setState({checks: nCheck})
            }
        }else{
            alert('Espere até o horário de ele ser concluido !')
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

    render(){

        return (
            <ImageBackground style={styles.background} source={background}>
                <FocusAwareStatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
                <View style={styles.goBackArea} onTouchStart={()=> this.cancelAction()}>
                    <Image source={setaVoltar} style={styles.imgGoBackArea}/>
                </View>
                {
                    this.renderRotineSelector()
                }

            </ImageBackground>
        )
    }
}
export default RotinaAlimentar