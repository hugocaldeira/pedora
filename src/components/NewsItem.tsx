import { INewsItem } from '../models/INews';
import styles from './NewsItem.module.css';
import { Card, Image } from 'antd';

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
            <Image width={180} style={{ height: "auto"}}
              src={NewsItemDataFormatted.image_url ?? ''}
              />
          </div>
        </div>
      </Card>
    </li>
  );
};

export default NewsItem;
