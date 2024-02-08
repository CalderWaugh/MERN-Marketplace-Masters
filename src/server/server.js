import express from "express";
import mongodb from "mongodb";
const { MongoClient } = mongodb
// import fs from 'fs'
// import jsonData from './new_products.jsonproducts.json' with { type: "json" }

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
    const products = await filmsCol.find().toArray();
    console.log('Products: ' + JSON.stringify(products));
    //return all the products
    res.send(products)
})

// Get products using dummy data
// app.get('/api/products', async function (req, res) {
//     fs.readFile('products.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error("Error Reading JSON file: ", err)
//             res.status(500).send("Internal Server Error")
//             return
//         }

//         const jsonData = JSON.parse(data)
//         res.json(jsonData)
//     })
// })

// Express server listening
app.listen(3000)
process.on("SIGINT", () => {
    client.close();
    console.log('sigint');
    process.exit();
})
