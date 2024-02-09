import express from "express";
import mongodb from "mongodb";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
const { MongoClient } = mongodb
import bodyParser from "body-parser";

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

const app = express();

const client = new MongoClient(url);

// Database Name
const dbName = 'UmbrellaStore';
let db;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the MongoDB server
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

app.post('/api/productname', async function (req, res) {
    const productsCol = db.collection('products');
    const products = await productsCol.findOne({"Name" : req.body.Name})
    res.send(products)
})


app.post('/api/product/search', async function (req, res) {
    const productsCol = db.collection('products');
    const {dur, size} = req.body;
    let query;
    console.log(req.body)
    if (dur === "standard") {
        query = {"Durability" : { $lt: 3}}
    } else if (dur === "good") {
        query = {"Durability" : 3}
    } else if (dur === "ultra") {
        query = {"Durability" : { $gt: 3}}
    }
    [6,48]
    if (size === "short") {
        query["Length"] = { $lt: 21}
    } else if (size === "medium") {
        query["Length"] = { $gte: 21, $lte: 35}
    } else if (size === "long") {
        query["Length"] = { $gt: 35}
    }

    const products = await productsCol.find(query).toArray()
    console.log(products)
    res.send(products)
})


// get all products
app.get('/api/products', async function (req, res) {
    const productsCol = db.collection('products');
    const products = await productsCol.find().toArray()
    //return all the products
    res.send(products)
})

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
