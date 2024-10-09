/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const Task_09 = ({ selectedMonth, setSelectedMonth }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchChartData();
    }, [selectedMonth]);

    const fetchChartData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/task04/barchart', {
                params: {
                    month: selectedMonth,
                },
            });

            console.log('API Response:', response.data); // Log the entire API response

            // Convert the response object into an array for the chart
            const charData = Object.keys(response.data).map((range) => ({
                name: range,
                count: response.data[range],
            }));

            console.log('Chart Data:', charData); // Check what data is being passed
            setChartData(charData);
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl mb-4 font-semibold">Price Range Distribution</h2>

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

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

Task_09.propTypes = {
    selectedMonth: PropTypes.string.isRequired, // Ensure it's a string and is required
    setSelectedMonth: PropTypes.func.isRequired, // Ensure it's a function and is required
};

export default Task_09;
