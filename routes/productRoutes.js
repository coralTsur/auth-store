const express = require('express');
const Product = require('../models/productModel');

const router = express.Router();

// יצירת מוצר חדש
router.post('/add', async (req, res) => {
  const { name, price } = req.body;
  console.log('Received data:', { name, price});
  try {
    const product = new Product({ name, price });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(400).json({ message: 'Error adding product', error: err });
  }
});

// קבלת כל המוצרים
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

// עדכון מוצר
router.put('/:id', async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { name, price, description }, { new: true });
    res.status(200).json({ message: 'Product updated', product });
  } catch (err) {
    res.status(400).json({ message: 'Error updating product', error: err });
  }
});

// מחיקת מוצר
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting product', error: err });
  }
});

module.exports = router;
