import express from "express";
// import mongodb from "mongodb";
import fs from 'fs'
import jsonData from './products.json' with { type: "json" }
// const { MongoClient } = mongodb

// Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

const app = express();
// Database Name
// const dbName = 'products';
const dbName = jsonData;
let db

// Connect database to server
// try {
//     await client.connect(url)
//     console.log("Connected successfully to server");
//     db = client.db(dbName);
// } catch (err) {
//     console.error("Cannot Connect", err)
// }

// app.get('/api/products', async function (req, res) {
//     const filmsCol = db.collection('products');
//     const films = await filmsCol.find().toArray();
//     console.log('Products: ' + JSON.stringify(films));
//     //return all the products
//     res.send(products)
// })

// Get products using dummy data
app.get('/api/products', async function (req, res) {
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error Reading JSON file: ", err)
            res.status(500).send("Internal Server Error")
            return
        }

        const jsonData = JSON.parse(data)
        res.json(jsonData)
    })
})

// Express server listening
const PORT = 3000
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000')
})

// Handling SIGINT signal
process.on("SIGINT", () => {
    console.log('SIGINT signal received');
    process.exit();
});
