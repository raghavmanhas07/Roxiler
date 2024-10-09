const express = require('express');
const router = express.Router();
const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

const fetchData = async (endpoint, month) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`, { params: { month } });
        return response.data;

    } catch (error) {
        throw new Error(`Error fetching data from ${endpoint} : ${error.message}`);
    }
};

router.get('/combined', async (req, res) => {
    const { month } = req.query;
    if (!month) {
        return res.status(400).json({ message: "Month is required" });
    }

    try {
        const [statistics, barchart, piechart] = await Promise.all([
            fetchData('task03/statistics', month),
            fetchData('task04/barchart', month),
            fetchData('task05/piechart', month)
        ]);
        const combinedResponse = {
            statistics,
            barchart,
            piechart
        };
        return res.status(200).json(combinedResponse);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching data" + error.message });
    }
})

module.exports = router; 