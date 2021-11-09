import React from 'react'
import {Text, TextInput, View} from 'react-native'

import retangleSelector from '../../../assets/retangle-rounded-blank.png'


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