const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Transaction = require('./task_01'); 

// Helper to extract month from ISO date string
const getMonthFromISODate = (isoDate) => {
    const date = new Date(isoDate);
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getUTCMonth()];
};

router.get('/transactions', async (req, res) => {
    const { page = 1, perPage = 10, search = '', month = '' } = req.query;

    // Create a regex for search query
    const searchRegex = new RegExp(search, 'i');  // Case-insensitive search for title and description
    const monthRegex = month ? new RegExp(month, 'i') : null;  // Month filter (optional)

    try {
        // Build the search query based on filters
        const query = {
            $and: [
                {
                    $or: [
                        { title: searchRegex },
                        { description: searchRegex },
                        { price: { $regex: searchRegex } }
                    ]
                }
            ]
        };

        // If a month is selected, filter based on the `dateOfSale`
        if (monthRegex) {
            query.$and.push({
                $expr: { $eq: [{ $month: '$dateOfSale' }, new Date().getMonth(monthRegex)] }
            });
        }

        // Fetch transactions with pagination
        const transactions = await Transaction.find(search || month ? query : {})
            .limit(Number(perPage))
            .skip((Number(page) - 1) * Number(perPage));

        // Get the total count of documents that match the query
        const totalCount = await Transaction.countDocuments(search || month ? query : {});

        // Send response with transaction data
        res.status(200).json({
            totalCount,
            page: Number(page),
            perPage: Number(perPage),
            transactions
        });
    } catch (error) {
        console.error('Error fetching transactions:', error); 
        res.status(500).json({ message: 'Error fetching transactions: ' + error.message });
    }
});

module.exports = router;
