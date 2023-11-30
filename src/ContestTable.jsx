import React from 'react';
import { Table, Button } from 'antd';

const ContestTable = ({ contests, deleteContest, handleWinningsClick }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => deleteContest(record._id)}>Delete</Button>
      ),
    },
    {
      title: 'Details',
      key: 'details',
      render: (text, record) => (
        <Button onClick={() => handleWinningsClick(record.winnings, record._id)}>Details</Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={contests}
      columns={columns}
      rowKey="_id"
    />
  );
};

export default ContestTable;
