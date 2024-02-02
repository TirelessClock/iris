// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CameraScreen from './screens/CameraScreen';
import CamOverlay from './screens/CamOverlay';
import Home from './screens/Home';
import LoadingScreen from './screens/LoadingScreen';
import OverlayPicture from './screens/overlayPicture';
import BScreen from './screens/BScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="CamOverlay" component={CamOverlay} />
        <Stack.Screen name="OverlayPicture" component={OverlayPicture} />
        <Stack.Screen name="BScreen" component={BScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
