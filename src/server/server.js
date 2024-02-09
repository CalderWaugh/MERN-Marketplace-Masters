import express from "express";
import axios from "axios"; // Import axios for making HTTP requests
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import { PythonShell } from "python-shell";

const app = express();

// Database Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'UmbrellaStore';
let db;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to the MongoDB server
client.connect()
  .then(() => {
    console.log("Connected successfully to server");
    db = client.db(dbName);
  })
  .catch(err => {
    console.error("Cannot Connect", err)
  });

// Route to fetch all products
app.get('/api/products', async function (req, res) {
    const productsCol = db.collection('products');
    const products = await productsCol.find().toArray()
    res.send(products);
});

// Route to fetch a single product by id
app.get('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    const productsCol = db.collection('products');
    try {
        const product = await productsCol.findOne({ id: parseInt(productId) });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch best sellers
app.get('/api/products/bestsellers', async function (req, res) {
    const productsCol = db.collection('products');
    const products = await productsCol.find({ "Popularity": { $gt: 3 } }).limit(5).toArray();
    res.send(products);
});

// Express server listening
const port = 3000;
app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});

// Handle SIGINT signal to close the MongoDB connection
process.on("SIGINT", () => {
    client.close();
    console.log('MongoDB connection closed');
    process.exit();
});
