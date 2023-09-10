import { useState } from 'react';

function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
}

export default useFetch;
