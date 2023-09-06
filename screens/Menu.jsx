import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { CONSTANTS } from '../constants';

const Space = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  padding: 20px;
  margin-top: 25px;
  margin-bottom: 25px;
  background-color: blue;
`;

const StyledText = styled.Text`
  margin-top: 10px;
  color: #d9ff00;
  font-size: 30px;
  font-weight: 700;
  border: 2px #5105f5 solid;
  padding: 7px;
  border-radius: 5px;
`;
const StyledMenu = styled.Text`
  margin-top: 10px;
  color: #ffffff;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  padding: 7px;
`;
const Span = styled.Text`
  margin-top: 10px;
  color: #f5ed05;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  padding: 7px;
`;
const Menu = () => {
  const [speedGame, setSpeed] = useState(CONSTANTS.GAME_SPEED);
  const changeSpeed = () => {
    if(speedGame>=2000){setSpeed((speedGame) => speedGame - 500);}
    
    console.log(speedGame);
  };
  const play = () => {
    navigation.navigate('Runner', {speedGame});
  };
  const defaultOption = () => {
    setSpeed(CONSTANTS.GAME_SPEED);
    console.log(speedGame);

  };
  const navigation = useNavigation();
  return (
    <Space
      colors={[
        'rgba(107,241,2,1) 0%',
        'rgba(31,231,104,1) 14%',
        'rgba(0,242,162,1) 28%',
        'rgba(0,224,246,1) 42%',
        'rgba(67,188,213,1) 58%',
        'rgba(13,125,233,1) 76%',
        'rgba(105,229,244,1) 100%',
      ]}
    >
      <StyledMenu>Menu</StyledMenu>
      <StyledText onPress={play}>Play</StyledText>
      <StyledText onPress={changeSpeed}>
        Game speed UP : <Span>{10- (speedGame / 1000)}</Span>
      </StyledText>
      <StyledText onPress={defaultOption}>Reset options</StyledText>
    </Space>
  );
};

export default Menu;
