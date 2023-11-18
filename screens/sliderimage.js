import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Slideshow from "react-native-image-slider-show";

const dataSource = [
  {
    title: "",
    caption: "",
    url: "https://img.freepik.com/free-photo/close-up-hands-tying-laces_23-2147598776.jpg?size=626&ext=jpg&ga=GA1.1.1965413360.1688829853&semt=ais"
  },
  {
    title: "",
    caption: "",
    url: "https://img.freepik.com/free-photo/white-leather-loafers-shoes-women-s-fashion_53876-105410.jpg?size=626&ext=jpg&ga=GA1.1.1965413360.1688829853&semt=ais"
  },
  {
    title: "",
    caption: "",
    url: "https://img.freepik.com/free-photo/standing-with-social-distancing-during-coronavirus-pandemic_53876-94750.jpg?size=626&ext=jpg&ga=GA1.1.1965413360.1688829853&semt=ais"
  },
  {
    title: "",
    caption: "",
    url: "https://img.freepik.com/free-photo/close-up-girl-legs-sitting-her-electro-scooter-summer-street_158595-6191.jpg?t=st=1697007046~exp=1697007646~hmac=a1767405eef176f6a685b757888ebfdd69cff204bcc4fcc8fc26b9142fc608d1"
  },
];

const ImageSlider = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === dataSource.length - 1 ? 0 : position + 1);
    }, 3000);

    return () => clearInterval(toggle);
  });

  return (
    <View style={styles.sliderContainer}>
      <Slideshow
        position={position}
        dataSource={dataSource}
        style={styles.slideshow}
        titleStyle={styles.titleStyle} // Add title style
        captionStyle={styles.captionStyle} // Add caption style
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
   marginTop:-50
  },
  slideshow: {
    width: "100%",
    height: 200,

  },
  titleStyle: {
    fontSize: 20, // Adjust the title font size
    color: "white", // Change title text color
    fontWeight: "bold", // Make title bold
  },
  captionStyle: {
    fontSize: 16, // Adjust the caption font size
    color: "#f4a460", // Change caption text color
  },
});

export default ImageSlider;
