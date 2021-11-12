import React from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'


import styles from './styles'


export function TextInputQuestion(){
    return (
        <View style={styles.viewAlign}>
            
            <TextInput
                placeholder="RESPOSTA"
                placeholderTextColor="#000"
                style={styles.textInputQuestion}
            />

        </View>
    )
}

export function DateSelectQuestion(){
    return(
        <View style={styles.viewAlign}>
            <View style={styles.card}>
                <TextInput placeholder="00" placeholderTextColor="#000" style={styles.textInputDate}></TextInput>
                <Text style={styles.label}>ANOS</Text>
            </View>
            <View style={styles.card}>
                <TextInput placeholder="00" placeholderTextColor="#000" style={styles.textInputDate}></TextInput>
                <Text style={styles.label}>MESES</Text>
            </View>
        </View>
    )
}

export function SelectInputQuestion(
    {
        listSelect=[],
        onItemSelected = ()=>{}
    }
){
    let list=[]
    for(var i =0;i<listSelect.length;i++){
        if(listSelect[i]){
            
        list.push(
            (
                <TouchableOpacity style={styles.optionInputView} onPress={onItemSelected} key={i}>
                    <Text style={styles.optionText}>{
                        listSelect[i]['descricao']? listSelect[i]['descricao']:'pergunta'
                    }</Text>
                </TouchableOpacity>
            )
        )
        }
    }
    return(
        <View style={styles.viewAlignOptions}>
            {list}
        </View>
    )
}