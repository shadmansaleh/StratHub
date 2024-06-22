import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { AxiosRequestConfig } from "axios";

export default function useQuery<data_type = any>(
  url: string,
  opt?: {
    config?: AxiosRequestConfig;
    filter?: (data: any) => data_type;
    follow?: Array<any>;
    blockers?: Array<any>;
    onCompleted?: (data: data_type) => void;
    stateLess?: boolean;
  }
) {
  const [data, setData] = useState<data_type | null>(null);
  let local_data: data_type | null = null;
  const stateLess = opt?.stateLess !== undefined ? opt.stateLess : false;
  const [isLoading, setIsLoading] = useState(stateLess ? false : true);
  const [error, setError] = useState<any>(null);
  const { axios } = useAxios();
  const { config, filter } = opt || {};
  const [reloadKey, setReloadKey] = useState(0);
  const reload = () => setReloadKey((prev) => prev + 1);
  const follow = opt?.follow || [];
  const blockers = opt?.blockers || [];
  const onCompleted = opt?.onCompleted;
  useEffect(() => {
    let ignore = false;
    const handleFetch = async () => {
      try {
        const res = await axios.get(url, config);
        if (ignore) return;
        local_data = filter ? filter(res.data) : res.data;
        if (!stateLess) {
          setData(local_data);
          setIsLoading(false);
        }
        if (onCompleted) onCompleted(local_data as data_type);
      } catch (err) {
        if (!ignore) {
          setError((err as Error).message);
          setIsLoading(false);
        }
      }
    };

    if (blockers.length === 0 || blockers.every((item) => !item)) handleFetch();
    else setIsLoading(false);
    return () => {
      ignore = true;
    };
  }, [url, reloadKey, ...follow, ...blockers]);

  return { data, setData, isLoading, error, reload };
}
