import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: 60,
        paddingVertical: 9,
        borderColor: '#000',
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 26
    },
    textTitle: {
        color: '#373737',
        fontSize: 21,
        fontFamily: 'pompadour',
        marginBottom: 4
    },
    textDay: {
        color: '#000',
        fontSize: 19,
        fontFamily: 'pompadour'
    },
    imageDays: {
        width: 73,
        height: 105,
        margin: 5
    },
    large: {
        paddingVertical: 17
    },
    medium: {
        paddingVertical: 14
    },
    small: {
        paddingVertical: 7
    },
    complete: {
        backgroundColor: '#FACC29',
        borderColor: '#FACC29'
    }
});

export default styles;