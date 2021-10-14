import {StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20
    },
    userNameAndPhoto: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 25
    },
    nome: {
        marginTop: 17,
        fontFamily: 'newake',
        color: '#000',
        fontSize: 35,
        textTransform: 'uppercase'
    },
    userData: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    data: {
        fontFamily: 'pompadour',
        fontSize: 20,
        color: '#000',
        textAlign: 'center'
    }
});

export default styles;