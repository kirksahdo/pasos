
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

    async function loadTasks(){
        database.ref('Atividades').child(user.uid).child(currentDate).get().then(async(items)=>{
            if(items.hasChildren()){
                items.forEach((item)=>{
                    if(item.toJSON().tipo =='Questionario' && item.toJSON().concluiu){
                        setConcluiuQuestionario(true)
                    }
                    if(item.toJSON().tipo=="Desafio" && item.toJSON().concluiu){
                        setConcluiuDesafio(true)
                    }
                })
            }else{
                const ref =database.ref('Atividades').child(user.uid).child(currentDate)
                const kQuest = ref.push().key
                const kChall = ref.push().key
                const kExerc = ref.push().key
                //const kRotAli = ref.push().key

                await ref.child(kQuest).set({
                    tipo:'questionario',
                    nome:'Questionario',
                    concluido:false
                })
                await ref.child(kChall).set({
                    tipo:'desafio',
                    nome:'Desafio',
                    concluido:false
                })
                await ref.child(kExerc).set({
                    tipo:'exercicio',
                    nome:'Exercicio',
                    concluido:false
                })
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
            console.log('Loaded data ...')
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
                            alert('Você concluir seu questionário diário !!')
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
                    console.log(child.ref)
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
                    console.log(child.ref)
                    if(child.val().tipo =="exercicio"){
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
                concluirExercicio
            }
            } >
            {children}
        </ProcessDashboardContext.Provider>
    )
} 