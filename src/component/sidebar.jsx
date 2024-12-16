import React, { useState } from 'react';
import {
    UploadOutlined,
    LinuxOutlined
  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Icon from '@ant-design/icons';
import child from '../assets/menu/data/child.json'
import AwsIcon from '../assets/menu/icon/aws_logo.svg?react';
import getMenuMap from '../util/getMenuMap';
import MyContent from './content';

const Sidebar = () => {
    const {  Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const styles = {
        largeText: { fontSize: '30px' },
    };
    const [markdown, setMarkdown] = useState('');
    const menuMap = getMenuMap(child);;
    const handleMenu = (menu) => {
        const { key } = menu;
        const menuItem = menuMap[key];
        if (menuItem) {
            fetch(menuItem.path) // Markdown 파일 로드
              .then((response) => {
                  if (!response.ok) {
                  throw new Error(`Failed to load ${menuItem.path}`);
                }
                return response.text();
              })
              .then((text) => {
                setMarkdown(text);
              })
              .catch((error) => {
                console.error("Error loading markdown file:", error);
              });
          }
    }

    const menuItems = [
        {
            key: '1',
            icon: <LinuxOutlined style={styles.largeText} />,
            label: '리눅스'
        },
        {
            key: '2',
            icon: <Icon component={AwsIcon} style={styles.largeText} />,
            label: 'AWS'
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
        <Layout style={{height: '100%', width: '100%'}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuItems}
            onClick={handleMenu}
            />
        </Sider>
        <Layout>
            <MyContent markdown={markdown} />
        </Layout>
        </Layout>
    )
}

export default Sidebar;