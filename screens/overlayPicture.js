import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import DraggableImage from '../components/draggableimage';
import Icon from 'react-native-vector-icons/Ionicons';
import saveImageToGallery from '../components/saveimage';
import ViewShot from 'react-native-view-shot';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const OverlayPicture = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [rotation, setRotation] = useState(0);
    const [direction, setDirection] = useState(1);
    const viewShotRef = useRef(null);
    const { bgURI, overlayURI } = route.params;


    const takeScreenshot = async () => {
        if (!viewShotRef.current) {
            return;
        }
        try {
            const uri = await viewShotRef.current.capture();
            console.log('Screenshot URI:', uri);
            saveImageToGallery(uri);
        } catch (error) {
            console.error('Error taking screenshot:', error);
        }
    };

    const rotateImage = () => {
        const newRotation = (rotation + 90) % 360;
        setRotation(newRotation);
    };

    const swapDirection = () => {
        const newDirection = -direction;
        setDirection(newDirection);
    }

    
    const backPress = () => {
        // navigation.navigate("Home");
        // let temp = "idk";
        // navigation.navigate("CamOverlay", {temp});
        // navigation.pop();
        navigation.goBack();
    }

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Capture Merged Picture</Text>

            <TouchableOpacity onPress={backPress} style={styles.backarrow}>
                <Icon name="arrow-back" size={30} color="white"/>
            </TouchableOpacity>


            <View style={[styles.imagecontainer]}>
                <ViewShot ref={viewShotRef} style={{ flex: 1 }}>
                    <DraggableImage source={overlayURI} style={styles.overlayImage} rotation={rotation} direction={direction}/>
                    <Image source={{uri: bgURI}} style={styles.bgImage} />
                </ViewShot>
            </View>

            <View style={styles.controls}>

                <TouchableOpacity onPress={rotateImage} >
                <Icon name="refresh-outline" size={30} color="white"/>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.takePictureButton} onPress={takeScreenshot}></TouchableOpacity>    

                <TouchableOpacity onPress={swapDirection} >
                <Icon name="swap-horizontal-outline" size={30} color="white"/>
                </TouchableOpacity>

            </View>

        </View>
    )
}

styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
    },
    backarrow: {
        position: 'absolute',
        top: 10, 
        left: 10,
        zIndex: 1,
    },
    header: {
        position: 'absolute',
        color: 'white',
        zIndex: 1,
        width: '100%',
        textAlign: 'center',
    },
    imagecontainer: {
        backgroundColor: 'black',
        flex: 1,
    },
    bgImage: {
        marginTop: '50%',
        marginBottom: '50%',
        aspectRatio: 1,
        alignItems: 'center',
        width: '50%', 
        height: '50%',
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
        marginHorizontal: 80,
        marginVertical: 10,
        borderRadius: 50,
      },
    overlayImage: {
        flex:1,
        height: '100%',
        width: '100%',
    },
})

export default OverlayPicture;