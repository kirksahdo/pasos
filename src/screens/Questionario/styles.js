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
    progressNumberText:{
        fontSize:40,
        textAlign:'center',
        color:'#000',
        fontWeight:'bold'
    },
    questionDescription:{
        marginTop:20,
        fontSize:20,
        textAlign: 'justify',
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
        marginBottom:60
    },
    viewMain:{
        width:'100%',
        height:'70%',
        display:'flex',
        justifyContent:'space-between'
    },
    icoSeta:{
        width:25,
        height:45
    }
})
export default styles;