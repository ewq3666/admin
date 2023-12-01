// Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, Drawer, Button } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import useWindowWidth from './useWinodowSize';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [Drawer, setDrawer] = useState(false)
    const width = useWindowWidth()

    useEffect(() => {
        if (width < 1024) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
            setDrawer(true)
        }
    }, [width])

    const toggle = () => {
        setCollapsed(!collapsed);
    };


    const menuItems = [
        { key: '8', icon: <UploadOutlined />, text: 'Home', to: '/home' },
        { key: '1', icon: <UserOutlined />, text: 'Contest', to: '/contest' },
        { key: '2', icon: <VideoCameraOutlined />, text: 'Payments', to: '/payments' },
        { key: '3', icon: <UploadOutlined />, text: 'Balance', to: '/balance' },
        { key: '4', icon: <UploadOutlined />, text: 'Add Money Transactions', to: '/addtransactions' },
        { key: '5', icon: <UploadOutlined />, text: 'Withdraw Transactions', to: '/withdrawtransactions' },
        { key: '6', icon: <UploadOutlined />, text: 'Withdrawal Requests', to: '/withdrawalrequeststable' },
        { key: '7', icon: <UploadOutlined />, text: 'Add Questions', to: '/addquestions' },
        { key: '9', icon: <UploadOutlined />, text: 'Ranks Result', to: '/result' },
    ];

    const menuItemsJSX = menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.to}>{item.text}</Link>
        </Menu.Item>
    ));

    const showDrawer = () => {
        setDrawer(!Drawer)
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {
                Drawer &&
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        {menuItemsJSX}
                    </Menu>
                </Sider>
            }


            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {
                        isMobile &&
                        <Button type="primary" className='drawerham' icon={<MenuOutlined />} onClick={showDrawer} style={{ marginRight: 16 }} />
                    }
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background content"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
