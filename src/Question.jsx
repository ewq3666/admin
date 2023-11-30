import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINTS } from './domain';
import { Select, Input, Button, List } from 'antd';
// import 'antd/dist/antd.css';

const { Option } = Select;

function AddQuestion() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState('');
  const [contestQuestions, setContestQuestions] = useState([]);

  useEffect(() => {
    // Fetch contests from the server
    async function fetchContests() {
      try {
        const response = await axios.get(END_POINTS.contest);
        setContests(response.data); // Assuming the API returns an array of contests
      } catch (error) {
        console.error(error);
      }
    }

    fetchContests();
  }, []);

  const fetchQuestionsForContest = async (contestId) => {
    try {
      const response = await axios.get(`${END_POINTS.getQuestions}${contestId}`);
      setContestQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (value) => {
    setCorrectOptionIndex(value);
  };

  const handleAddQuestion = async () => {
    try {
      const response = await axios.post(`${END_POINTS.addQuize}${selectedContest}`, {
        quizzes: [{
          question,
          options,
          correctOptionIndex,
        }]
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleContestClick = (contestId) => {
    setSelectedContest(contestId);
    fetchQuestionsForContest(contestId);
  };

  return (
    <div className="questions">
      <br />
      <br />
      <div className="container">
        <h2>Add Question</h2>
        <div>
          <label htmlFor="selectContest" className="label">Select Contest:</label>
          <Select
            id="selectContest"
            value={selectedContest}
            onChange={handleContestClick}
            className="select"
            placeholder="Select a contest"
          >
            {contests?.result?.length && contests.result?.map((contest) => (
              <Option key={contest._id} value={contest._id}>
                {contest.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="questionInput" className="label">Question:</label>
          <Input
            id="questionInput"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label">Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <Input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e)}
                className="input"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="label">Correct Option:</label>
          <Select
            value={correctOptionIndex}
            onChange={handleCorrectOptionChange}
            className="select"
          >
            {options.map((option, index) => (
              <Option key={index} value={index}>
                Option {index + 1}
              </Option>
            ))}
          </Select>
        </div>
        <Button onClick={handleAddQuestion} type="primary" className="button">
          Add Question
        </Button>

        {/* Display list of contests */}
        <div>
          <h3 className="listHeader">List of Contests</h3>
          <List
            className="list"
            dataSource={contests?.result}
            renderItem={(contest) => (
              <List.Item
                key={contest._id}
                onClick={() => handleContestClick(contest._id)}
                className="listItem"
              >
                {contest.name}
              </List.Item>
            )}
          />
        </div>

        {/* Display questions for the selected contest */}
        {contestQuestions?.length > 0 && (
          <div>
            <h3 className="listHeader">Questions for Selected Contest</h3>
            <List
              className="list"
              dataSource={contestQuestions[0]?.quizzes}
              renderItem={(question, index) => (
                <List.Item key={index} className="listItem">
                  Question: {question.question} <br />
                  Options:
                  <List
                    dataSource={question.options}
                    renderItem={(item, i) => (
                      <List.Item key={i}>{item}</List.Item>
                    )}
                  />
                  Correct Option Index: {question.correctOptionIndex}
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddQuestion;
