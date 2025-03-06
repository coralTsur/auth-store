// server.js
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');  // הנתיבים של המוצרים
const userRoutes = require('./routes/userRoutes'); // הנתיבים של המשתמשים (הרשאות)
const Product = require('./models/productModel'); // Ensure this is the correct path to your Product model

// הגדרת השרת
const app = express();

// Middleware
app.use(express.json());
// Middleware לטיפול בשגיאות
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  

// חיבור למסד הנתונים
// Connect to the database
mongoose.connect('mongodb://localhost/store', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Insert a product after connecting to the database
    const newProduct = new Product({
      name: "Product 8",  // this field is required
      price: 10.949,       // this field is required
      description: "A great product",
      category: "Electronics"
    });

    return newProduct.save(); // Save the new product
  })
  .then(() => console.log("Product saved"))
  .catch(err => console.error("Error saving product:", err))
  //.finally(() => mongoose.disconnect()); // Close the connection once done

// הוספת הנתיבים
app.use('/products', productRoutes); // נתיבים של מוצרים
app.use('/users', userRoutes); // נתיבים של משתמשים (הרשאות)

// שמיעת הבקשות
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


