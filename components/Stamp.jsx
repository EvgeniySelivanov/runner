import React from 'react';
import {View, StyleSheet, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { CONSTANTS } from '../constants';
const ImageStamp = styled(ImageBackground)`
  width: ${CONSTANTS.STAMP_SIZE.width}px;
  height: ${CONSTANTS.STAMP_SIZE.height}px;
`;
const bgImage = require('../assets/stamp.png');
const Stamp = () => {
  return (
    <ImageStamp source={bgImage}/>
  );
}


export default Stamp;
