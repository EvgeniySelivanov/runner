import React, { useState } from 'react';
import { View,StyleSheet,PanResponder, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { CONSTANTS } from '../constants';
import SvgMan from './ImageMan';
const RunnerMan = styled(ImageBackground)`
  width: ${CONSTANTS.RUNNER_SIZE.width}px;
  height: ${CONSTANTS.RUNNER_SIZE.height}px;
`;
const RunMan = ({ runnerValueChange }) => {
  const [position, setPosition] = useState(CONSTANTS.RUNNER_POSITION);
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      runnerValueChange(gesture.moveX);
      if (gesture.moveX >= 0 && gesture.moveX <= 330)
        setPosition({
          x: gesture.moveX,
        });
    },
  });

  return (
    <View
      style={[
        styles.draggable,
        { left: position.x, top: CONSTANTS.RUNNER_POSITION.y },
      ]}
      {...panResponder.panHandlers}
    >
      <SvgMan/>
    </View>
  );
};
const styles = StyleSheet.create({
  draggable: {
    position: 'absolute',
    width: 100,
    height: 86,
    zIndex: 10,
  },
});
export default RunMan;
