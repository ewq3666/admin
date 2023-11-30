import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINTS } from './domain';
import { Table, Button } from 'antd';

function WithdrawalRequestsTable() {
  const [requests, setRequests] = useState([]);
  const [balances, setBalances] = useState({});

  useEffect(() => {
    // Fetch withdrawal requests from API
    axios.get(END_POINTS.withdrawRequests)
      .then(response => setRequests(response.data))
      .catch(error => console.error('Error fetching withdrawal requests:', error));

    // Fetch balances from API
    axios.get(END_POINTS.balance)
      .then(response => setBalances(response.data))
      .catch(error => console.error('Error fetching balances:', error));
  }, []);

  const handleApprove = (requestId) => {
    // Find the request with the matching _id
    const selectedRequest = requests.find(request => request._id === requestId);

    if (selectedRequest) {
      // Send request to API to approve withdrawal
      axios.post(`${END_POINTS.withdraw}/${requestId}`, {
        amount: selectedRequest.amount,
        userId: selectedRequest.userId
      })
        .catch(error => console.error('Error approving withdrawal:', error));
    }
  };

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => `$${text}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Balance',
      dataIndex: 'userId',
      key: 'balance',
      render: (userId) => `$${balances?.length && balances?.find((item) => item.userId === userId).balance}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        record.status === 'pending' && (
          <Button type="primary" onClick={() => handleApprove(record._id)}>
            Approve
          </Button>
        )
      ),
    },
  ];

  return (
    <div className="withdrawal-table">
      <Table
        dataSource={requests}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default WithdrawalRequestsTable;
