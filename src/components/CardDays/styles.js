import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    absoluteView: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        textAlign: 'center',
        margin: 32,
    },
    textTitle: {
        color: '#000',
        fontSize: 7,
        textAlign: 'center'
    },
    textDay: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center'
    }
    ,
    imageDays: {
        width: 73,
        height: 105,
        margin: 5
    }
});

export default styles;