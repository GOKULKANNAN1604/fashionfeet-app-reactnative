import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
  const navigation = useNavigation();

  const navigateToCategory = () => {
    // Navigate to the next page for the selected category
    navigation.navigate('men'); // This line was missing the () to call the function
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToCategory}>
        <Image
          source={{ uri: 'https://media.istockphoto.com/id/912645452/photo/young-casual-man-sitting-and-fixing-pants-while-looking-away.jpg?s=612x612&w=0&k=20&c=g8Z5ccrrau-0lacmz8Xhl-on1lteALoOBgW-ZXHSaG4=' }}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryText}>Men</Text>
      </TouchableOpacity>

      <TouchableOpacity >
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJrKP-ife6iDZCCR6xryGzqHASFvvzrHUn7ATVG8lJvS6Kn0hdg5GsXlOycByPXmBZ85s&usqp=CAU' }}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryText}>Women</Text>
      </TouchableOpacity>

      <TouchableOpacity >
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47gN5ywNcig8eisiwnweaWA8B-KnfOlukS3Ohw0V35ISNJJtpzOAfjfSQuQFf3S12b8E&usqp=CAU' }}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryText}>Children</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: 150, // Adjust the width and height as needed
    height: 150,
    borderRadius: 75, // To make it a circular image
    borderWidth: 2, // Add a border around the image
    borderColor: 'blue', // Border color
    resizeMode: 'cover', // You can use 'cover' for image resizing
  },
  categoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
});

export default Categories;
