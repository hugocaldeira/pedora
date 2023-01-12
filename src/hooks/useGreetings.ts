import { useEffect, useState } from "react";

const useGreetings = (
  participants: { name: string; exceptions: string[] }[]
) => {
  const url = `https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-5c261e50-0b13-4143-a145-2e1b65da730d/default/secret-friend`;
  const [data, setData] = useState<{ [key: string]: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(participants),
        });
        console.log(response);

        const result = await response.json();

        setData(result);
        setLoading(false);
      } catch (err) {
        console.log(err);

        setLoading(false);
        setData({});
        setError("error found");
      }
    })();
  }, [participants, url]);
  return { data, loading, error };
};

export default useGreetings;
