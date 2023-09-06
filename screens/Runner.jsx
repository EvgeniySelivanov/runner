import React, { useState, useEffect,useRef } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import { CONSTANTS } from '../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import styled from 'styled-components/native';
import StartMessage from '../components/StartMessage';
import RunMan from '../components/RunMan';
import Header from '../components/Header';

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
  const [isGameRun, setIsGameRun] = useState(false);
  const [rannerPosition, setRannerPosition] = useState(CONSTANTS.RUNNER_POSITION);
  const [score, setScore] = useState(0);
  const gap = 300;

  const runnerValueChange = (xPosition) => {
    setRannerPosition((rannerPosition) => ({
      ...rannerPosition,
      x: xPosition,
    }));
  };

  //start  obstacles
  //stone used
  //log used
  //stamp used





  //sound effect
  // const soundObject = new Audio.Sound();
  // const playSound = async () => {
  //   console.log('play shot');
  //   try {
  //     await soundObject.loadAsync(require('../assets/sound.mp3'));
  //     await soundObject.playAsync();
  //     // Обязательно выгрузите звуковой объект после воспроизведения
  //     await soundObject.unloadAsync();
  //   } catch (error) {
  //     console.log('Sound error>>>', error);
  //   }
  // };

  //check for collisions
  // useEffect(() => {
  //   if (
      
  //   ) {
  //     console.log('game over');
  //     gameOver();
  //   }
  // },[]);
//game over
  const gameOver = () => {
    // soundObject.unloadAsync();
    setIsGameRun(false);
  };
 // start game
  const startGame = () => {
    console.log('game start');
    setIsGameRun(true);
  };

  return (
    <TouchableWithoutFeedback onPress={startGame}>
      <Space source={bgImage}>
        <Header gameOver={gameOver} />
        <ScoreText>Score:{isGameRun ? score : 0}</ScoreText>
        <StartMessage isGameRun={isGameRun} />
        <RunMan
          runnerValueChange={runnerValueChange}
        />
      </Space>
    </TouchableWithoutFeedback>
  );
};

export default Runner;
