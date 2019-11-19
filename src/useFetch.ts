import { useEffect, useState } from "react";

const useFetch = <T>(url: string, options?: RequestInit) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    setLoading(true);
    fetch(url, { ...options, signal })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setData(data);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
    return () => controller.abort();
  }, [url, options]);
  return { data, error, loading };
};

export default useFetch;
