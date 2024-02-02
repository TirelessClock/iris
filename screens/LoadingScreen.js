import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Animated, Easing, Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Text as SvgText } from 'react-native-svg';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      if (!cameraPermission.granted || !galleryPermission.granted || !mediaLibraryPermission) {
        Alert.alert(
          'Permission Required',
          'This app requires camera and gallery permissions.',
          [
            {
              text: 'Exit',
              onPress: () => navigation.goBack(), // Exit the app if permissions denied
            },
            {
              text: 'Go to Settings',
              onPress: () => openSettings(),
            },
          ],
          { cancelable: false }
        );
      } else {
        setTimeout(() => {
          navigation.navigate('Home'); // Navigate to the home page after 4 seconds
        }, 200);
      }

      startAnimation();
    };

    const startAnimation = () => {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    const openSettings = () => {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
      } else {
        Linking.openSettings();
      }
      requestPermissions();
    };

    const requestPermissions = async () => {
      const [cameraPermission, galleryPermission, mediaLibraryPermission] = await Promise.all([
        Camera.requestCameraPermissionsAsync(),
        ImagePicker.requestMediaLibraryPermissionsAsync(),
        MediaLibrary.requestPermissionsAsync()
      ]);

      if (cameraPermission.granted && galleryPermission.granted && mediaLibraryPermission) {
        setTimeout(() => {
          navigation.navigate('Home'); 
        }, 200);
      }
    };

    checkPermissions();

    // return () => {
    //   rotateAnim.stopAnimation();
    // };
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Svg height="100" width="300">
          <SvgText x="0" y="100" fontSize="100" fontWeight="bold" fill="black">
            iris.
          </SvgText>
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "1111ff",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
