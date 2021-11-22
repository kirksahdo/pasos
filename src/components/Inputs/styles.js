import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    viewAlignOptions:{
        
        marginTop:40,
        alignItems:'center'
    },
    viewAlign:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row'
    },
    textInputQuestion:{
        marginTop:40,
        borderBottomColor:'#000',
        borderBottomWidth:5,
        padding:10,
        width:'80%',
        color:'#000',
        fontSize:20
        
    },
    card:{
        margin:20,
        height:150,
        width:80,
        borderColor:'#000',
        borderWidth:2,
        borderRadius:40,
        padding:10,
        alignItems:'center',
        color:'#000'
    },
    textInputDate:{
        fontSize:30
    },
    label:{
        color:'#000'
    },
    optionInputView:{
        padding:10,
        borderColor:'#000',
        borderWidth:3,
        width:'80%',
        margin:10,
        padding:20,
        borderRadius:15,
    },
    optionText:{
        color:'#000',
        fontSize:20,
        textAlign:'center',
        fontFamily: 'pompadour'
    }
})
export default styles