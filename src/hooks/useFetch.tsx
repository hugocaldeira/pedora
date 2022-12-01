import { useEffect, useState } from "react";

function useFetch(url: string) {
	const [data, setData] = useState({} as Response);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then((response) => setData(response))
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [url]);

	const refetch = () => {
		setLoading(true);
		fetch(url)
			.then((response) => setData(response))
			.catch((err: string) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return { data, loading, error, refetch };
}

export default useFetch;
