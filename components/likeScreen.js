import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const FavoritesPage = ({ route }) => {
  const name = route.params?.name;
  console.log(name);

  const [orderingItems, setOrderingItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Fetch order items from the server when the component mounts
    axios
      .get('http://192.168.35.122:5000/orderitems')
      .then((response) => {
        console.log('Response:', response.data); // Log the response
        setOrderingItems(response.data);

        // Calculate the total cost
        const cost = response.data.reduce((acc, item) => acc + item.price, 0);
        setTotalCost(cost);
      })
      .catch((error) => {
        console.error('Error fetching order items:', error);
      });

    const now = new Date();
    const formattedDate = `${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order Items</Text>
      <Text style={styles.totalCost}>Total Buying Cost: {totalCost} Rs</Text>

      {orderingItems.map((item, index) => (
        <View style={styles.box}>
        <View key={index} style={styles.orderItem}>
          <Image source={{ uri: item.url }} style={styles.orderItemImage} />
          <View style={styles.orderItemDetails}>
            <Text style={styles.orderItemName}>{item.name}</Text>
            <Text style={styles.orderItemPrice}>Price: {item.price} Rs</Text>
            <Text style={styles.orderItemModel}>Model: {item.model}</Text>
            <Text style={styles.orderItemSize}>Size: {item.size}</Text>
            <Text style={styles.dateText}>your ordering Date: {currentDate}</Text>
          </View>
        </View>
        </View>
      ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  box:{
borderWidth:0.5,
color:'green'
  },
  dateText: {
    fontSize: 14,
    color: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'blue',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  orderItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  orderItemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  orderItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderItemPrice: {
    fontSize: 16,
    color: 'green',
  },
  orderItemModel: {
    fontSize: 14,
    color: 'gray',
  },
  orderItemSize: {
    fontSize: 14,
    color: 'gray',
  },
  totalCost: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
    color: 'red',
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
});

export default FavoritesPage;
