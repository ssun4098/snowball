import React, { useState } from 'react';
import {
    UploadOutlined,
    LinuxOutlined
  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Icon from '@ant-design/icons';
import child from '../assets/menu/data/child.json'
import AwsIcon from '../assets/menu/icon/aws_logo.svg?react'; 

const Sidebar = () => {
    const {  Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        {
            key: '1',
            icon: <LinuxOutlined style={{ fontSize: '30px' }} />,
            label: '리눅스'
        },
        {
            key: '2',
            icon: <Icon component={AwsIcon} style={{ fontSize: '30px' }} />,
            label: 'nav 2'
        },
        {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
        },
    ];
    menuItems.forEach((value) => {
        value['children'] = child[value.key];
    })

    return (
        <Layout style={{height: '100%'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuItems}
            />
        </Sider>
        </Layout>
    )
}

export default Sidebar;