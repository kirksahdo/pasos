import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 100
    },
    setaEsquerda: {
        position: 'absolute',
        left: 18,
        top: StatusBar.currentHeight + 21
    },
    container:{
        width: 0.90*Dimensions.get('window').width,
    },
    header: {
        marginTop: StatusBar.currentHeight + 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    headerTitle: {
        fontFamily: 'newake',
        color: '#000',
        fontSize: 35,
        textTransform: 'uppercase'
    },
    icone: {
        width: 50
    }, 
    button: {
        width: '100%',
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 20,
        marginBottom: 18
        
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'pompadour',
        marginTop: 5,
        textTransform: 'uppercase'
    },
    conclused: {
        backgroundColor: '#000',
        color: '#fff'
    },
    notConclused: {
        backgroundColor: '#fff',
        color: '#000'
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FACC29'
    },
    labelLegenda: {
        marginTop: 2,
        fontSize: 13,
        fontFamily: 'pompadour',
        color: '#000',
        textTransform: 'uppercase',
        marginLeft: 5
    }
});

export default styles;