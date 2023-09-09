import React, { useState, Component } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { CONSTANTS } from '../constants';
class BackAnimation extends Component {
  constructor(props) {
    super(props);
    const speed = this.props.speed;
    this.state = {
      translateY: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.animateBackground();
  }

  animateBackground() {
    Animated.loop(
      Animated.timing(this.state.translateY, {
        toValue: CONSTANTS.SCREEN_HEIGHT, // Сдвиг изображения на -100 (или другое значение) создает иллюзию бесконечного движения
        duration: speed, // Длительность анимации
        useNativeDriver: false,
      })
    ).start();
  }

  render() {
    const { translateY } = this.state;

    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/bg.png')} // Замените на путь к вашему фоновому изображению
          style={{ ...styles.background, transform: [{ translateY }] }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%', // Ширина изображения равна ширине экрана
    height: '100%', // Высота изображения равна высоте экрана
  },
});

export default BackAnimation;
