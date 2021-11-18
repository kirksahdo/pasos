import { StyleSheet, Dimensions, StatusBar } from "react-native";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight + 50
    },
    title:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 38
    },  
    titleLabel: {
        fontFamily: 'newake',
        fontSize: 40,
        color: '#fff'
    }, 
    list: {
        flex: 1,
        marginBottom: 60
    },
    contato: {
        width: Dimensions.get('window').width * 0.8,
        backgroundColor: '#fff',
        padding: 23,
        borderRadius: 10,
        marginBottom: 14
    },
    btnLigar: {
        width: '100%',
        backgroundColor: '#000',
        borderRadius: 8,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contatoData: {
        flexDirection: 'row',
        marginBottom: 8
    },
    btnLabel: {
        color: '#fff',
        textTransform: 'uppercase',
        fontFamily: 'pompadour',
        fontSize: 17
    },
    nomeContato: {
        flex: 1,
        justifyContent: 'space-between'
    },
    labelNome: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'newake',
        color: '#000',
        fontSize: 35,
        textTransform: 'uppercase',
        marginTop: 3
    },
    labelContato: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'pompadour',
        fontSize: 18,
        color: '#000'
    },
    setaEsquerda: {
        position: 'absolute',
        left: 18,
        top: StatusBar.currentHeight + 21
    },
    addBranco: {
        position: 'absolute',
        right: 18,
        top: StatusBar.currentHeight + 21
    }
});


export default styles;