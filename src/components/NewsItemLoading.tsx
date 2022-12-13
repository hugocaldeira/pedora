import { Card, Skeleton, Space } from 'antd';
import styles from './NewsItem.module.css';

const NewsItemLoading = () => {
  return (
    <li>
      <Card>
        <div className={styles.newsItem}>
          <div className={styles.textContainer}>
            <Skeleton paragraph={{ rows: 2 }} active={true} />
          </div>
          <div className={styles.imageContainer}>
            <Skeleton.Image active={true} />
          </div>
        </div>
      </Card>
    </li>
  );
};

export default NewsItemLoading;
