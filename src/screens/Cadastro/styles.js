import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    logo: {
        width: '100%',
        alignItems: 'flex-end'
    },
    form: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: '10%'

    },
    header: {
        width: '100%',
        borderBottomColor: '#000',
        borderBottomWidth: 3.5,
        alignItems: 'center'
    },
    headerTitle: {
        fontFamily: 'newake',
        fontSize: 40,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textTransform: 'uppercase',
        color: '#000',
        marginBottom: 10,
        lineHeight: 39,
        letterSpacing: 2
    },
    inputs: {
        width: '100%',
        marginTop: 22
    },
    txtInput: {
        fontFamily: 'pompadour',
        fontSize: 16,
        color: "#111111",
        fontWeight: 'normal',
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 12
    },
    buttons: {
        width: '100%',
        alignContent: 'center',
        marginTop: 10,
        marginBottom: 100
    },
    txtExtras: {
        fontFamily: 'pompadour',
        fontSize: 16,
        color: '#000',
        marginBottom: 5
    },
    btnCadastrar: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: '#000',
        borderRadius: 8,
        marginTop: 10
    },
    labelCadastrar: {
        fontFamily: 'pompadour',
        color: '#fff',
        fontSize: 20
    },
    crise: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 20
    }
});

export default styles;