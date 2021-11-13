import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    buttonY: {
        backgroundColor: '#FACC29',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 20,
        marginBottom: 18,
        width: '90%'

    },
    buttonB: {
        backgroundColor: '#000000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 20,
        marginBottom: 18,
        width: '90%'

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
});

export default styles;