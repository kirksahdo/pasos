
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

    function generateEventsDefault(Quest=true,Chall=true,Exerc=true,RotAli=true){

        const ref =database.ref('Atividades').child(user.uid).child(currentDate)

        if(Quest){
            const kQuest = ref.push().key
            ref.child(kQuest).set({
                tipo:'questionario',
                nome:'Questionário',
                concluido:false
            })
        }
        if(Chall){
            const kChall = ref.push().key
            ref.child(kChall).set({
                tipo:'desafio',
                nome:'Desafio',
                concluido:false
            })
        }
        if(Exerc){
            const kExerc = ref.push().key
            ref.child(kExerc).set({
                tipo:'exercicio',
                nome:'Exercício',
                concluido:false
            })
        }
        if(RotAli){
            const kRotAli = ref.push().key
            ref.child(kRotAli).set({
                tipo:'rotina-alimentar',
                nome:"Rotina Alimentar",
                concluido:false
            })
        }
    }
    async function loadTasks(){
        var hasQ=false,hasCh=false,hasEx = false,hasRotAli=false
        database.ref('Atividades').child(user.uid).child(currentDate).get().then(async(items)=>{
            if(items.hasChildren()){
                items.forEach((item)=>{
                    switch(item.toJSON().tipo){
                        case 'questionario':
                            hasQ = true
                            if(item.toJSON().concluiu){
                                setConcluiuQuestionario(true)
                            }
                            break;
                        case 'desafio':
                            hasCh = true
                            if(item.toJSON().concluiu){
                                setConcluiuDesafio(true)
                            }
                            break;
                        case "exercicio":
                            hasEx= true
                            break;
                        case 'rotina-alimentar':
                            hasRotAli = true;
                            break;
                        
                    }
                })
                generateEventsDefault(!hasQ,!hasCh,!hasEx,!hasRotAli)

            }else{
                generateEventsDefault()
            }
        })
        let currentQuestionarySet = 0
        database.ref('Users').child(user.uid).get().then(userData=>{
            var lastQuestionary = userData.toJSON().lastQuestionary || null
            var lastChallenge = userData.toJSON().lastChallenge || null
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
        loadTasks().then(()=>{
            console.info('Loaded data ...')
        })
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
            database.ref('Atividades')
            .child(user.uid)
            .child(moment().format('YYYY-MM-DD'))
            .on('value', snapshot => {
                if(snapshot.exists()){
                    let data = [];
                    snapshot.forEach((child) => {
                        if(child.val().tipo =="questionario"){
                            child.ref.update({
                                concluido:true
                            })
                            alert('Você concluiu seu questionário diário !!')
                        }
                    });
                }
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
                snapshot.forEach((child) => {
                    if(child.val().tipo =="desafio"){
                        child.ref.update({
                            concluido:true
                        })
                        alert('Você concluir seu desafio diário !!')
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
    function concluirExercicio(){
        database.ref('Atividades')
            .child(user.uid)
            .child(moment().format('YYYY-MM-DD'))
            .on('value', snapshot => {
            if(snapshot.exists()){
                snapshot.forEach((child) => {
                    if(child.val().tipo =="exercicio"){
                        child.ref.update({
                            concluido:true
                        })
                    }
                });
            }
        });
    }
    function concluirRotinaAlimentar(){
        database.ref('Atividades')
            .child(user.uid)
            .child(moment().format('YYYY-MM-DD'))
            .on('value', snapshot => {
            if(snapshot.exists()){
                snapshot.forEach((child) => {
                    if(child.val().tipo =="rotina-alimentar"){
                        child.ref.update({
                            concluido:true
                        })
                    }
                });
            }
        });
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
                concluirDesafio,
                concluirExercicio,
                concluirRotinaAlimentar
            }
            } >
            {children}
        </ProcessDashboardContext.Provider>
    )
} 