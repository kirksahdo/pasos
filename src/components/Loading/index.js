import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { View } from "react-native";
import FastImage from 'react-native-fast-image'

import loadingGif from '../../../assets/loading.gif';

const Loading = () => {
    return(
        <View style={styles.container}>
            <FastImage 
                style={{ width: 70, height: 70 }}
                source={loadingGif} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default Loading;