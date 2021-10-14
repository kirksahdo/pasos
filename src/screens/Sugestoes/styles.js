import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    setaEsquerda: {
        position: 'absolute',
        left: 18,
        top: StatusBar.currentHeight + 21
    },
    scroll: {
        flex: 1,
    },
    form:{
        width: '100%',
        alignItems: 'center'
    },
    header: {
        marginTop: StatusBar.currentHeight + 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontFamily: 'newake',
        color: '#000',
        fontSize: 35,
        textTransform: 'uppercase'
    },
    inputs: {
        width: 0.8*Dimensions.get('window').width
    },
    input: {
        fontFamily: 'pompadour',
        fontSize: 18,
        color: '#000',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        padding: 0,
        marginTop: 40
    },
    btnAdicionar: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#000',
        borderRadius: 8,
        marginTop: 50,
        marginBottom: 20
    },
    btnText: {
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: 17
    }
});

export default styles;