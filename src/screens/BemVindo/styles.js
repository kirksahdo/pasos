import { StyleSheet, StatusBar, Dimensions } from "react-native";

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
        right: 18,
        top: StatusBar.currentHeight + 21
    },
    setaEsquerda: {
        position: 'absolute',
        left: 18,
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

export default styles;