import React from 'react'
import retangleRoundedY from '../../../assets/retangle-rounded-yellow.png'
import retangleRoundedB from '../../../assets/retangle-rounded-blank.png'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'


const CardDays = ({ dayWeek = 'TER', day = 1, isComplet = true }) => {
    return (
        <TouchableOpacity >
            <Image source={isComplet ? retangleRoundedY : retangleRoundedB} style={styles.imageDays} />
            <View style={styles.absoluteView}>

                <Text style={styles.textTitle}>{dayWeek}</Text>
                <Text style={styles.textDay}>{day.toString()}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardDays
