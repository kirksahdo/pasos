import {StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20,
        height:'100%'
    },
    goBackArea:{
        padding:20
    },
    imgGoBackArea:{
        width:20,
        height:40
    },
    titleChallenge:{
        fontSize:40,
        fontFamily: 'pompadour',
        textTransform: 'uppercase',
        textAlign:'center',
        color:'#000',
        fontWeight:'bold'
    },
    TextDescription:{
        marginTop:20,
        fontSize:20,
        textAlign: 'center',
        lineHeight: 28,
        fontFamily: 'pompadour',
        marginHorizontal: 20,
        color:'#000'
    },
    imgPersonagem:{
        marginTop:'20%',
        marginLeft:'10%'
    },
    alignFlex:{
        padding:5,
        marginTop:30,
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        
    },
    scroll:{
        height: '100%',
        marginBottom:80
    },
    viewMain:{
        width:'100%',
        height:'70%',
        display:'flex',
        justifyContent:'space-between'
    },
    viewImage:{
        width:'100%',
        alignItems:'center'
    },
    buttom:{
        marginTop:15,
        paddingVertical:15,
        paddingHorizontal:30,
        backgroundColor:'#000',
        borderRadius:15,
        width:'60%'
    }
    ,buttomText:{
        width:'100%',
        textAlign:'center',
        color:'#fff',
        textTransform:'uppercase',
        fontSize:17
    }
})
export default styles;