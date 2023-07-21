require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : false }));

const PORT = process.env.PORT || 3000


//route 

app.get('/', (req, res) => {
    res.send ("Welcome to Express sever api!");
});

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        console.log (err.message);
        res.status(500).json({message: err.message});
    }
});

app.get('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        console.log (err.message);
        res.status(500).json({message: err.message});
    }
});



app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (err) {
        console.log (err.message);
        res.status(500).json({message: err.message});
    }
});


//update product
app.put('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Product with this ID ${id } was not found`});
        }
        const productUpdate = await Product.findById(id);
        res.status(200).json(productUpdate);
    } catch (err) {
        console.log (err.message);
        res.status(500).json({message: err.message});
    }
});

//delete product
app.delete('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Product with this ID ${id } was not found`});
        }
        res.status(200).json(`Product with this ID ${id} has been deleted`);
    } catch (err) {
        console.log (err.message);
        res.status(500).json({message: err.message});
    }
});

const url = process.env.ATLAS_URL 
mongoose.connect(url + "server-api")
.then(() => {
    console.log("server connected to mongodb")
    app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)})
})
.catch((err)=>{console.log(err)});