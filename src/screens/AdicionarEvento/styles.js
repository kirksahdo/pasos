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
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    content: {
        width: '100%'
    },
    textInput: {
        width: '100%',
        fontFamily: 'pompadour',
        fontSize: 18,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 0
    },
    titleDate: {
        width: '100%',
        fontSize: 16,
        fontFamily: 'pompadour',
        color: '#000',
        textAlign: 'center',
        marginTop: 36,
        marginBottom: 10
    },
    date: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30
    },
    box: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 30,
        width: 66,
        height: 94,
        justifyContent: 'center',
        alignItems:'center'
    },
    boxText: {
        fontSize: 23,
        fontFamily: 'pompadour',
        color: '#000'
    },
    boxText2: {
        fontFamily: 15,
        fontFamily: 'pompadour',
        color: '#000'
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtRepetir: {
        fontFamily: 'pompadour',
        fontSize: 20,
        marginTop: 2,
        color: '#000',
        textTransform: 'uppercase'
    },
    btnAdicionar: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#000',
        borderRadius: 8,
        marginTop: 40,
        marginBottom: 20
    },
    btnText: {
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: 17
    }
});

export default styles;