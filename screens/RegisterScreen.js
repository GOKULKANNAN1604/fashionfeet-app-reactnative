import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');

  const handleRegister = async () => {
    try {
      // Email validation using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Invalid email address');
        return;
      }

      // Age validation
      const ageNumber = parseInt(age, 10);
      if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 100) {
        Alert.alert('Error', 'Invalid age. Age must be between 1 and 100.');
        return;
      }

      // Mobile number validation using a regular expression
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        Alert.alert('Error', 'Invalid mobile number. It must contain 10 digits.');
        return;
      }

      // Check if the email is already registered
      const checkResponse = await axios.post('http://192.168.76.122:5000/check-email', {
        email,
      });

      if (checkResponse.data.isRegistered) {
        Alert.alert('Error', 'Email is already registered');
        return; // Stop registration if email is already registered
      }
/////////////////////////////async storage







      // Proceed with registration if the email is not registered
      const userData = {
        name: username, // Update to match the key used in ProfileScreen
        email,
        age,
        mobile,
      };
      const userDataJSON = JSON.stringify(userData);
      await AsyncStorage.setItem('userData', userDataJSON);

      const response = await axios.post('http://192.168.76.122:5000/register', {
        email,
        password,
        mobile,
        username,
        age
      });

      if (response.data.success) {
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('Home');
        // You can navigate to the login screen or perform other actions here
      } else {
        Alert.alert('Error', 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Registration failed');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground
        source={{
          uri: "https://w0.peakpx.com/wallpaper/861/715/HD-wallpaper-air-jordan-1-cartoon-drawing-hypebeast-nike-shoes-thumbnail.jpg"
        }}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <Text style={styles.head}>Create Your Account</Text>
          <View style={styles.div}>
            <View style={styles.inputContainer}>
              <Icon name="user" size={20} color="pink" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
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
            <View style={styles.inputContainer}>
              <Icon name="mobile" size={20} color="pink" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType="numeric"
                value={mobile}
                onChangeText={(text) => setMobile(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="user" size={20} color="pink" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={(text) => setAge(text)}
              />
            </View>
            <Text style={styles.regButton} onPress={handleRegister}>
              Register
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
    borderRadius: 30,
    borderColor: 'black',
    backgroundColor: 'pink',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 30,
    borderRadius: 30,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 10
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 17,
    color: '#f4a460',
  },
  regButton: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    fontSize: 17,
    marginHorizontal: 70,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#f4a460',
    backgroundColor: '#f4a460',
  },
});

export default RegisterScreen;
