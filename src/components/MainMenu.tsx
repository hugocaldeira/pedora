import React, { useState } from 'react';
import {
  CloudOutlined,
  FileTextOutlined,
  TeamOutlined,
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
    label: <Link to='/secret-friend'>Secret friend</Link>,
    key: 'secret-friend',
    icon: <TeamOutlined />,
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
  const [current, setCurrent] = useState(window.location.pathname.replace('/',''));

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
