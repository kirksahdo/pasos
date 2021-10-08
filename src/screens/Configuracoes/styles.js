import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        width: 0.90*Dimensions.get('window').width,

    },
    icone: {
        width: 50
    }, 
    button: {
        backgroundColor: '#FACC29',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 20,
        marginBottom: 18
        
    },
    buttonLabel: {
        color: '#000',
        fontSize: 25,
        fontFamily: 'pompadour',
        marginTop: 5,
        textTransform: 'uppercase'
    }
});


export default styles;