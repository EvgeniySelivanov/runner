import React from 'react';
import {View, StyleSheet, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { CONSTANTS } from '../constants';
const ImageLog = styled(ImageBackground)`
  width: ${CONSTANTS.LOG_SIZE.width}px;
  height: ${CONSTANTS.LOG_SIZE.height}px;
`;
const bgImage = require('../assets/log.png');
const Log = () => {
  return (
    <ImageLog source={bgImage}/>
  );
}


export default Log;