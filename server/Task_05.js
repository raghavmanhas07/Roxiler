const express = require('express');
const router = express.Router();
const Transaction = require('./task_01');

router.get('/piechart', async (req, res) =>{
    const { month } = req.query;
    if (!month) {
        res.status(400).json({ message: "Month is required" });
    }
    try {
        const monthIndex = new Date(`${month} 01, 2000`).getMonth() + 1;
        const transactions = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, monthIndex]
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    itemCount: { $sum: 1 }
                }
            }
        ]);

        const result = transactions.map(transaction => ({
            category: transaction._id,
            items: transaction.itemCount
        }));
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pie chart data" + error.message });
    }
});

module.exports = router; 