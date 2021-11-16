
import React, { createContext, useEffect, useState } from "react";

import moment from "moment";
import Firebase from "../config/firebase.config";

export const ProcessDashboardContext = createContext({})

export const ProcessDashboardContextProvider = ({children}) => {

    const [concluiuQuestionario,setConcluiuQuestionario] = useState(false)
    const [concluiuDesafio,setConcluiuDesafio] = useState(false)

    const [currentChallenge,setCurrentChallenge] = useState(0)
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [currentQuestionaryName,setCurrentQuestionaryName] = useState(-1)

    const [challenge,setChallenge] = useState({})
    const [questionary,setQuestionary] = useState([])
    const [navigation,setNavigation] = useState(()=>{})

    const database = Firebase.database()
    const user = Firebase.auth().currentUser;
    const currentDate = moment().format('YYYY-MM-DD')

    function loadTasks(){
        database.ref('Atividades').child(user.uid).child(currentDate).get().then((items)=>{
            if(items){
                items.forEach((item)=>{
                    if(item.toJSON().tipo =='Questionario' && item.toJSON().concluiu){
                        setConcluiuQuestionario(true)
                    }
                    if(item.toJSON.tipo=="Desafio" && item.toJSON().concluiu){
                        setConcluiuDesafio(true)
                    }
                })
            }
        })
        let currentQuestionarySet = 0
        database.ref('Users').child(user.uid).get().then(userData=>{
            var lastQuestionary = userData.toJSON().lastQuestionary
            var lastChallenge = userData.toJSON().lastChallenge
            if(lastQuestionary==null){
                lastQuestionary=-1
            }
            if(lastChallenge == null){
                lastChallenge = -1
            }
            if(!isNaN(lastQuestionary)){
                currentQuestionarySet = lastQuestionary+1
                if((currentQuestionarySet)>=11){
                    currentQuestionarySet=0
                }
                
                const refQuestionary = database
                    .ref('Questionario')
                    .child(currentQuestionarySet)
                    
                    refQuestionary.on('value', querySnapShot => {
                        var questionarioArray = []
                        querySnapShot.forEach(item => {questionarioArray.push(item.val())})
                        setQuestionary([...questionarioArray])
                        setCurrentQuestion(1)
                        setCurrentQuestionaryName(currentQuestionarySet)
                    })
                        
            }
            if(!isNaN(lastChallenge)){
                var currentChallengeSet = lastChallenge+1
                if((currentChallengeSet)>=8){
                    currentChallengeSet=0
                }
                const refChallenge = database
                    .ref('Desafios')
                    .child(currentChallengeSet)
                    
                refChallenge.on('value', querySnapShot => {
                    setChallenge(querySnapShot.toJSON())
                    setCurrentChallenge(currentChallengeSet)
                })
            }
        })
        
        
    }
    useEffect(()=>{
        loadTasks()
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
    function concluirDesafio(){
        //INSERIR COMO CONCLUIDO DESAFIO DO DIA
        database.ref('Atividades')
            .child(user.uid)
            .child(moment().format('YYYY-MM-DD'))
            .on('value', snapshot => {
            if(snapshot.exists()){
                let data = [];
                snapshot.forEach((child) => {
                    console.log(child.ref)
                    if(child.val().tipo =="desafio"){
                        child.ref.update({
                            concluido:true
                        })
                    }
                });
            }
        });
        database.ref('Users').child(user.uid).update(
            {
                lastChallenge:currentChallenge
            }
        )
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
                setNavigation,
                challenge,
                concluiuDesafio,
                currentChallenge,
                concluirDesafio
            }
            } >
            {children}
        </ProcessDashboardContext.Provider>
    )
} 