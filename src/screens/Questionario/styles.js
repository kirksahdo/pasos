import {StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20
    },
    goBackArea:{
        padding:20
    },
    imgGoBackArea:{
        width:20,
        height:40
    },
})
export default styles;