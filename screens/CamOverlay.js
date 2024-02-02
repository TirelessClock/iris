import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const CamOverlay = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [cameraRef, setCameraRef] = useState(null);

  
  const uri = route.params.stuff;
  // console.log("CamOverlay received: ", uri);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const bgURI = photo.uri;
      navigation.pop();
      navigation.navigate("OverlayPicture", {bgURI: bgURI, overlayURI: uri});
    }
  };

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const toggleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const backPress = () => {
    navigation.goBack();
  }

  return (

    <View style={styles.container}>    

        <TouchableOpacity onPress={backPress} style={styles.backarrow}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>

        <Text style={styles.header}>Capture Background Image</Text>

        <Camera
            ref={(ref) => setCameraRef(ref)}
            style={styles.camera}
            type={type}
            flashMode={flashMode}
            // onMountError = {console.log("i cannot mount :cry:")}
          ></Camera>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlashMode}>
          <Icon
              name={flashMode === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'}
              size={30}
              color={flashMode === Camera.Constants.FlashMode.off ? 'white' : 'yellow'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.takePictureButton} onPress={takePicture}></TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraType}>
            <Icon
              name={type === Camera.Constants.Type.back ? 'camera-reverse' : 'camera'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    color: 'white',
    zIndex: 1,
    width: '100%',
    textAlign: 'center',
  },
  backarrow: {
    position: 'absolute',
    top: 10, 
    left: 10,
    zIndex: 1,
  },
  brushIcon: {
    position: 'absolute',
    top: 10, 
    right: 10,
    zIndex: 1,
  },
  camera: {
    flex: 1,
    aspectRatio: 0.72,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  takePictureButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 50,
  },
  toggleButton: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginHorizontal: 10,
    borderRadius: 50,
  },
  flashButton: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginHorizontal: 10,
    borderRadius: 50,
  },
});

export default CamOverlay;
