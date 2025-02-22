import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (walletAddress) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (walletAddress) {
      setLoading(true);
      setError(null);
      axios
        .get(`http://localhost:4000/api/fetch-blockchain-data?address=${walletAddress}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      setData(null);
      setLoading(false);
    }
  }, [walletAddress]);

  return { data, loading, error };
};

export default useFetchData;
