import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  Easing,
} from 'react-native';
import { CONSTANTS } from '../constants';
import { Audio } from 'expo-av';
import styled from 'styled-components/native';
import StartMessage from '../components/StartMessage';
import RunMan from '../components/RunMan';
import Header from '../components/Header';
import Stone from '../components/Stone';
import Stamp from '../components/Stamp';
import Log from '../components/Log';

const bgImage = require('../assets/bg.png');
const Space = styled(ImageBackground)`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
`;
const ScoreText = styled.Text`
  position: absolute;
  top: 43px;
  left: 110px;
  color: #ffffff;
  font-size: 50px;
  font-weight: 700;
`;

const Runner = () => {
  const route = useRoute();

  //speed game
  let speed = route.params.speedGame;
  const [isGameRun, setIsGameRun] = useState(false);
  const [sound, setSound] = useState();
  const [music, setMusic] = useState(false);
  //coordinate runner
  const [rannerPosition, setRannerPosition] = useState(
    CONSTANTS.RUNNER_POSITION
  );

  const stonePosition = useRef(
    new Animated.ValueXY(CONSTANTS.STONE_POSITION)
  ).current;
  const logPosition = useRef(
    new Animated.ValueXY(CONSTANTS.STONE_POSITION)
  ).current;
  const stampPosition = useRef(
    new Animated.ValueXY(CONSTANTS.STAMP_POSITION)
  ).current;
  const [score, setScore] = useState(0);

  //start X coordinate obtacles
  const randomPositionStone = Math.floor(Math.random() * (300 - 1 + 1)) + 1;
  const randomPositionStamp = Math.floor(Math.random() * (300 - 1 + 1)) + 1;
  const randomPositionLog = Math.floor(Math.random() * (300 - 1 + 1)) + 1;

  //coordinate obtacles
  let stoneY = stonePosition.y._value;
  let stoneX = stonePosition.x._value;

  let stampY = stampPosition.y._value;
  let stampX = stampPosition.x._value;

  let logY = logPosition.y._value;
  let logX = logPosition.x._value;

  useEffect(() => {
    if (isGameRun && music) {
      playSound();
    }
  }, [music]);

  moveStone = () => {
    Animated.timing(stonePosition, {
      toValue: { x: 0, y: CONSTANTS.SCREEN_HEIGHT + 550 },
      duration: speed, // Длительность анимации в миллисекундах
      useNativeDriver: false, // Используем JavaScript анимацию
      easing: Easing.linear,
    }).start();
  };

  moveStamp = () => {
    Animated.timing(stampPosition, {
      toValue: { x: 150, y: CONSTANTS.SCREEN_HEIGHT + 550 },
      duration: speed, // Длительность анимации в миллисекундах
      useNativeDriver: false, // Используем JavaScript анимацию
      easing: Easing.linear,
    }).start();
  };
  moveLog = () => {
    Animated.timing(logPosition, {
      toValue: { x: 80, y: CONSTANTS.SCREEN_HEIGHT + 550 },
      duration: speed, // Длительность анимации в миллисекундах
      useNativeDriver: false, // Используем JavaScript анимацию
      easing: Easing.linear,
    }).start();
  };

  const runnerValueChange = (xPosition) => {
    setRannerPosition((rannerPosition) => ({
      ...rannerPosition,
      x: xPosition,
    }));
  };
  //music
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/music.mp3')
    );
    setSound(sound);
    await sound.playAsync(); // Проигрывание аудио
  }
  //stop music
  const stopMusic = async () => {
      await sound.stopAsync();
      setMusic(false);
  };
  //game over
  const gameOver = () => {
    // stopMusic();
    stonePosition.setValue({
      x: randomPositionStone,
      y: CONSTANTS.STONE_POSITION.y,
    });
    stampPosition.setValue({
      x: randomPositionStamp,
      y: CONSTANTS.STAMP_POSITION.y,
    });
    logPosition.setValue({
      x: randomPositionLog,
      y: CONSTANTS.LOG_POSITION.y,
    });
    setIsGameRun(false);
    setScore(0);
  };

  // start game
  const startGame = () => {
    stonePosition.setValue({
      x: randomPositionStone,
      y: CONSTANTS.STONE_POSITION.y,
    });
    stampPosition.setValue({
      x: randomPositionStamp,
      y: CONSTANTS.STAMP_POSITION.y,
    });
    logPosition.setValue({
      x: randomPositionLog,
      y: CONSTANTS.LOG_POSITION.y,
    });
    setIsGameRun(true);
    moveStone();
    moveStamp();
    moveLog();
    console.log('game start');
  };
  //add score
  if (logY >= CONSTANTS.SCREEN_HEIGHT + 350) {
    console.log('if run');
    setScore((score) => score + 1);
    startGame();
  }
  //collision check
/* prettier-ignore */
  if (
    (stoneY-150 >= rannerPosition.y &&
    stoneY-150 <= (rannerPosition.y + CONSTANTS.RUNNER_SIZE.height)) &&
    (rannerPosition.x >= stoneX &&
    rannerPosition.x <= (stoneX + CONSTANTS.STONE_SIZE.width))
      
  ) {
    console.log('gameOver');
    gameOver();
  }
  else if(  (stampY-250 >= rannerPosition.y &&
    stampY-250 <= (rannerPosition.y + CONSTANTS.RUNNER_SIZE.height)) &&
    (rannerPosition.x >= stampX &&
    rannerPosition.x <= (stampX + CONSTANTS.STONE_SIZE.width))){
      console.log('gameOver');
      gameOver();
    }
  else if( (logY-450 >= rannerPosition.y &&
      logY-450 <= (rannerPosition.y + CONSTANTS.RUNNER_SIZE.height)) &&
      (rannerPosition.x >= logX &&
      rannerPosition.x <= (logX + CONSTANTS.STONE_SIZE.width))){
        console.log('gameOver log');
        gameOver();
      }
  return (
    <TouchableWithoutFeedback onPress={startGame}>
      <Space source={bgImage}>
        <Header
          gameOver={gameOver}
          setMusic={setMusic}
          music={music}
          stopMusic={stopMusic}
        />
        <Animated.View
          style={[
            { position: 'absolute' },
            { transform: stonePosition.getTranslateTransform() },
          ]}
        >
          <Stone />
        </Animated.View>

        <Animated.View
          style={[
            {
              position: 'absolute',
              top: CONSTANTS.STAMP_POSITION.y,
            },
            { transform: stampPosition.getTranslateTransform() },
          ]}
        >
          <Stamp />
        </Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: CONSTANTS.LOG_POSITION.y,
            },
            { transform: logPosition.getTranslateTransform() },
          ]}
        >
          <Log />
        </Animated.View>
        <ScoreText>Score:{isGameRun ? score : 0}</ScoreText>
        <StartMessage isGameRun={isGameRun} />
        <RunMan runnerValueChange={runnerValueChange} />
      </Space>
    </TouchableWithoutFeedback>
  );
};

export default Runner;
