

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/login';
import OrderScreen from './components/orderScreen';
import PaymentScreen from './components/paymentscreen';
import HomeScreen1 from './components/homeScreen';
import FavoritesPage from './components/likeScreen';
import Categories from './screens/categories';
import MenCollectionPage from './components/mens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Homescreen" component={HomeScreen1}  options={{ headerShown: false }}/>
        <Stack.Screen name="mycart" component={OrderScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="cat" component={Categories}  options={{ headerShown: false }}/>
        <Stack.Screen name="men" component={MenCollectionPage}  options={{ headerShown: false }}/>
        <Stack.Screen name="orderpage" component={FavoritesPage}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
