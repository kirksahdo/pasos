import {StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20
    },
    goBackArea:{
        padding: 20
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
    descriptionExer:{
        fontSize:20,
        color:'#FFF'
    }
    ,
    alignItemCenter:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        flexDirection: 'row',
        paddingTop:35,
    },
    areaAction:{
        backgroundColor:'#000',
        borderRadius: 20,
        paddingVertical: 20,
        display:'flex',
        justifyContent:'center',
        flexDirection: 'row'
    },
    buttomArea:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 100,
        marginBottom: 18
    },
    areaSelect:{
        width:'90%',
        paddingLeft:40
    },
    l_area:{
        width:'70%'
    },
    r_area:{
        width:'30%'
    },
    checkbox_area:{
        width:30,
        borderRadius:30,
        height:30,
        borderWidth:1,
        borderColor:'#FFF'
    }
    ,
    checked:{
        backgroundColor:'#FFF'
    }
})
export default styles;