import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const BScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const stuff = route.params.temp; 

    // console.log("BScreen received: ", stuff);

    setTimeout(() => {
        navigation.pop();
        navigation.navigate("CamOverlay", {stuff});
      }, 2);

    
}

export default BScreen;