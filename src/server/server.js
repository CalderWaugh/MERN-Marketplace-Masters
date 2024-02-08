import express from "express";
import mongodb from "mongodb";
const { MongoClient } = mongodb

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const app = express();
// Database Name
const dbName = 'UmbrellaStore';
let db

// Connect database to server
try {
    await client.connect(url)
    console.log("Connected successfully to server");
    db = client.db(dbName);
} catch (err) {
    console.error("Cannot Connect", err)
}

app.get('/api/products', async function (req, res) {
    const productsCol = db.collection('products');
    const products = await productsCol.find().toArray();
    console.log('Products: ' + JSON.stringify(products));
    //return all the products
    res.send(products)
})

// Express server listening
app.listen(3000)
process.on("SIGINT", () => {
    client.close();
    console.log('sigint');
    process.exit();
})
