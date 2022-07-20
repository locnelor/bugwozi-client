import { useCallback, useEffect, useState } from "react"
import HttpFetch from "./HttpFetch"
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
    const [result, setResult] = useState<{
        data: resultList[1],
        err: resultList[0],
        loading: boolean;
    }>({
        data: null,
        err: null,
        loading: true
    })
    const query = useCallback(() => {
        if (!result.loading) setResult({ ...result, loading: true });
        http
            .params(params)
            .setData(data, parseData)
            .commit((err, data) => {
                setResult({
                    loading: false,
                    data,
                    err
                });
            });
    }, [http, params, data, parseData])
    useEffect(() => {
        query();
    }, [http, params, data, parseData]);
    return result
}
export default useQuery
