import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FACC29'
    },
    headerTitle: {
        fontFamily: 'newake',
        color: '#000',
        textTransform: 'uppercase',
        marginTop: 5
    },
    days: {
        flex: 6,
        backgroundColor: 'rgba(0,0,0,0.0)',
        padding: 5
    },
    row: {
        flex: 1, 
        flexDirection: 'row',
        marginVertical: 3
    },
    day: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1
    },
    dayLabel:{
        paddingTop:3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'pompadour',
        color: '#000',
        borderRadius: 100
    },
    dayConclused: {
        backgroundColor: '#FACC29',
        color: '#fff',
    },
    dayNotConclused: {
        backgroundColor: '#000',
        color: '#fff',
    }
});

export default styles;