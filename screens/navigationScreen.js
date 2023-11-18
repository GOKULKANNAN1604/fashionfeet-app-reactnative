import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomNavigation, Text, Appbar } from 'react-native-paper';
import HomeScreen1 from '../components/homeScreen';
import OrderScreen from '../components/orderScreen';
import FavoritesPage from '../components/likeScreen';
import ProfileScreen from '../components/profileScreen';
import Categories from './categories';

const Navigatscreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'orders', title: 'My Cart', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    // { key: 'cat', title: 'categories', focusedIcon: 'grid' },
    { key: 'fav', title: 'my orders', focusedIcon: 'car', unfocusedIcon: 'car-outline' },
  
    { key: 'profile', title: 'Profile', focusedIcon: 'hail' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen1,
    orders: OrderScreen,
    fav: FavoritesPage,
    cat:Categories,
    profile: ProfileScreen,
  });

  return (
    <View style={styles.container}>
      {/* Top Menu Bar */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Fashion-Feet" />
      </Appbar.Header>

      {/* Bottom Navigation */}
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: 'white' }} // Customize the background color
        activeColor="#f4a460" // Customize the active icon and label color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    backgroundColor: '#f4a460', // Customize the background color of the app bar
marginLeft:120,
fontWeight:900
  },
 
});

export default Navigatscreen;
