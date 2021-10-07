import React, {useState} from 'react'
import {View, Text, StatusBar, StyleSheet, ImageBackground, TouchableHighlight, Image, Dimensions, TouchableOpacity} from 'react-native';

import background from '../../../assets/black-background.png';
import setadireita from '../../../assets/seta-direita-amarela.png';
import setaesquerda from '../../../assets/seta-esquerda-amarela.png';
import criseIcone from '../../../assets/icone-crise-tutorial.png'
import setabaixo from '../../../assets/icone-seta-baixo.png'

const BemVindo = () => {

    const slides = [{
        title: 'Bem Vindo!',
        text: 'Saiba que é uma grande honra lhe receber aqui. Foi um grande passo que você deu. A seguir vamos lhe dar algumas informações sobre o aplicativo.'
    },{
        title: 'Está em uma crise?',
        text: 'Em crises, não hesite em apertar este botão. Nele você encontrará ajuda para passar este momento.'
    }]

    const [currentItem, setCurrentItem] = useState(0);

    const back = () => {
        if(currentItem - 1 < 0) return;
        let current = currentItem;
        setCurrentItem(current-1);
    }

    const next = () => {
        if(currentItem + 1 >= slides.length) {
            // concluiu o passo a passo
            return;
        }
        let current = currentItem;
        setCurrentItem(current+1);
    }

    return (
        <ImageBackground source={background} style={styles.background}>
            <TouchableHighlight style={styles.setaDireita} onPress={next}>
                <Image source={setadireita} />
            </TouchableHighlight>
            { currentItem > 0 && (<TouchableHighlight style={styles.setaEsquerda} onPress={back}>
                <Image source={setaesquerda} />
            </TouchableHighlight>)}
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.text} >
                <Text style={styles.titleContent}>{slides[currentItem].title}</Text>
                <Text style={styles.textContent}>{slides[currentItem].text}</Text>
            </View>
            <View style={styles.slideCircles}>
                {
                    function() {
                        let views = [];
                        for(let i = 0 ; i < slides.length ; i++ ){
                            views.push( (<View key={i} style={[styles.slideItem, currentItem == i ? styles.slideItemActive : {} ]} />)  )
                        }
                        return views;
                    }()
                }
            </View>
            <TouchableOpacity style = {styles.crise} >
                { currentItem == 1 && (<Image source={setabaixo} style={{marginLeft: 16, marginBottom: 10}} />)}
                <Image source={criseIcone} />
            </TouchableOpacity>
            
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight
    },
    text: {
        marginTop: 0.20*Dimensions.get('window').height,
        width: '70%'
    },  
    titleContent: {
        fontFamily: 'newake',
        fontSize: 42,
        color: '#FACC29',
        textTransform: 'uppercase',
        letterSpacing: 2,
        textAlign: 'center',
        marginBottom: 25
    },
    textContent: {
        fontFamily: 'pompadour',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 16,
        alignItems: 'center',
        letterSpacing: 2,
        color: '#FACC29'
    },
    setaDireita: {
        position: 'absolute',
        right: 31,
        top: StatusBar.currentHeight + 21
    },
    setaEsquerda: {
        position: 'absolute',
        left: 31,
        top: StatusBar.currentHeight + 21
    },
    slideCircles: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 13
    },
    slideItem: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#fff',
        marginRight: 10
    },
    slideItemActive: {
        backgroundColor: '#FACC29'
    },
    crise: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    }
});

export default BemVindo;