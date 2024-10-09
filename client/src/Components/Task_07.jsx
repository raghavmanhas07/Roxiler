/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task07 = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('March');
  const perPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, [page, search, selectedMonth]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/task02/transactions', {
        params: {
          page,
          perPage,
          search,
        },
      });

      setTransactions(response.data.transactions);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);  
  };

  const handleNextPage = () => {
    if (page * perPage < totalCount) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions Table</h1>

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

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={handleSearchChange}
          className="border rounded px-4 py-2 w-full"
        />
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Sold</th>
              <th className="py-2 px-4 border">Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="text-gray-700 text-sm border-b hover:bg-gray-100">
                <td className="py-2 px-4 border">{transaction.id}</td>
                <td className="py-2 px-4 border">{transaction.title}</td>
                <td className="py-2 px-4 border">{transaction.description}</td>
                <td className="py-2 px-4 border">${transaction.price}</td>
                <td className="py-2 px-4 border">{transaction.category}</td>
                <td className="py-2 px-4 border">{transaction.sold ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border">
                  <img src={transaction.image} alt={transaction.title} className="w-16 h-16 object-cover" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page * perPage >= totalCount}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Task07;
