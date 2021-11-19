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
        marginHorizontal:10,
        fontSize:40,
        textAlign:'center',
        fontWeight:'bold',
        color:'#000'
    },
    description:{
        padding:20,
        fontSize:20,
        textAlign:'center',
        color:'#000'
    },
    alignItemCenter:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        flexDirection: 'row',
        paddingTop:5,
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
    primary_background:{
        backgroundColor:'#000'
    },
    neutra_background:{
        backgroundColor:'#FFF',
    },
    font_color_black:{
        color:'#000'
    },
    titleSelect:{
        fontSize:20,
        color:'#FFF'
    },
    descriptionSelect:{
        fontSize:14,
        color:'#FFF'
    },
    areaSelect:{
        width:'90%',
        paddingLeft:40
    },
    l_area:{
        width:'30%'
    },
    m_area:{
        width:'50%'
    },
    r_area:{
        width:'20%',
        alignItems:'center',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
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