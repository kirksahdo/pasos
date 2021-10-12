import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        width: 0.90 * Dimensions.get('window').width,

    },
    icone: {
        width: 50,
    },
    button: {
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 20,
        marginBottom: 18,
        display: 'flex',
        width: '100%'

    }
    ,
    buttonLarge: {
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 20,
        marginBottom: 18,
        display: 'flex',
        height: 150

    },
    buttonLabelTitle: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'pompadour',
        marginTop: 5,
        textAlign: 'center',
        width: '100%'
    },
    buttonLabelTitleLarge: {
        color: '#000',
        fontSize: 40,
        fontFamily: 'pompadour',
        marginTop: 5,
        textTransform: 'uppercase'
    }
    ,
    buttonLabelDescription: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'pompadour',
        marginTop: 5,
        textTransform: 'uppercase'
    },
    viewLabels: {
        padding: 10,
        marginRight: 30
    },
    errorInfor: {
        alignItems: 'center'
    },
    viewLabelTitleError: {
        color: '#EEEEEE',
        fontSize: 40,
        fontFamily: 'Newake',
        fontWeight: "bold",
        margin: 20
    },
    viewLabelDescriptionError: {
        color: '#EEEEEE',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30
    },
    viewLabelSeparator: {
        margin: 40,
        fontSize: 18,
        fontWeight: 'bold'
    }
});


export default styles;