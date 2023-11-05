import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use any icon library you prefer
import axios from 'axios';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.76.122:5000/login', {
        email,
        password,
      });
      console.log(response)

      if (response.data.message === 'Login successful') {

        Alert.alert('Success', 'Login successful');
        if(response.data.user){
          await AsyncStorage.setItem('userData',JSON.stringify(response.data.user))
        }else{
          console.warn('user data is missing the response')
        }
        navigation.navigate('Home');
     
      } else {
        Alert.alert('Error', 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground
        source={{
          uri:
            'https://w0.peakpx.com/wallpaper/861/715/HD-wallpaper-air-jordan-1-cartoon-drawing-hypebeast-nike-shoes-thumbnail.jpg',
        }}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <Text style={styles.head}>Login to Your Account</Text>
          <View style={styles.div}>
            <View style={styles.inputContainer}>
              <Icon name="envelope" size={20} color="pink" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="pink" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <Text style={styles.loginButton} onPress={handleLogin}>
              Login
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '105%',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    fontSize: 30,
    color: 'white',
    marginBottom: 10,
  },
  div: {
    borderWidth: 1,
    marginHorizontal: 30,
    borderRadius: 20,
    borderColor: 'black',
    backgroundColor: 'pink',
    paddingHorizontal: 10,
    marginBottom: -50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 20,
    paddingTop:10,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 14,
    marginBottom: 20,
    marginTop:1
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 17,
    color: 'black',
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    fontSize: 17,
    marginHorizontal: 80,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#f4a460',
    backgroundColor: '#f4a460',
    
  },
});

export default LoginScreen;
