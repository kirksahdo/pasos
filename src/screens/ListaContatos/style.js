import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },

});


export default styles;