import React from 'react';
import {ImageBackground, StatusBar} from 'react-native';

import styles from './styles';
import splashScreen from './../../../assets/splash-screen.png'

const SplashScreen = () => (
    <ImageBackground style = {styles.splash} source={splashScreen}>
        <StatusBar translucent backgroundColor="transparent" />
    </ImageBackground>
);


export default SplashScreen;