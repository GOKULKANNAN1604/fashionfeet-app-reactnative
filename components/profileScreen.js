import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
export default ProfileScreen = () => {
  const [userData, setUserData] = useState({ name: '', email: '', age: '', mobile: '' });

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue !== null) {
        const user = JSON.parse(jsonValue);
        setUserData(user);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate('Homescreen');
  };

  const navigateToCart = () => {
    navigation.navigate('mycart');
  };

  const navigateToOrders = () => {
    navigation.navigate('orderpage');
  };

  // Function to handle the logout and navigate to the home page
  const handleLogout = () => {
    // Perform any logout actions here, such as clearing user data from AsyncStorage.
    // For demonstration, we'll just navigate to the home page.
    Alert.alert("Thank you for using my app")
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
          />
          <Text style={styles.info1}>{userData.name}</Text>
          <Text style={styles.info1}> {userData.email}</Text>
          <Text style={styles.info1}>Age:{userData.age}</Text>
          <Text style={styles.info1}> {userData.mobile}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.item}>
          <View style={styles.iconContent}>
            <Image
              style={styles.icon}
              source={{ uri: 'https://img.icons8.com/color/70/000000/cottage.png' }}
            />
          </View>
          <View style={styles.infoContent}>
            <TouchableOpacity onPress={navigateToHome}>
              <Text style={styles.info}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.iconContent}>
            <Image
              style={styles.icon}
              source={{
                uri:
                  'https://o.remove.bg/downloads/d8493404-2bed-4ead-8f5c-71b25b9f1b99/pngtree-shopping-cart-icon-png-free-map-image_1187823-removebg-preview.png',
              }}
            />
          </View>
          <View style={styles.infoContent}>
            <TouchableOpacity onPress={navigateToCart}>
              <Text style={styles.info}>My cart</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.iconContent}>
            <Image
              style={styles.icon}
              source={{
                uri:
                  'https://o.remove.bg/downloads/fa9a41b6-1d05-4e6b-b1ed-2040c5cd1a9e/png-transparent-computer-icons-order-picking-text-task-symbol-thumbnail-removebg-preview.png',
              }}
            />
          </View>
          <View style={styles.infoContent}>
            <TouchableOpacity onPress={navigateToOrders}>
              <Text style={styles.info}>My orders</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.item}>
          <View style={styles.iconContent}>
            <Image
              style={styles.icon}
              source={{
                uri:
                  'https://o.remove.bg/downloads/15d1c85d-2f21-421c-917f-b373ddcd6e4b/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail-removebg-preview.png',
              }}
            />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.info}>Profile</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#DCDCDC',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  info1: {
    fontSize: 18,
    marginTop: 5,
    color: 'black',
  },
  body: {
    backgroundColor: '#778899',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginRight: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF',
    marginLeft: -25,
  },
  info1: {
    fontSize: 18,
    marginTop: 20,
    color: 'gray',
marginHorizontal:20,
    fontWeight:"700"
  },
  logoutButton: {
    backgroundColor: 'blue',
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});
