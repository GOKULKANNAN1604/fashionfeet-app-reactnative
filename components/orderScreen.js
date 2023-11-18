import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const OrderScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
console.log(cartItems)

/////////////////////////////////////////////////////////////

const handleBuyNow = () => {
  const currentDate = new Date(); // Get the current date and time
    const formattedDate = currentDate.toISOString();


  const totalValue = cartItems.reduce((total, item) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace(/[^\d.]/g, ''));
    return total + price;
  }, 0);

  const cartItemData = cartItems.map((item) => ({
    title: item.title,
    price: item.price,
    name: item.name,
    model: item.model,
    size: item.size,
    url: item.url,
  }));

  // Include the total value in the data sent to the server
  const orderData = {
    items: cartItemData,
    total: totalValue,
    orderDate: formattedDate,
  };

  axios.post('http://192.168.35.122:5000/order', orderData)
    .then((response) => {
      navigation.navigate('PaymentScreen',{total: totalValue});
      console.log("Order success", orderData);
    })
    .catch((error) => {
      console.log('Error', 'Failed order');
    });
};

  // Function to fetch cart items from the server
  const fetchCartItems = () => {
    axios.get('http://192.168.35.122:5000/cartitem')
      .then((response) => {
        if (Array.isArray(response.data)) {
          const itemsWithValidPrice = response.data.map((item) => ({
            ...item,
            price: typeof item.price === 'string' ? item.price : String(item.price),
          }));
          setCartItems(itemsWithValidPrice);
        } else {
          // Handle empty response or other cases
          
          console.error('No cart items found in the response.');
        }
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  };

  const removeItemFromCart = (itemId) => {
    axios.delete(`http://192.168.35.122:5000/cartitem/${itemId}`)
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  };

  useEffect(() => {
    fetchCartItems();

    // Set up polling to fetch cart items every 5 seconds (adjust the interval as needed)
    const pollingInterval = setInterval(() => {
      fetchCartItems();
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      {cartItems.length === 0 ? (
        <Text>No items in your cart.</Text>
      ) : (
        cartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image source={{ uri: item.url }} style={styles.itemImage} />

            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Price: {parseFloat(item.price)} Rs</Text>
              <Text style={styles.itemModel}>Model: {item.model}</Text>
              <Text style={styles.itemSize}>Size: {item.size}</Text>
              {/* Add any other item details you want to display */}
            </View>

            {/* Remove button */}
            <TouchableOpacity
              onPress={() => removeItemFromCart(item._id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>
          Rs{cartItems.reduce((total, item) => {
            // Ensure item.price is a valid number before adding it to the total
            const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace(/[^\d.]/g, ''));
            return total + price;
          }, 0).toFixed(2)}
        </Text>
      </View>

      {/* Buy Now button */}
      <Button title="Buy Now" onPress={handleBuyNow} style={styles.buyNowButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemModel: {
    fontSize: 16,
  },
  itemSize: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyNowButton: {
    marginTop: 16,
  },
});

export default OrderScreen;
