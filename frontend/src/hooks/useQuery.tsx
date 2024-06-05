import { useState, useEffect } from "react";
import { useAxios } from "@/hooks/useAxios";

export default function useQuery(url: string, options?: any) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { axios } = useAxios();

  useEffect(() => {
    let ignore = false;
    const handleFetch = async () => {
      try {
        const res = await axios.get(url, ...options);
        if (ignore) return;
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        if (!ignore) {
          setError((err as Error).message);
          setIsLoading(false);
        }
      }
    };

    handleFetch();
    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, isLoading, error };
}
