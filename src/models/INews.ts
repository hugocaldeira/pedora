export type INews = {
  status: string;
  totalResults: number;
  results?: INewsItem[] | null;
  nextPage: number;
};
export type INewsItem = {
  title: string;
  link: string;
  keywords?: string[] | null;
  creator?: string[] | null;
  video_url?: null;
  description?: string | null;
  content?: string | null;
  pubDate: string;
  image_url?: string | null;
  source_id: string;
  country?: string[] | null;
  category?: string[] | null;
  language: string;
};

export type INewsDataItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  author: string;
  published: string;
  created: string;
  category: string[];
  content: string;
  enclosures: string[];
};

export type INewsData = {
  title: string;
  description: string;
  link: string;
  image: string;
  category: string;
  items: INewsDataItem[];
};
