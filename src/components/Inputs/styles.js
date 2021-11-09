import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    }
})
export default styles