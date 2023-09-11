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
import Decoration from '../components/Decoration';

const bgImage = require('../assets/bg2.png');
const Space = styled(ImageBackground)`
  flex: 1;
  margin-top: 25px;
  margin-bottom: 25px;
  overflow: hidden;
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


  useEffect(() => {
    if (isGameRun && music) {
      playSound();
    }
  }, [music]);

  useEffect(() => {
    stonePosition.addListener((value) => {
      const xPosition=value.x;
      const yPosition=value.y;
      if ((rannerPosition.x >= xPosition && rannerPosition.x <= xPosition + CONSTANTS.STONE_SIZE.width)&&
          (rannerPosition.y <= yPosition &&
          rannerPosition.y + CONSTANTS.RUNNER_SIZE.height >= yPosition)
      ) {
        gameOver();
      }
    });
    return () => {
      stonePosition.removeAllListeners();
    };
  }, [stonePosition,rannerPosition]);

  useEffect(() => {
    stampPosition.addListener((value) => {
      const xPosition=value.x;
      const yPosition=value.y;
      if ((rannerPosition.x >= xPosition && rannerPosition.x <= xPosition + CONSTANTS.STONE_SIZE.width)&&
          (rannerPosition.y <= yPosition-250 &&
          rannerPosition.y + CONSTANTS.RUNNER_SIZE.height >= yPosition-250)
      ) {
        gameOver();
      }
    });
    return () => {
      stampPosition.removeAllListeners();
    };
  }, [stampPosition,rannerPosition]);


  useEffect(() => {
    logPosition.addListener((value) => {
      const xPosition=value.x;
      const yPosition=value.y;
      if ((rannerPosition.x >= xPosition && rannerPosition.x <= (xPosition + CONSTANTS.STONE_SIZE.width))&&
          (rannerPosition.y <= yPosition-450 &&
          rannerPosition.y + CONSTANTS.RUNNER_SIZE.height >= yPosition-450))
       {
        gameOver();
      }});
      return () => {
        logPosition.removeAllListeners();
      };
  }, [logPosition,rannerPosition]);


  useEffect(() => {
    logPosition.y.addListener(({value}) => {
      const yPosition=value;
      if(yPosition >= CONSTANTS.SCREEN_HEIGHT + 350){
        setScore((score) => score + 1);
        startGame();
      }
    });
    return () => {
      logPosition.y.removeAllListeners();
    };
  }, [logPosition.y,rannerPosition]);


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
    Animated.timing(stonePosition).stop();
    Animated.timing(stampPosition).stop();
    Animated.timing(logPosition).stop();
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
  
 
  return (
    <TouchableWithoutFeedback onPress={startGame}>
      <Space source={bgImage}>
        <Header
          gameOver={gameOver}
          setMusic={setMusic}
          music={music}
          stopMusic={stopMusic}
        />
        {isGameRun && (
          <View>
            <Decoration
              speed={speed}
              imageName="image8"
              positionY={-400}
              positionX={0}
            />
            <Decoration
              speed={speed}
              imageName="image8"
              positionY={400}
              positionX={0}
            />
            <Decoration
              speed={speed}
              imageName="image1"
              positionY={CONSTANTS.SCREEN_HEIGHT / 2}
              positionX={CONSTANTS.SCREEN_WIDTH / 2}
            />
            <Decoration
              speed={speed}
              imageName="image7"
              positionY={CONSTANTS.SCREEN_HEIGHT / 3}
              positionX={CONSTANTS.SCREEN_WIDTH / 5}
            />
            <Decoration
              speed={speed}
              imageName="image2"
              positionY={CONSTANTS.SCREEN_HEIGHT / 6}
              positionX={CONSTANTS.SCREEN_WIDTH * 0.8}
            />
            <Decoration
              speed={speed}
              imageName="image3"
              positionY={CONSTANTS.SCREEN_HEIGHT / 8}
              positionX={CONSTANTS.SCREEN_WIDTH * 0.3}
            />
            <Decoration
              speed={speed}
              imageName="image4"
              positionY={-100}
              positionX={CONSTANTS.SCREEN_WIDTH * 0.1}
            />
            <Decoration
              speed={speed}
              imageName="image5"
              positionY={CONSTANTS.SCREEN_HEIGHT / 20}
              positionX={CONSTANTS.SCREEN_WIDTH * 0.7}
            />
            <Decoration
              speed={speed}
              imageName="image6"
              positionY={-200}
              positionX={CONSTANTS.SCREEN_WIDTH * 0.72}
            />
          </View>
        )}

        <Animated.View
          style={[
            { position: 'absolute', marginTop: 25 },
            { transform: stonePosition.getTranslateTransform() },
          ]}
        >
          <Stone />
        </Animated.View>

        <Animated.View
          style={[
            {
              position: 'absolute',
              marginTop: 25,
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
              marginTop: 25,
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
