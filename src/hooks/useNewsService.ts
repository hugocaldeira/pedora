import { useEffect, useState } from 'react';
import { INews } from '../models/News';

const useNewsService = (country: string) => {
  const url = `https://newsdata.io/api/1/news?apikey=pub_14100e34d1670ad239fb7398ca918c71e942b&country=${country}`;
  const [data, setData] = useState({} as INews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('error found');
      }
    })();
  }, [url]);
  return { data, loading, error };
};

export default useNewsService;
