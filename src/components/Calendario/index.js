import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br'

import styles from './styles';

const Calendario = ({day, getClickedDay, fontSize, width, height}) => {

    var weekDayStart = moment(day).startOf('month').isoWeekday() + 1;
    if(weekDayStart == 8){
        weekDayStart = 1;
    }
    var weekDayEnd = moment(day).endOf('month').date();
    var key = 0;
    var dias = [];

    let start = -1;
    for( var i = 0 ; i < 6 ; i++){
        var linha = []
        for( var j = 0 ; j < 7 ; j++){
            if(start > weekDayEnd){
                start = -1;
            }
            if( i == 0 && j == weekDayStart-1){
                start = 1;
            }
            if(start > 0){
                let value = moment(day).startOf('month').add(start-1, 'd');
                let condition = moment(day).isSameOrAfter(value);
                linha.push( (
                    <TouchableOpacity style={styles.day} key={key++} onPress={(e) =>  condition ? getClickedDay( value ) : null }>
                        <Text style={[styles.dayLabel, {fontSize: fontSize, width: fontSize+10, height: fontSize+10} , condition ? styles.dayNotConclused : {}]}>
                            {start >= 1 && start <= 9?`0${start}`:start}
                        </Text>
                    </TouchableOpacity>
                ) );
                start++;
            }else{
                linha.push( (
                    <View style={styles.day} key={key++} />
                ) )
            } 
        }
        dias.push( (
            <View style={styles.row} key={key}>
                {
                    linha
                }
            </View>
        ) );
    }

    return(
        <View style={{width: width, height: height }}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, {fontSize: fontSize + 10}]}>{moment(day).format('MMMM')}</Text>
            </View>
            <View style={styles.days}>
                {
                    dias
                }
            </View>
        </View>
    );
}



export default Calendario;