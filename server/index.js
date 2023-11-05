// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');

const app = express();
const port =  5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection URL
const dbURI = 'mongodb+srv://gokulkannan:gokul8502@fashion.qe9klpw.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

//////////////////////////register page
  const Userschema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
 mobile:Number,
 age:Number
    
  });
  const User = mongoose.model('User', Userschema);
  

  app.post('/register', async (req, res) => {
    const { username, email, password,mobile,age } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
       mobile,
       age
      });
  
      await newUser.save();
      
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  app.post('/check-email', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if an account with the provided email exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        // Email is already registered
        res.json({ isRegistered: true });
      } else {
        // Email is not registered
        res.json({ isRegistered: false });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  ////////////////////////////login page

// Login endpoint

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts per IP address in 15 minutes
  message: 'Too many login attempts from this IP. Please try again later.',
});

app.use('/login', limiter);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


/////////////////////////////////////add to cart page

const cartItemSchema = new mongoose.Schema({
  // Define the schema fields for cart items
  title: String,
  price: Number,
  name: String,
  model: String,
  size: String,
  url: String,
});

const CartItem = mongoose.model('CartItem', cartItemSchema);


// Create an endpoint to save data to MongoDB
app.post('/additem', async (req, res) => {
  try {
    const newItem = new CartItem(req.body);
    await newItem.save();
    console.log('Item saved successfully:', newItem);
    res.status(200).json({ message: 'Item saved successfully' });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ message: 'Error saving item' });
  }
});


app.get('/cartitem', async (req, res) => {
  try {
    // Retrieve cart items from MongoDB using the CartItem model
    const cartItems = await CartItem.find();

    if (cartItems && cartItems.length > 0) {
      res.status(200).json(cartItems);
    } else {
      res.status(404).json({ message: 'No cart items found' });
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items' });
  }
});


app.delete('/cartitem/:id', async (req, res) => {
  const itemId = req.params.id; // Use req.params.id to get the item ID from the URL

  try {
    // Find the item by its ID and remove it using the CartItem model
    const removedItem = await CartItem.findByIdAndRemove(itemId);

    if (!removedItem) {
      return res.status(404).json({ message: 'Item not found in the cart.' });
    }

    return res.status(200).json({ message: 'Item removed from the cart.' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const orderItemSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      price: Number,
      name: String,
      model: String,
      size: String,
      url: String,
    },
  ],
  total: Number,
  date: { type: Date, default: Date.now },
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

// Endpoint to handle order requests
app.post('/order', async (req, res) => {
  const orderData = req.body; // This should contain an array of items and the total value

  if (!orderData || !Array.isArray(orderData.items) || typeof orderData.total !== 'number') {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  try {
    // Save the order to the database using async/await
    const newOrder = new OrderItem({
      items: orderData.items,
      total: orderData.total,
      date: new Date(),
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order received successfully' });
  } catch (error) {
    console.error('Error while saving the order:', error);
    res.status(500).json({ message: 'Error while saving the order' });
  }
});

app.get('/orderitems', async (req, res) => {
  try {
    // Retrieve order items from MongoDB using the OrderItem model
    const orderItems = await OrderItem.find()
    .sort({ date: -1 });
    if (orderItems && orderItems.length > 0) {
      // Iterate through order items and extract the items array
      const itemsArray = orderItems.map((orderItem) => orderItem.items);

      // itemsArray is now an array of arrays of order items
      // You can flatten this array if needed
      const flattenedItems = [].concat(...itemsArray);

      res.status(200).json(flattenedItems);
    } else {
      res.status(404).json({ message: 'No order items found' });
    }
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ message: 'Error fetching order items' });
  }
});


  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
