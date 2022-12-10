import { useState, useEffect } from 'react';
import { parse } from 'rss-to-json';
import { INewsData } from '../models/News';

const useJNService = () => {
  const url = 'https://www.france24.com/en/rss';
  const [data, setData] = useState({} as INewsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('fetching');
    (async () => {
      try {
        setLoading(true);
        const response = await parse(url);
        console.log('response', response);

        setData(response);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('error found');
      }
    })();
  }, []);
  return { data, loading, error };
};

export default useJNService;
