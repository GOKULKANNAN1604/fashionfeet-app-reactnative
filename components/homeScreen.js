import React from 'react';
import { Text, View, StyleSheet, ScrollView} from 'react-native';
import ImageSlider from '../screens/sliderimage';
import SearchBar from './searchbar';
import CollectionPage from './collectionspage';


function HomeScreen1() {
    return (
      <ScrollView>
      <View style={styles.app}>
   
      <ImageSlider />
      <CollectionPage  />
      </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    app: {
      marginHorizontal: "auto",
      maxWidth: 400,
      marginTop:80,
      
    },
   
   
  });
  export default HomeScreen1