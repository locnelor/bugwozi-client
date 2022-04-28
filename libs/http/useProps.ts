import { useCallback, useEffect, useReducer } from "react"
import HttpFetch from "./HttpFetch"


type stateType = {
    [k in string]: {
        data: any,
        err?: any,
        json?: any,
        http?: HttpFetch
    }
}
const useProps = <T extends { [k in string]: any }>(props: any) => {
    const [stats, dispatch] = useReducer(
        (state: stateType, {
            key,
            err,
            result
        }: {
            key: string
            err: any
            result: any
        }) => {
            stats[key].err = err;
            stats[key].data = result;
            return { ...state }
        }, Object.keys(props).reduce((acc, key) => {
            const { data, err, json } = props[key];
            acc[key] = {
                data,
                err,
                json,
                http: HttpFetch.parser(json)
            }
            return acc;
        }, {} as stateType));
    const refreshBy = useCallback((
        key: string,
        callback?: (http: HttpFetch) => void
    ) => {
        const http = stats[key].http;
        if (!http) return;
        if (!!callback) callback(http);
        http.commit((err, result) => dispatch({
            key,
            err,
            result
        }))
    }, [])
    useEffect(() => {
        if (typeof window !== "undefined") return;
        for (const key in stats) {
            const { data, err } = stats[key];
            if (!err && !data) {
                //如果未在服务端渲染，就在客户端请求
                refreshBy(key)
            }
        }
        return () => {
            //关闭所有请求
            for (const key in stats) {
                stats[key].http?.cancel()
            }
        }
    }, []);
    return Object.keys(stats).reduce((acc, key) => {
        const { data, err } = stats[key]
        acc[key] = {
            data,
            err,
            loading: !data && !err,
            refresh: (callback?: (http: HttpFetch) => void) => refreshBy(key, callback)
        }
        return acc;
    }, {} as any) as {
            [k in keyof T]: {
                data: T[k],
                err?: any,
                loading: boolean
                refresh: (callback?: (http: HttpFetch) => void) => void
            }
        }
}
export default useProps