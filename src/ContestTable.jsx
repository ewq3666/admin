import React from 'react';
import { Table, Button } from 'antd';

const ContestTable = ({ contests, deleteContest, handleWinningsClick,handleEditContestClick }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
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
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className='contestAction'>
          <Button type="link" onClick={() => handleWinningsClick(record.winnings, record._id)}>
            View Winnings
          </Button>
          <Button type="link" onClick={() => handleEditContestClick(record._id)}>
            Edit
          </Button>
          <Button type="link" onClick={() => deleteContest(record._id)}>
            Delete
          </Button>
        </div>
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
