import React, { useState } from 'react';
import {
  CloudOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: <Link to='/news'>News</Link>,
    key: 'news',
    icon: <FileTextOutlined />,
  },
  {
    label: <Link to='/weather'>Weather</Link>,
    key: 'weather',
    icon: <CloudOutlined />,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

const MainMenu = () => {
  const [current, setCurrent] = useState('news');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode='vertical'
      items={items}
    />
  );
};

export default MainMenu;
