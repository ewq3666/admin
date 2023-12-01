import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINTS } from './domain';
import WinningsPopover, { UsersTable } from './WinningsPopover';
import { Modal, notification } from "antd";
import ContestTable from './ContestTable';

const ContestManager = () => {
  const [contests, setContests] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setloading] = useState(true);
  const [winnings, setwinnings] = useState({ from: 0, to: 0, amount: 0 });
  const [totalWinning, settotalWinning] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverData, setPopoverData] = useState([]);
  const [contestId, setcontestId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editContestId, setEditContestId] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Fetch contests from the API
    axios.get(END_POINTS.contest)
      .then(response => setContests(response.data.result))
      .catch(error => console.error(error));
  }, []);

  const winningAdd = (e) => {
    const { name, value } = e.target;
    setwinnings((prev) => ({ ...prev, [name]: value }));
  };

  const addContest = async (e) => {
    e.preventDefault();

    // Send a POST request to add a new contest
    await axios.post(END_POINTS.contest, { name, price, date, time, winnings: totalWinning })
      .then(response => {
        setContests([...contests, response.data]);
        setName('');
        setPrice('');
        setDate('');
        setTime('');
        settotalWinning([]);
      })
      .catch(error => notification.error({ message: 'something went wrong' }));
  };

  const editContest = async (id) => {
    // Fetch contest details for editing
    const response = await axios.get(`${END_POINTS.contest}/${id}`);
    const contestToEdit = response.data.result;

    // Set the form fields with the contest details
    setName(contestToEdit.name);
    setPrice(contestToEdit.price);
    setDate(contestToEdit.date);
    setTime(contestToEdit.time);
    settotalWinning(contestToEdit.winnings || []);
    setEditContestId(id);
  };

  const updateContest = async (e) => {
    e.preventDefault();

    // Send a PUT request to update the contest
    await axios.put(`${END_POINTS.updateContest}/${editContestId}`, { name, price, date, time, winnings: totalWinning })
      .then(response => {
        const updatedContests = contests.map(contest =>
          contest._id === editContestId ? response.data.contest : contest
        );
        setContests(updatedContests);
        setName('');
        setPrice('');
        setDate('');
        setTime('');
        settotalWinning([]);
        setEditContestId(null);
      })
      .catch(error => notification.error({ message: 'something went wrong' }));
  };

  const handleWinningsClick = (winnings, id) => {
    setPopoverData(winnings); // Set popover data
    setShowPopover(true); // Show popover
    setcontestId(id);
    showModal();
    editContest(id); // Fetch contest details when clicking on winnings for editing
  };

  const handleClosePopover = () => {
    setShowPopover(false); // Hide popover
  };

  const addWinning = () => {
    settotalWinning([...totalWinning, winnings]);
  };

  const deleteContest = (id) => {
    // Send a DELETE request to remove a contest
    axios.delete(`${END_POINTS.contest}/${id}`)
      .then(response => {
        const updatedContests = contests.filter(contest => contest._id !== id);
        setContests(updatedContests);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="contest-manager">
      <h2 style={{ margin: 'auto', padding: '1rem' }}>Contest page</h2>
      <ContestTable handleEditContestClick={editContest} contests={contests} deleteContest={deleteContest} handleWinningsClick={handleWinningsClick} />

      <form onSubmit={editContestId ? updateContest : addContest}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div>
          <br />
          <label>Winnings:</label>
          <br />
          <div style={{ display: 'flex' }}>
            <label>from:</label>
            <input type="number" placeholder='from' value={winnings.from} name='from' onChange={(e) => winningAdd(e)} />
            <br />
            <label>to:</label>
            <br />
            <input type="number" placeholder='to' value={winnings.to} name='to' onChange={(e) => winningAdd(e)} />
            <br />
            <br />
            <label>amount:</label>
            <input type="number" placeholder='amount' value={winnings.amount} name='amount' onChange={(e) => winningAdd(e)} />
            <button type='button' onClick={addWinning}>Add Winning</button>
          </div>
          <WinningsPopover
            winningsData={totalWinning}
            settotalWinning={settotalWinning}
            totalWinning={totalWinning}
          />
        </div>
        <button type="submit">{editContestId ? 'Update Contest' : 'Add Contest'}</button>
      </form>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <WinningsPopover
          winningsData={contests.find((item) => item._id == contestId)?.winnings}
          onClose={handleClosePopover}
          showBtn={false}
        />
        <br />
        <UsersTable
          winningsData={contests.find((item) => item._id == contestId)?.users}
          onClose={handleClosePopover}
          showBtn={false}
        />
      </Modal>
    </div>
  );
};

export default ContestManager;
