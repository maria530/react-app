import { useState, useCallback } from 'react';

export default function(asyncFun) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setLoading(true);
    setData(null);
    setError(null);

    return asyncFun().then((response) => {
      setData(response);
      setLoading(false);
    }).catch((error) => {
      setError(error);
      setLoading(true);
    })
  }, [asyncFun])

  return {
    execute,
    data,
    loading,
    error
  }
}