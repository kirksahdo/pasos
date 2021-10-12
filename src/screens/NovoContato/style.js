import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        marginTop: '15%',
        width: 0.8 * Dimensions.get('window').width,
        marginBottom: '0%'
    },
    input: {
        color: '#FFFFFF',
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


});


export default styles;