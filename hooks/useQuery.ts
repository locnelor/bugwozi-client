import { useCallback, useEffect, useState } from "react"
import HttpFetch from "../libs/http/HttpFetch"
type useQueryConfig<T extends HttpFetch> = {
    params?: Parameters<T["params"]>[0],
    data?: Parameters<T["setData"]>[0],
    parseData?: boolean
}
export const useQuery = <T extends HttpFetch>(
    http: T,
    {
        params = {},
        data,
        parseData = true
    }: useQueryConfig<T> = {}
) => {
    type resultList = Parameters<Parameters<T["commit"]>[0]>
    const [current, setCurrent] = useState<HttpFetch>(http);
    const [result, setResult] = useState<{
        data: resultList[1],
        err: resultList[0],
        loading: boolean;
    }>({
        data: null,
        err: null,
        loading: true
    })
    const query = useCallback((queryData = data, parse = parseData) => {
        return new Promise<resultList[1]>((resolve, rejects) => {
            if (!result.loading) setResult({ ...result, loading: true });
            const newHttp = http.params(params).setData(queryData, parse);
            setCurrent(newHttp);
            newHttp.commit((err, data) => {
                if (!!err) rejects(err);
                else resolve(data);
                setResult({
                    loading: false,
                    data,
                    err
                });
            });
        })
    }, [http, params, data, parseData]);
    const cancel = useCallback(() => {
        current.cancel();
    }, [current]);
    useEffect(() => {
        return () => cancel();
    }, [current])
    return [result, query, cancel] as [typeof result, typeof query, typeof cancel];
}
export const useGet = <T extends HttpFetch>(http: T, config: useQueryConfig<T> = {}) => {
    const [result, query] = useQuery(http, config);
    useEffect(() => {
        query();
    }, [config])
    return result;
}
export default useQuery
