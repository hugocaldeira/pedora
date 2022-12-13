import { Card, Empty } from 'antd';
import styles from './NewsItem.module.css';

const NewsItemNoData = () => {
  return (
    <li>
      <Card>
        <div className={styles.newsItem}>
          <div className={styles.textContainer}>
            <Empty description={''} image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        </div>
      </Card>
    </li>
  );
};

export default NewsItemNoData;
