import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { END_POINTS } from './domain';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(END_POINTS.addmoney)
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'User Email',
      dataIndex: 'user_email',
      key: 'user_email',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (
    <div className="transaction-list-container">
      <h1 className="transaction-list-header">Add Money Transactions</h1>
      <Table
        dataSource={transactions}
        columns={columns}
        rowKey={(record) => record.orderId}
      />
    </div>
  );
};

export default TransactionList;
