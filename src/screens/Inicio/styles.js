import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    viewDays: {
        marginTop: 30,
        marginBottom: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttons: {
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom: 50
    }
    ,
    buttonY: {
        backgroundColor: '#FACC29',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 20,
        marginBottom: 18

    },
    buttonB: {
        backgroundColor: '#000000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 20,
        marginBottom: 18

    },
    icone: {
        width: 50,
    },
    buttonLabelY: {
        color: '#000',
        fontSize: 25,
        fontFamily: 'pompadour',
        marginTop: 5,
        textTransform: 'uppercase'
    },
    buttonLabelB: {
        color: '#FFF',
        fontSize: 25,
        fontFamily: 'pompadour',
        marginTop: 5,
        textTransform: 'uppercase'
    },
    degrauImage: {
        width: '100%',
        height: 90,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numDegrausLabel: {
        marginLeft: 24,
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'pompadour',
        textTransform: 'uppercase',
    },
    topRow: {
        marginBottom: 40,
        width: 200,
        left: 200
    },
    midRow: {
        marginBottom: 30,
        width: 300,
        left: 100
    },
    bottomRow: {
        marginTop: 10,
        width: 300
    },
    containerStairs: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    viewStepImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewInit: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    viewUserStep: {
        top: 30,
        position: 'absolute'
    }



});

export default styles;