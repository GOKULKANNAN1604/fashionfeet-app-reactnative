import { StatusBar } from 'expo-status-bar';
import { useCallback ,useState} from "react";
import React from 'react';
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View, Image, ImageBackground,TextInput} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded] = useFonts({
    "mrt-mid": require("../assets/josefin-sans/JosefinSans-Regular.ttf"),
    "mrt-bold": require("../assets/montserrat/Montserrat-ExtraBoldItalic.otf"),
    "mrt-xbold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    "mrt-":require("../assets/Lobster/Lobster_1.3.otf")
  });
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleRegister = () => {
    navigation.navigate('Register');
  };
  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }
 
  return (
    <View style={styles.container} onLayout={handleOnLayout}>
      <ImageBackground 
        source={{uri:"https://w0.peakpx.com/wallpaper/861/715/HD-wallpaper-air-jordan-1-cartoon-drawing-hypebeast-nike-shoes-thumbnail.jpg"}}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <Image style={styles.image} source={{uri: 'https://o.remove.bg/downloads/977c9fd9-122a-4793-aebd-0c8e4aaec423/download__1_-removebg-preview.png'}} ></Image>
          <View style={styles.link}>
       
          <Text style={styles.loginButton} onPress={handleLogin}>Log in</Text>
          <Text style={styles.signup}>Not a member yet? <Text style={styles.button} onPress={handleRegister}>Signup</Text></Text>
          <StatusBar style="auto" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7fffd4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: '80%',
    marginTop: 300,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: '105%',
    alignItems: 'center',
  }
  ,
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)', // Adjust the last value for opacity (0.5 is 50% opacity)
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 40,
    marginVertical:10,
    borderWidth:2,
    borderColor:'#f4a460',
    backgroundColor:'#f4a460',
    textAlign:"center"
  },
  signup: {
    marginTop: 1,
    color: 'white',
    marginLeft:120,
  },
  button: {
    textDecorationLine: 'underline',
    fontWeight:'bold',
    color: 'white',
    fontSize:20,
    color:'orange'
  },
  link:{
    marginBottom:100,
    marginTop:150
  }
});
