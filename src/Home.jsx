// Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { HomeOutlined,UserOutlined,VideoCameraOutlined,UploadOutlined } from '@ant-design/icons';

const Home = () => {
    const tileData = [
        { key: '1', title: 'Contest', icon: <UserOutlined />, to: '/contest' },
        { key: '2', title: 'Payments', icon: <VideoCameraOutlined />, to: '/payments' },
        { key: '3', title: 'Balance', icon: <UploadOutlined />, to: '/balance' },
        { key: '4', title: 'Add Money Transactions', icon: <UploadOutlined />, to: '/addtransactions' },
        { key: '5', title: 'Withdraw Transactions', icon: <UploadOutlined />, to: '/withdrawtransactions' },
        { key: '6', title: 'Withdrawal Requests', icon: <UploadOutlined />, to: '/withdrawalrequeststable' },
        { key: '7', title: 'Add Questions', icon: <UploadOutlined />, to: '/addquestions' },
        { key: '8', title: 'Home', icon: <UploadOutlined />, to: '/home' },
        { key: '9', title: 'Ranks / Result', icon: <UploadOutlined />, to: '/result' },
      ];
      

  const tilesJSX = tileData.map((tile) => (
    <Col key={tile.key} xs={24} sm={12} md={8} lg={6}>
      <Link to={tile.to}>
        <Card title={tile.title} className="home-tile">
          {tile.icon}
        </Card>
      </Link>
    </Col>
  ));

  return (
    <div className="home-container">
      <Row gutter={[16, 16]}>
        {tilesJSX}
      </Row>
    </div>
  );
};

export default Home;
