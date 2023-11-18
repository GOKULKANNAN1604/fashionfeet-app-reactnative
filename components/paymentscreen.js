import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Alert } from "react-native";

const PaymentScreen = ({ navigation,route }) => {
const total=route.params?.total || 0
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [showCODDetails, setShowCODDetails] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const openPaymentMethodScreen = (method) => {
    setSelectedPaymentMethod(method);
    setShowCODDetails(false);
    setShowCardDetails(false);

    if (method === 'cod') {
      setShowCODDetails(true);
    } else if (method === 'card') {
      setShowCardDetails(true);
    }
  };
  

  const validateCODInputs = () => {
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const pincodeRegex = /^\d{6}$/;

    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Input', 'Phone number must be 10 digits.');
      return false;
    }

    if (!nameRegex.test(name)) {
      Alert.alert('Invalid Input', 'Name must contain only letters.');
      return false;
    }

    if (!pincodeRegex.test(pincode)) {
      Alert.alert('Invalid Input', 'Pincode must be 6 digits.');
      return false;
    }

    return true;
  };


  const validateCardInputs = () => {
    const cardNumberRegex = /^\d{5}$/; // Assuming card number is a 16-digit number
   
    const cvvRegex = /^\d{3}$/;
  
    if (!cardNumberRegex.test(cardNumber)) {
      Alert.alert('Invalid Input', 'Card number must be a 16-digit number.');
      return false;
    }
  
   
    if (!cvvRegex.test(cvv)) {
      Alert.alert('Invalid Input', 'CVV must be a 3-digit number.');
      return false;
    }
  
    // You can add more specific validation rules as needed
  
    return true;
  };

  const handlePayment = () => {
    if (selectedPaymentMethod === 'gpay') {
      // Implement Google Pay logic
    } 
    else if (selectedPaymentMethod === 'card') {
      if (!validateCardInputs()) {
        // If card input validation fails, do not proceed with payment
        return;
      }
      Alert.alert('Success', `Successfully ordering your items with ${total} Rs`, [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to the 'orderpage' after the user acknowledges the alert
            navigation.navigate('orderpage');
          },
        },
      ]);
    } 
    else if (selectedPaymentMethod === 'cod') {
      if (validateCODInputs()) {
        const codDetails = {
          address,
          phoneNumber,
          name,
          pincode,
        };
        Alert.alert('Success', `hey ${name} Successfully ordering your items with ${total} Rs`, [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the 'orderpage' after the user acknowledges the alert
              navigation.navigate('orderpage');
            },
          },
        ]);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.selectPaymentText}>Select your Payment Method</Text>
      <Text style={styles.total}>Amount:{total.toFixed(2)}Rs</Text>
     
      <TouchableOpacity
        style={styles.button}
        onPress={() => openPaymentMethodScreen('cod')}
      >
        <Text style={styles.buttonText}>Cash on Delivery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openPaymentMethodScreen('card')}
      >
        <Text style={styles.buttonText}>Pay with Card</Text>
      </TouchableOpacity>

      {selectedPaymentMethod === 'card' && (
        <View style={styles.cardInput}>
          <Text style={styles.cardInputLabel}>Card Details:</Text>
          <TextInput
            style={styles.codInputField}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
              style={styles.codInputField}
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(text)}
            />
               
            <TextInput
              style={styles.codInputField}
              placeholder="Card Holder"
              value={cardHolder}
              onChangeText={(text) => setCardHolder(text)}
            />
            <TextInput
              style={styles.codInputField}
              placeholder="Expiry Date (MM/YY)"
              value={expiryDate}
              onChangeText={(text) => setExpiryDate(text)}
            />
            <TextInput
              style={styles.codInputField}
              placeholder="CVV"
              value={cvv}
              onChangeText={(text) => setCVV(text)}
            />
        </View>
      )}

      {showCODDetails && (
        <View style={styles.codInput}>
          <Text style={styles.codInputLabel}>Cash on Delivery Details:</Text>
          <TextInput
            style={styles.codInputField}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TextInput
            style={styles.codInputField}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <TextInput
            style={styles.codInputField}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.codInputField}
            placeholder="Pincode"
            value={pincode}
            onChangeText={(text) => setPincode(text)}
          />
        </View>
      )}

      <TouchableOpacity style={styles.proceedButton} onPress={handlePayment}>
        <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginTop:50
  },
  total:{
color:'red',
fontSize:20,
alignItems: 'center',
marginLeft:90,
fontWeight:"bold"
  },
  selectPaymentText: {
    fontSize: 18,
    marginBottom: 10,
    color:"orange",
    marginLeft:50,
    fontWeight:"bold"
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  cardInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  cardInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  codInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  codInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  codInputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  proceedButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PaymentScreen;
