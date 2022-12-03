import { useEffect, useState } from 'react';
import { INews } from '../models/News';

const useNewsService = () => {
  const url =
    'https://newsdata.io/api/1/news?apikey=pub_14100e34d1670ad239fb7398ca918c71e942b&language=pt&country=pt';
  const [data, setData] = useState({} as INews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        console.log('fetching');
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.log(typeof err);
        console.log(err);

        setLoading(false);
        setError('error found');
      }
    })();
  }, []);
  return { data, loading, error };
};

export default useNewsService;
