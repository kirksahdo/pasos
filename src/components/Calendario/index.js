import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br'

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

    const teste = (date) => {

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

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FACC29'
    },
    headerTitle: {
        fontFamily: 'newake',
        color: '#000',
        textTransform: 'uppercase',
        marginTop: 5
    },
    days: {
        flex: 6,
        backgroundColor: 'rgba(0,0,0,0.0)',
        padding: 5
    },
    row: {
        flex: 1, 
        flexDirection: 'row',
        marginVertical: 3
    },
    day: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1
    },
    dayLabel:{
        paddingTop:3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'pompadour',
        color: '#000',
        borderRadius: 100
    },
    dayConclused: {
        backgroundColor: '#FACC29',
        color: '#fff',
    },
    dayNotConclused: {
        backgroundColor: '#000',
        color: '#fff',
    }
})

export default Calendario;