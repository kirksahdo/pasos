import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 60
    },
    content: {
        width: '80%',
        height: '100%',
        paddingTop: StatusBar.currentHeight,
    },
    calendario: {
        width: '100%',
        alignItems: 'center'
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FACC29'
    },
    labelLegenda: {
        marginTop: 2,
        fontSize: 13,
        fontFamily: 'pompadour',
        color: '#000'
    },
    texts: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 37
    },
    primaryText: {
        fontFamily: 'pompadour',
        fontSize: 20,
        color: '#000',
        textTransform: 'uppercase'
    },
    secondaryText: {
        fontFamily: 'newake',
        color: '#000',
        fontSize: 35,
        textTransform: 'uppercase'
    }
});

export default styles;