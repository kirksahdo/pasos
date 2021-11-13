import React from "react"
import { Text, View } from "react-native"
import styles from "./styles"

export function DotProgressIndicator(
    props
){
    let row =[]
    for(var i=0;i<props.numDots;i++ ){
        var styledot = styles.blankColor;
        if(i+1<=props.currentProgess){
            styledot = styles.blackDot;
        }
        row.push(
            <View style={[styledot,styles.dotStyle]} key={i}>
            </View>
        )
    }
    return (
        <View style={styles.viewAlign}>
            {row}
        </View>
    )
}