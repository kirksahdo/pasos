import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import background from '../../../assets/blank-background.png';
import CardDays from "../../components/CardDays";
import styles from './styles'
import moment from 'moment'
import 'moment/locale/pt-br'
import { DateUtils } from "../../common/date.utils";

import calendarIco from '../../../assets/calendar.png'
import desafioIco from '../../../assets/desafio.png'
import questionarioIco from '../../../assets/questionario.png'
import pesoTreinoIco from '../../../assets/peso.png'
import macaIco from '../../../assets/maca.png'
import degraus from '../../../assets/retangulo-degrau.png'
import linhaY from '../../../assets/linhaY.png'
import boneco from '../../../assets/user_idle.png'

class Inicio extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        days: [
            moment().subtract(2, 'days'),
            moment().subtract(1, 'days'),
            moment(),
            moment().add(1, 'days'),
            moment().add(2, 'days')
        ],
        dayWorkContext: 0
    }
    render() {
        return (
            <ImageBackground source={background} style={styles.background}>
                <ScrollView>
                    <View style={styles.viewDays}>
                        {
                            this.state.days.map((item, index) => (
                                <CardDays day={item.date()} dayWeek={DateUtils.getDayofWeekBR(item.weekday())} isComplet={index < 2} />
                            ))
                        }
                    </View>
                    <View style={styles.containerStairs} >
                        <View style={styles.viewInit}>
                            {this.state.dayWorkContext ? null : <Image source={boneco} />}

                        </View>
                        <View>

                            <View style={styles.topRow}>
                                <View style={styles.viewStepImg}>
                                    <Image source={degraus} style={styles.degrauImage} />
                                </View>
                                <Text style={styles.numDegrausLabel}>{this.state.dayWorkContext + 3}</Text>
                            </View>
                            <View style={styles.midRow}>
                                <View style={styles.viewStepImg}>
                                    <Image source={degraus} style={styles.degrauImage} />
                                </View>
                                <Text style={styles.numDegrausLabel}>{this.state.dayWorkContext + 2}</Text>
                            </View>
                            <View style={styles.viewUserStep}>
                                {this.state.dayWorkContext ? <Image source={boneco} /> : null}
                            </View>

                            <View style={styles.bottomRow}>
                                <View style={styles.viewStepImg}>
                                    <Image source={degraus} style={styles.degrauImage} />
                                </View>
                                <Text style={styles.numDegrausLabel}>{this.state.dayWorkContext + 1}</Text>
                            </View>

                        </View>

                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.buttonY}  >
                            <View style={styles.icone} >
                                <Image source={calendarIco} />
                            </View>
                            <Text style={styles.buttonLabelY}>ADICIONAR EVENTO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonY} >
                            <View style={styles.icone} >
                                <Image source={desafioIco} />
                            </View>
                            <Text style={styles.buttonLabelY}>DESAFIO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonB} >
                            <View style={styles.icone} >
                                <Image source={questionarioIco} />
                            </View>
                            <Text style={styles.buttonLabelB}>QUESTIONÁRIO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonB} >
                            <View style={styles.icone} >
                                <Image source={pesoTreinoIco} />
                            </View>
                            <Text style={styles.buttonLabelB}>TREINO FÍSICO</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonB} >
                            <View style={styles.icone} >
                                <Image source={macaIco} />
                            </View>
                            <Text style={styles.buttonLabelB}>ROTINA ALIMENTAR</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground >
        )
    }
}
export default Inicio;