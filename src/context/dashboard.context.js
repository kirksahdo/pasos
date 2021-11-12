
import React, { createContext, useEffect, useState } from "react";

import moment from "moment";
import Firebase from "../config/firebase.config";

export const ProcessDashboardContext = createContext({})

export const ProcessDashboardContextProvider = ({children}) => {

    const [concluiuQuestionario,setConcluiuQuestionario] = useState(false)
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [currentQuestionaryName,setCurrentQuestionaryName] = useState(-1)
    const [questionary,setQuestionary] = useState([])
    const [navigation,setNavigation] = useState(()=>{})

    const database = Firebase.database()
    const user = Firebase.auth().currentUser;
    const currentDate = moment().format('YYYY-MM-DD')

    function loadQuestionary(){
        database.ref('Atividades').child(user.uid).child(currentDate).get().then((items)=>{
            if(items){
                items.forEach((item)=>{
                    if(item.toJSON().tipo =='Questionario' && item.toJSON().concluiuQuestionario){
                        setConcluiuQuestionario(true)
                    }
                })
            }
        })
        let currentQuestionarySet = 0
        database.ref('Users').child(user.uid).get().then(userData=>{
            var lastQuestionary = userData.toJSON().lastQuestionary
            if(lastQuestionary==null){
                lastQuestionary=-1
            }
            if(!isNaN(lastQuestionary)){
                currentQuestionarySet = lastQuestionary+1
                if((currentQuestionarySet)>=11){
                    currentQuestionarySet=0
                }
                console.log(currentQuestionarySet)
                
                const ref = database
                    .ref('Questionario')
                    .child(currentQuestionarySet)
                    
                    ref.on('value', querySnapShot => {
                        var questionarioArray = []
                        querySnapShot.forEach(item => {questionarioArray.push(item.val())})
                        setQuestionary([...questionarioArray])
                        setCurrentQuestion(1)
                        setCurrentQuestionaryName(currentQuestionarySet)
                    })
                        
                }
        })
        
        
    }
    useEffect(()=>{
        loadQuestionary()
    },[])

    function proximaQuestao(){
        let nValue = currentQuestion+1
        if(nValue<=questionary.length){
            setCurrentQuestion(nValue)
        }else if(nValue>=questionary.length){
            database.ref('Users').child(user.uid).update(
                {
                    lastQuestionary:currentQuestionaryName
                }
            )
            const key = database.ref('Atividades')
                .child(user.uid)
                .child(moment().format('YYYY-MM-DD')).push().key;
            
            database.ref('Atividades').child(user.uid).child(moment().format('YYYY-MM-DD')).child(key).set({
                    id: key,
                    tipo: 'Questionario',
                    nome: 'Questionario '+currentQuestionaryName,
                    concluiuQuestionario: true,
                });
            setCurrentQuestion(0)
            setConcluiuQuestionario(true)
            navigation.navigate('Dashboard')
        }
    }
    function anteriorQuestao(){
        let nValue = currentQuestion-1
        if(nValue>0){
            setCurrentQuestion(nValue)
        }
    }

    return (
        <ProcessDashboardContext.Provider value={
            {
                concluiuQuestionario,
                currentQuestion,
                currentQuestionaryName,
                questionary,
                proximaQuestao,
                anteriorQuestao,
                setNavigation
            }
            } >
            {children}
        </ProcessDashboardContext.Provider>
    )
} 