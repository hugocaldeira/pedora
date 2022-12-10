import NewsItem from '../components/NewsItem';
import useNewsService from '../hooks/useNewsService';
import styles from './News.module.css';
import { Dropdown, MenuProps, Select, Space, Typography } from 'antd';
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

  const items = countries.map((country) => {
    return {
      label: country.name,
      value: country.code,
    };
  });

  console.log(error);

  const onChange = (value: string) => {
    setCountryCode(value);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <div className={styles.container}>
      <ul>
        {data.results?.map((item, index) => {
          return <NewsItem key={index} NewsData={item} />;
        })}
      </ul>
      <div className={styles.sideActions}>
        <Select
          showSearch
          placeholder='Select a person'
          defaultValue={
            countries.find(
              (country) =>
                country.code.toLowerCase() === countryCode.toLowerCase()
            )?.name
          }
          optionFilterProp='children'
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={items}
          style={{ width: 150 }}
        />
      </div>
    </div>
  );
};

export default News;
