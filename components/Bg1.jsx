import React,{useState,useEffect} from 'react';
import {View,Animated, StyleSheet,ImageBackground,} from 'react-native';
import { CONSTANTS } from '../constants';

const Bg1 = () => {
  const [translateY, setTranslateY] = useState(new Animated.Value(0));
 const link=require('../assets/bg.png');
  useEffect(() => {
    animateBackground();
  }, []);
  const animateBackground = () => {
    Animated.loop(
      Animated.timing(translateY, {
        toValue: CONSTANTS.SCREEN_HEIGHT / 2, 
        duration: 6000, 
        useNativeDriver: false,
      })
    ).start();
  };
  return (
    <Animated.Image
      source={link} 
      style={{
        position: 'absolute',
        top: -400,
        left: 0,
        zIndex:0,
        transform: [{ translateY }],
      }}
    />
  );
}


export default Bg1;
