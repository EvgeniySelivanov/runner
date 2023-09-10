import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { CONSTANTS } from '../constants';
const images = {
  image1: require('../assets/flower1.png'),
  image2: require('../assets/flower2.png'),
  image3: require('../assets/flower3.png'),
  image4: require('../assets/flower4.png'),
  image5: require('../assets/stone1.png'),
  image6: require('../assets/stone2.png'),
  image7: require('../assets/stone3.png'),
  // и так далее
};
const Decoration = ({ speed, positionY, positionX, imageName }) => {
  const [translateY, setTranslateY] = useState(new Animated.Value(0));
  // console.log('nameDecoration>>>', nameDecoration);
  
  const link = images[imageName];
  console.log('link>>>', link);
  useEffect(() => {
    animateBackground();
  }, []);

  const animateBackground = () => {
    Animated.loop(
      Animated.timing(translateY, {
        toValue: CONSTANTS.SCREEN_HEIGHT / 2, // Сдвиг изображения на -100 (или другое значение) создает иллюзию бесконечного движения
        duration: speed, // Длительность анимации
        useNativeDriver: false,
      })
    ).start();
  };

  return (
    <Animated.Image
      source={link} // Замените на путь к вашему фоновому изображению
      style={{
        position: 'absolute',
        top: positionY,
        left: positionX,
        transform: [{ translateY }],
      }}
    />
  );
};

export default Decoration;
