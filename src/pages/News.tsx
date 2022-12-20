import NewsItem from '../components/NewsItem';
import useNewsService from '../hooks/useNewsService';
import styles from './News.module.css';
import { Select, Typography } from 'antd';
import { useState } from 'react';
import countries from '../util/countries';
import NewsItemLoading from '../components/NewsItemLoading';
import NewsItemNoData from '../components/NewsItemNoData';

const News = () => {
  const [countryCode, setCountryCode] = useState('pt');
  const { data, loading, error } = useNewsService(countryCode);

  const { Text } = Typography;

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

  return (
    <div className={styles.container}>
      <ul>
        {loading ? (
          <NewsItemLoading />
        ) : error ? (
          <NewsItemNoData />
        ) : (
          data.results?.map((item, index) => {
            return <NewsItem key={index} NewsData={item} />;
          })
        )}
      </ul>

      <div className={styles.sideActions}>
        <Select
          showSearch
          placeholder='Country'
          defaultValue={
            countries.find(
              (country) =>
                country.code.toLowerCase() === countryCode.toLowerCase()
            )?.name
          }
          onChange={onChange}
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
