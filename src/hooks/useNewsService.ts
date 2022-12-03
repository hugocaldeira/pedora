import { useEffect, useState } from "react";

export interface News {
	status: string;
	totalResults: number;
	results?: (ResultsEntity)[] | null;
	nextPage: number;
}
export interface ResultsEntity {
	title: string;
	link: string;
	keywords?: (string)[] | null;
	creator?: (string)[] | null;
	video_url?: null;
	description?: string | null;
	content?: string | null;
	pubDate: string;
	image_url?: string | null;
	source_id: string;
	country?: (string)[] | null;
	category?: (string)[] | null;
	language: string;
}

const useNewsService = () => {
	const url = 'https://newsdata.io/api/1/news?apikey=pub_14100e34d1670ad239fb7398ca918c71e942b&language=en';
	const [data, setData] = useState({} as News);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then(response => response.json())
			.then(response => setData(response))
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [])

	return { data, loading, error };
}

export default useNewsService;
