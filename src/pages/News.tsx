import NewsItem from '../components/NewsItem';
import useNewsService from '../hooks/useNewsService';
import './News.css';

const News = () => {
  const data = useNewsService();
  console.log(data.loading);

  return (
    <div>
      {data.data.results?.map((item, index) => (
        <NewsItem key={index} NewsItemData={item} />
      ))}
      <p>Status: {data.data.status}</p>
    </div>
  );
};

export default News;
