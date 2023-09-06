import React from 'react';
import {View, StyleSheet, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { CONSTANTS } from '../constants';
const ImageStone = styled(ImageBackground)`
  width: ${CONSTANTS.STONE_SIZE.width}px;
  height: ${CONSTANTS.STONE_SIZE.height}px;
`;
const bgImage = require('../assets/stone.png');
const Stone = () => {
  return (
   <ImageStone source={bgImage}/>
  );
}


export default Stone;
