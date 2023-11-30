import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { END_POINTS } from './domain';

export const BalanceList = () => {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    fetch(END_POINTS.balance)
      .then(response => response.json())
      .then(data => setBalances(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];

  return (
    <div className="balance-list-container">
      <h1 className="balance-list-header">Balance List</h1>
      <Table
        dataSource={balances}
        columns={columns}
        rowKey={(record) => record.userId}
      />
    </div>
  );
};

export const WithdrawalList = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    fetch(END_POINTS.withdraw)
      .then(response => response.json())
      .then(data => setWithdrawals(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (
    <div className="withdrawal-list-container">
      <h1 className="withdrawal-list-header">Withdrawal Transactions</h1>
      <Table
        dataSource={withdrawals}
        columns={columns}
        rowKey={(record) => record.transactionId}
      />
    </div>
  );
};
