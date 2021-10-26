import React from 'react';
import {ImageBackground, StatusBar} from 'react-native';

import styles from './styles';
import splashScreen from './../../../assets/splash-screen.png'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

const SplashScreen = () => (
    <ImageBackground style = {styles.splash} source={splashScreen}>
        <FocusAwareStatusBar translucent backgroundColor="transparent" />
    </ImageBackground>
);


export default SplashScreen;