import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Runner from './Runner';
import { StartScreen } from './StartScreen';
import Menu from './Menu';

import WebViewScreen from './WebViewScreen';

const Stack = createNativeStackNavigator();

 const Navigation = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={StartScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="WebViewScreen" component={WebViewScreen}/>
      <Stack.Screen name="Runner" component={Runner} options={{ headerShown: false }}/>
      <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
};
export default Navigation;