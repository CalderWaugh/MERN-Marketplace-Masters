import express from "express";
import mongodb from "mongodb";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
const { MongoClient } = mongodb

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const app = express();
// Database Name
const dbName = 'UmbrellaStore';
let db

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect database to server
try {
    await client.connect(url)
    console.log("Connected successfully to server");
    db = client.db(dbName);
} catch (err) {
    console.error("Cannot Connect", err)
}

app.post('/api/product', async function (req, res) {
    const productsCol = db.collection('products');
    const products = await productsCol.findOne({"_id" : new mongoose.Types.ObjectId(req.body.id)})
    res.send(products)
})

// get all products
app.get('/api/products', async function (req, res) {
    const productsCol = db.collection('products');
    const products = await productsCol.find().toArray()
    //return all the products
    res.send(products)
})
// get best sellers
app.get('/api/products/bestsellers', async function (req, res) {
    const productsCol = db.collection('products');
    // Filter documents where "Popularity" is greater than 3
    const products = await productsCol.find({ "Popularity": { $gt: 3 } }).limit(5).toArray()
    res.send(products)
})

// Express server listening
app.listen(3000)
process.on("SIGINT", () => {
    client.close();
    console.log('sigint');
    process.exit();
})
