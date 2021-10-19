import React from 'react'
import { Text, TouchableOpacity, View} from 'react-native'

import styles from './styles'


const CardDays = ({ dayWeek = 'TER', day = 1, isComplet = true, index }) => {

    const getStyleIndex = () => {
        if(index == 0 || index == 4){
            return styles.small;
        }
        else if(index == 1 || index == 3){
            return styles.medium;
        }
        else if(index == 2){
            return styles.large;
        }
        return {};
    }

    const getStyleCompleted = () => {
        return isComplet ? styles.complete : {};
    }

    return (
        <TouchableOpacity>
            <View style={[styles.container, getStyleIndex(), getStyleCompleted()]}>
                <Text style={styles.textTitle}>{dayWeek}</Text>
                <Text style={styles.textDay}>{day.toString()}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardDays
