import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Alert } from "react-native";

const MenCollectionPage = () => {
  const [menCollections, setMenCollections] = useState([
    {
      id: 1,
      title: 'Summer Collection',
      price: 199,
      name: "Men's Running Shoes",
      model: 'men',
      size: '9.5',
      url: 'https://m.media-amazon.com/images/I/61409C4yjrL._SY625._SX._UX._SY._UY_.jpg',
    },
    // Add more men's collection items here
  ]);

  const [cart, setCart] = useState([]); // For storing items added to the cart
  const [favorites, setFavorites] = useState([]); // For storing favorite items

  const addToCart = (collection) => {
    // Add the collection item to the cart
    setCart([...cart, collection]);
    Alert.alert('Success', 'Item added to cart successfully');
  };

  const toggleFavorite = (id) => {
    // Toggle the favorite status of the item with the given id
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((itemId) => itemId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {menCollections.map((collection) => (
        <View key={collection.id} style={styles.collectionContainer}>
          <Image source={{ uri: collection.url }} style={styles.collectionImage} />
          <View style={styles.detailsContainer}>
            <Text style={styles.collectionTitle}>{collection.title}</Text>
            <Text style={styles.collectionPrice}>Rs{collection.price}</Text>
            <Text style={styles.collectionName}>{collection.name}</Text>
            <Text style={styles.collectionModel}>Model: {collection.model}</Text>
            <Text style={styles.collectionSize}>Size: {collection.size}</Text>
            <TouchableOpacity
              onPress={() => toggleFavorite(collection.id)}
              style={[
                styles.button,
                styles.favoriteButton,
                favorites.includes(collection.id) && styles.favoriteActive,
              ]}
            >
              <Text style={styles.buttonText}>
                {favorites.includes(collection.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => addToCart(collection)}
              style={[styles.button, styles.addToCartButton]}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
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
  },
  collectionContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  collectionImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
  },
  collectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  collectionPrice: {
    marginTop: 4,
    fontSize: 16,
    color: 'green',
  },
  collectionName: {
    fontSize: 14,
  },
  collectionModel: {
    fontSize: 14,
    color: 'gray',
  },
  collectionSize: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
  },
  favoriteActive: {
    backgroundColor: 'rgba(255, 0, 0, 1)',
  },
  addToCartButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MenCollectionPage;
