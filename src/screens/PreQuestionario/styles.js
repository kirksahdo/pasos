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
    title:{
        fontSize:40,
        textAlign:'center',
        fontWeight:'bold',
        color:'#000'
    },
    areaDescription:{
        paddingLeft:20,
        paddingRight:20,
        paddingTop:40
    },
    description:{
        fontSize:20,
        textAlign:'center',
        color:'#000'
    },
    alignItemCenter:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        flexDirection: 'row',
        paddingTop:35,
    },
    buttomAction:{
        backgroundColor:'#000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 100,
        borderRadius: 20,
        marginBottom: 18
    }
})
export default styles;