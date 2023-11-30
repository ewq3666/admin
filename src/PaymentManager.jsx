import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import { END_POINTS } from './domain';

const PaymentManager = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);

  useEffect(() => {
    fetch(END_POINTS.withdrawRequests)
      .then(response => response.json())
      .then(data => setWithdrawalRequests(data))
      .catch(error => console.error(error));
  }, []);

  const handleProcessWithdrawal = (id) => {
    setWithdrawalRequests(withdrawalRequests.filter(request => request.id !== id));
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Amount',
      dataIndex: 'withdrawalAmount',
      key: 'withdrawalAmount',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleProcessWithdrawal(record.id)}>
            Process Payment
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="payment-manager">
      <h2>Withdrawal Requests</h2>
      <Table
        dataSource={withdrawalRequests}
        columns={columns}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default PaymentManager;
