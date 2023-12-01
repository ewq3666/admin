// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { Table, Select, Button, message } from 'antd';
import axios from 'axios';
import { END_POINTS } from './domain';

const ContestRanks = () => {
  const [contestData, setContestData] = useState([]);
  const [selectedContestId, setSelectedContestId] = useState(null);
  const [results, setResults] = useState([]);
  const [refetch, setrefetch] = useState(false)
  // Fetch contest data from the API
  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await axios.get(END_POINTS.contest);
        setContestData(response.data);
      } catch (error) {
        console.error('Error fetching contest data:', error);
      }
    };

    fetchContestData();
  }, [refetch]);

  // Fetch results for the selected contest
  useEffect(() => {
    const fetchResults = async () => {
      if (selectedContestId) {
        try {
          // const response = await axios.get(`${END_POINTS.result}${selectedContestId}`);
          const response = await axios.get(`${END_POINTS.result}${selectedContestId}`);
          setResults(response.data.result);
        } catch (error) {
          console.error('Error fetching results:', error);
        }
      }
    };

    fetchResults();
  }, [selectedContestId,refetch]);

  // Define columns for the Ant Design Table
  const columns = [
    { title: 'User ID', dataIndex: 'userId', key: 'userId', fixed: 'left', },
    { title: 'Marks', dataIndex: 'marks', key: 'marks' },
    { title: 'Time Taken', dataIndex: 'time', key: 'time' },
    { title: 'Ranks', dataIndex: 'rank', key: 'rank', sorter: (a, b) => a.rank - b.rank },
    // Add more columns as needed
  ];

  // Function to reevaluate ranks
  const handleReevaluateRanks = async () => {
    try {
      await axios.put(`${END_POINTS.resultEvaluate}${selectedContestId}`);
      message.success('Ranks reevaluated successfully');
      // Refetch other APIs immediately after ranks are updated
      // Add your additional API fetch calls here
      setrefetch(!refetch)
    } catch (error) {
      console.error('Error reevaluating ranks:', error);
      message.error('Failed to reevaluate ranks');
    }
  };

  return (
    <div>
      <h1>Contest Ranks</h1>
      <Select
        style={{ width: 200, marginBottom: 16 }}
        placeholder="Select Contest"
        onChange={value => setSelectedContestId(value)}
      >
        {contestData?.result?.length && contestData?.result?.map(contest => (
          <Select.Option key={contest._id} value={contest._id}>
            {contest.name}
          </Select.Option>
        ))}
      </Select>
      <Button type="primary" onClick={handleReevaluateRanks} style={{ marginBottom: 16 }}>
        Reevaluate Ranks
      </Button>
      <Table dataSource={results} columns={columns} rowKey="userId" />
    </div>
  );
};

export default ContestRanks;
