import { useCallback, useEffect, useReducer } from "react"
import HttpFetch from "./HttpFetch"



/**
 * 
 * @param initialValue 初始化数据
 * @param query 是否立即请求
 * 
 */
const useQuery = <T>(
    http: HttpFetch,
    initialValue?: T,
    query = true
) => {
    const [stats, dispatch] = useReducer((stats: {
        data: T,
        err: any,
    }, {
        key,
        data
    }: {
        key: "data" | "err"
        data: any
    }) => {
        stats[key] = data;
        return { ...stats }
    }, {
        data: initialValue as T,
        err: undefined
    })
    const refresh = useCallback((callback?: (http: HttpFetch) => void) => {
        if (!!callback) callback(http);
        http.commit((err, result) => {
            if (!!err) dispatch({
                key: "err",
                data: err
            })
            else dispatch({
                key: "data",
                data: result
            })
        })
    }, [])
    useEffect(() => {
        if (typeof window === undefined) return;
        if (query) refresh()
        return () => http.cancel()
    })
    return [
        stats.data,
        stats.err,
        !stats.data && !stats.err,
        refresh
    ]
}
export default useQuery