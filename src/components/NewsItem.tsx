import { INewsItem } from '../models/News';
import styles from './NewsItem.module.css';
import image from '../assets/no-picture.jpg';
import { Card } from 'antd';

const NewsItem = ({ NewsData }: { NewsData: INewsItem }) => {
  const date = new Date(NewsData.pubDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const dateFormatted = date.toLocaleString('pt', options);

  const NewsItemDataFormatted = {
    ...NewsData,
    created: dateFormatted,
  };

  return (
    <li>
      <Card>
        <div className={styles.newsItem}>
          <div className={styles.textContainer}>
            <a
              className={styles.title}
              href={NewsItemDataFormatted.link}
              target='_blank'
              rel='noreferrer'
            >
              {NewsItemDataFormatted.title}
            </a>
            <p>{NewsItemDataFormatted.pubDate}</p>
            <p>
              {NewsItemDataFormatted.creator} / {NewsItemDataFormatted.country}
            </p>
          </div>
          <div className={styles.imageContainer}>
            {NewsItemDataFormatted.image_url ? (
              <img src={NewsItemDataFormatted.image_url} alt='no' />
            ) : (
              <span>No image</span>
            )}
          </div>
        </div>
      </Card>
    </li>
  );
};

export default NewsItem;
