import React from "react";
import { View, TouchableOpacity, Text, Image} from "react-native";

import calendarIcoPreto from '../../../assets/calendar.png'
import calendarIcoBranco from '../../../assets/icone-calendario-branco.png'
import desafioIcoPreto from '../../../assets/desafio.png'
import desafioIcoBranco from '../../../assets/icone-desafio-branco.png'
import questionarioIcoBranco from '../../../assets/questionario.png'
import questionarioIcoPreto from '../../../assets/icone-questionario-preto.png'
import pesoTreinoIcoBranco from '../../../assets/peso.png'
import pesoIcoPreto from '../../../assets/icone-peso-preto.png'
import macaIcoBranco from '../../../assets/maca.png'
import macaIcoPreto from '../../../assets/icone-maca-preto.png'

import styles from "./styles";

const EventButton = ({onPress = () => '', tipo, nome = 'Evento', concluido = false}) => {

    const getIcon = (iconName, concluido) => {
        iconName = iconName.toLowerCase();
        if(iconName == 'desafio'){
            return concluido ? desafioIcoBranco : desafioIcoPreto;
        }
        if(iconName == 'addEvento'){
            return concluido ? calendarIcoBranco : calendarIcoPreto;
        }
        if(iconName == 'questionario'){
            return concluido ? questionarioIcoBranco : questionarioIcoPreto;
        }
        if(iconName == 'treino'){
            return concluido ? pesoTreinoIcoBranco : pesoIcoPreto;
        }
        if(iconName == 'rotinaAlimentar'){
            return concluido ? macaIcoBranco : macaIcoPreto;
        }
        return concluido ? calendarIcoBranco : calendarIcoPreto;
    }

    const icone = getIcon(tipo, concluido);

    if(tipo == 'addEvento'){
        return (<TouchableOpacity style={styles.buttonY} onPress={onPress}  >
            <View style={styles.icone} >
                <Image source={icone} />
            </View>
            <Text style={styles.buttonLabelY}>{nome}</Text>
        </TouchableOpacity>)
    }

    return(
        <TouchableOpacity style={!concluido ? styles.buttonY : styles.buttonB} onPress={!concluido?onPress:()=>null}  >
            <View style={styles.icone} >
                <Image source={icone} />
            </View>
            <Text style={!concluido ? styles.buttonLabelY : styles.buttonLabelB}>{nome}</Text>
        </TouchableOpacity>
    );

};


export default EventButton;