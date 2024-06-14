import { useState, useEffect } from "react";
import { useAxios } from "@/hooks/useAxios";
import { AxiosRequestConfig } from "axios";

export default function useQuery<data_type = any>(
  url: string,
  opt?: { config?: AxiosRequestConfig; filter?: (data: any) => data_type }
) {
  const [data, setData] = useState<data_type | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { axios } = useAxios();
  const { config, filter } = opt || {};
  const [reloadKey, setReloadKey] = useState(0);
  const reload = () => setReloadKey((prev) => prev + 1);

  useEffect(() => {
    let ignore = false;
    const handleFetch = async () => {
      try {
        const res = await axios.get(url, config);
        if (ignore) return;
        setData(filter ? filter(res.data) : res.data);
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
  }, [url, reloadKey]);

  return { data, isLoading, error, reload };
}