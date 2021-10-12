import { StyleSheet, Dimensions, StatusBar } from "react-native";

const styles = StyleSheet.create({
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        marginTop: '15%',
        width: 0.8 * Dimensions.get('window').width,
        marginBottom: '0%'
    },
    input: {
        color: '#fff',
        padding: 10,
        fontSize: 18,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        borderBottomColor: "#FFFFFF",
        marginBottom: 24,
    },
    scroll: {
        flex: 1,
        paddingTop: '25%',
    },
    viewLabelTitle: {
        color: '#EEEEEE',
        fontSize: 40,
        fontFamily: 'Newake',
        fontWeight: "bold",
        margin: 20,
        textAlign: 'center'
    },
    buttons: {
        width: 0.90 * Dimensions.get('window').width,
    },
    button: {
        marginTop: '20%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 20,
        marginBottom: 18,
        width: '100%'
    },
    buttonLabelTitle: {
        color: '#000000',
        fontSize: 20,
        fontFamily: 'pompadour',
        marginTop: 5,
        textAlign: 'center',
        width: '100%'
    },
    setaEsquerda: {
        position: 'absolute',
        left: 18,
        top: StatusBar.currentHeight + 21
    }


});


export default styles;