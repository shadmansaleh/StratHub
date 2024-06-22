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
  // const cacheKey = "Query:" + url + JSON.stringify(config);
  // let cacheInvalidator: any = null;
  useEffect(() => {
    let ignore = false;
    const handleFetch = async () => {
      try {
        // if (!stateLess) setIsLoading(true);

        // /* Caching */
        // const cacheData = localStorage.getItem(cacheKey);
        // if (cacheData) {
        //   if (ignore) return;
        //   local_data = JSON.parse(cacheData);
        //   if (!stateLess) {
        //     setData(local_data);
        //     setIsLoading(false);
        //   }
        //   if (onCompleted) onCompleted(local_data as data_type);
        //   return;
        // }

        let res = await axios.get(url, config);
        if (ignore) return;
        local_data = filter ? filter(res.data) : res.data;

        // /* Caching */
        // localStorage.setItem(cacheKey, JSON.stringify(local_data));
        // cacheInvalidator = setTimeout(() => {
        //   localStorage.removeItem(cacheKey);
        // }, CACHE_TIME);

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
      // if (cacheInvalidator) clearTimeout(cacheInvalidator);
    };
  }, [url, reloadKey, ...follow, ...blockers]);

  return { data, setData, isLoading, error, reload };
}
