import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Searchbar } from 'react-native-paper';
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

const CollectionPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const onChangeSearch = query => setSearchQuery(query);

  // Updated sample data for your shoe collections
  const collections = [
    {
 
      title: 'Summer Collection',
      price: 199,
      name: "Men's Running Shoes",
      model: 'men',
      size: '9.5',
      brand:'reebok',
      url: 'https://m.media-amazon.com/images/I/61409C4yjrL._SY625._SX._UX._SY._UY_.jpg',
    },
    {
 
      title: 'Winter Collection',
      price: 299,
      name: "Women's Snow Boots",
      model: 'women',
      size: '7',
      brand:'nike',
      url: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_500,ar_3:4,c_fill/dpr_2/cultgear-content/spcUHvokaoNbbSHUxRciM1tB',
    },
    {
 
      title: 'children Collection',
      price: 299,
      name: "children  Boot",
      model: 'children',
      size: '9',
      brand:'campus',
      url: 'https://m.media-amazon.com/images/I/61SGyRylUWL._UY625_.jpg',
    },
    {
 
      title: 'children Collection',
      price: 499,
      name: "children walking shoe",
      model: 'children',
      size: '5',
      brand:'red tape',
      url: 'https://m.media-amazon.com/images/I/61UpM4ETlnL._UY625_.jpg',
    },
    {
    
      title: 'Winter Collection',
      price: 400,
      name: "Men's Snow Boots",
      model: 'men',
      size: '7',
      brand:'adidas',
      url: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_500,ar_3:4,c_fill/dpr_2/cultgear-content/ft4htYccXCjX4B71SXx2M8Zz',
    },
    {
   
      title: 'Casual Collection',
      price: 1290,
      name: "Men's Casual",
      model: 'men',
      size: '9',
      brand:'vkc',
      url: 'https://m.media-amazon.com/images/I/817HALx9euL._UY695_.jpg',
    },
    {
  
      title: 'Casual Collection',
      price: 400,
      name: "Women's Casual",
      model: 'women',
      size: '19',
      brand:'puma',
      url: 'https://m.media-amazon.com/images/I/815ldTNWq9L._UY695_.jpg',
    },
    {
      title: 'running Collection',
      price: 500,
      name: "running shoe",
      model: 'men',
      size: '19',
      brand:'puma',
      url: 'https://m.media-amazon.com/images/I/61ZSYFjfsBL._UX625_.jpg',
    },
    {
    
      title: 'Winter Collection',
      price: 600,
      name: "Men's Snow Boots",
      model: 'men',
      size: '9',
      brand:'adidas',
      url: 'https://m.media-amazon.com/images/I/81JpyXzhGvL._UY575_.jpg',
    },
    {
      title: 'running material',
      price: 999,
      name: "running shoe",
      model: 'women',
      size: '29',
      brand:'puma',
      url: 'https://m.media-amazon.com/images/I/71jbYri6XyL._UY625_.jpg',
    },
    {
      title: 'normal shoe',
      price: 1999,
      name: "running shoe",
      model: 'men',
      size: '12',
      brand:'nike',
      url: 'https://m.media-amazon.com/images/I/817uW65r0VL._UY695_.jpg',
    },
    {
      title: 'college collections',
      price: 3999,
      name: "walking shoe",
      model: 'men',
      size: '12',
      brand:'adidas',
      url: 'https://m.media-amazon.com/images/I/71YYlR1zqxL._UY695_.jpg',
    },
    {
      title: 'children collections',
      price: 99,
      name: "walking shoe",
      model: 'children',
      size: '12',
      brand:'campus',
      url: 'https://m.media-amazon.com/images/I/61XIS9tERKL._SY695._SX._UX._SY._UY_.jpg',
    },


  ];
 
  const addToCart = (collection) => {
    axios.post('http://192.168.35.122:5000/additem', collection)
      .then((response) => {
        Alert.alert('Success', 'Item added  successfully');
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to add item ');
      });
  };

  const [favorites, setFavorites] = useState([]); 

  const toggleFavorite = (id) => {
    // Toggle the favorite status of the item with the given id
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((itemId) => itemId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

   const filteredCollections = collections.filter(collection => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const lowerCaseTitle = collection.name.toLowerCase();
    const lowerCaseModel = collection.model.toLowerCase();
    return (
      lowerCaseTitle.includes(lowerCaseQuery) || 
      (lowerCaseModel.includes(lowerCaseQuery) && (selectedModel === null || lowerCaseModel === selectedModel))
    );
  });
  
  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.search}
      />
      
    
     

      {filteredCollections.map((collection, index) => (
        <View
          key={index} // Use the index as a key
          style={[
            styles.collectionContainer,
            index % 2 === 0 && styles.doubleWidth,
          ]}
        >
          <Image source={{ uri: collection.url }} style={styles.collectionImage} />
          <View style={styles.detailsContainer}>
            <Text style={styles.collectionTitle}>{collection.title}</Text>
            <Text style={styles.collectionPrice}>Rs{collection.price}</Text>
            <Text style={styles.collectionName}>{collection.name}</Text>
            <Text style={styles.collectionModel}>Model: {collection.model}</Text>
            <Text style={styles.collectionbrand}>brand: {collection.brand}</Text>
            <Text style={styles.collectionSize}>Size: {collection.size}</Text>
            <TouchableOpacity
              onPress={() => toggleFavorite(index)} // Pass the index to toggleFavorite
              style={[
                styles.button,
                styles.favoriteButton,
                favorites.includes(index) && styles.favoriteActive,
              ]}
            >
              <Text style={styles.buttonText}>
                {favorites.includes(index) ? 'Remove from Favorites' : 'Add to Favorites'}
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
  search: {
    marginTop: 8,
  },
  modelButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  modelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  modelButtonSelected: {
    backgroundColor: 'blue',
  },
  modelButtonText: {
    fontWeight: 'bold',
  },
  collectionContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  doubleWidth: {
    flex: 2,
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
  collectionbrand:{
color:'red',
fontWeight:'bold'
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
  viewCartButton: {
    backgroundColor: 'blue',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  viewCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CollectionPage;












