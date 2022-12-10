import NewsItem from '../components/NewsItem';
import useNewsService from '../hooks/useNewsService';
import styles from './News.module.css';
import { Dropdown, MenuProps, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import countries from '../util/countries';

const News = () => {
  const [countryCode, setCountryCode] = useState('pt');
  const { data, loading, error } = useNewsService(countryCode);

  const { Text } = Typography;

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setCountryCode(key);
  };

  const items: MenuProps['items'] = countries.map((country) => {
    return {
      label: country.name,
      key: country.code,
    };
  });

  console.log(error);

  return (
    <div className={styles.container}>
      <ul>
        {data.results?.map((item, index) => {
          return <NewsItem key={index} NewsData={item} />;
        })}
      </ul>
      <div className={styles.sideActions}>
        <Dropdown menu={{ items, onClick }}>
          <span onClick={(e) => e.preventDefault()}>
            <Space>
              <Text>
                {
                  countries.find((country) => country.code === countryCode)
                    ?.name
                }
              </Text>
              <DownOutlined />
            </Space>
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default News;
