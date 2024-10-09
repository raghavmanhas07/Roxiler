/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Task08 = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);

  useEffect(() => {
    fetchStatistics(); // Fetch statistics when the selected month changes
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:3000/task03/statistics', {
        params: { month: selectedMonth }, // Pass the selected month as a parameter
      });

      console.log('API Response:', response.data); // Log the response to inspect it

      // Extract values from the API response
      const { totalSaleAmount, totalSoldItems, totalNotsoldItems } = response.data;

      // Update state with values from the API response
      setTotalAmount(totalSaleAmount);
      setTotalSoldItems(totalSoldItems);
      setTotalNotSoldItems(totalNotsoldItems);

      console.log('Statistics Updated:', {
        totalAmount,
        totalSoldItems,
        totalNotSoldItems,
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Statistics</h1>

      {/* Month Selector */}
      <div className="mb-4">
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      {/* Statistics Box */}
      <div className="border p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Statistics for {selectedMonth}</h2>
        <p><strong>Total Amount of Sales:</strong> ${totalAmount.toFixed(2)}</p>
        <p><strong>Total Sold Items:</strong> {totalSoldItems}</p>
        <p><strong>Total Not Sold Items:</strong> {totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default Task08;
