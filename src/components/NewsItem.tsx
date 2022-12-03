import { INewsItem } from "../models/News";

const NewsItem = ({ NewsItemData }: { NewsItemData: INewsItem }) => {
  return (
    <a href={NewsItemData.link} target='_blank' rel='noreferrer'>
      <p>
        {NewsItemData.title} at {NewsItemData.pubDate}
      </p>
      {NewsItemData.image_url && (
        <img
          className='news__image'
          src={NewsItemData.image_url}
          alt='news whatever'
        />
      )}
    </a>
  );
};

export default NewsItem;
