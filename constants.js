import { Dimensions } from 'react-native';
export const CONSTANTS = {
  SCREEN_HEIGHT: Dimensions.get('screen').height,
  SCREEN_WIDTH: Dimensions.get('screen').width,
  RUNNER_POSITION: { x: 175, y: 490 },
  STONE_SIZE: { width: 100, height: 67 },
  STAMP_SIZE:{ width: 100, height: 62 },
  LOG_HEIGHT:30,
  RUNNER_SIZE:{width:100, height:86},
  GAME_SPEED:6000,
};
