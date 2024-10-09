const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/transactionDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected'))
    .catch(err => console.log('Database connection error: ', err));

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sold: {
        type: Boolean,
        required: true
    },
    dateOfSale: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', productSchema);
router.get('/initializeDB', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;
        await Transaction.insertMany(data);
        res.status(200).send('Database initialized with seed data');
    } catch (err) {
        res.status(500).send('Error fetching data: ' + err.message);
    }
});
module.exports = Transaction;
