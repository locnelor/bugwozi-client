import axios, { Method } from "axios";
import { String, Union, List } from "ts-toolbelt"
import { stringify } from "qs"
const fetch = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BASE_API
})
let cookies = "";
export const setCookie = (cookie: string) => {
    cookies = cookie;
}
fetch.interceptors.request.use(config => {
    if (!!cookies) config.headers.cookie = cookies;
    return config;
})
fetch.interceptors.response.use((res) => {
    return res;
}, ({ response }) => {
    if (!response) return Promise.reject(null);
    const { data, status } = response;
    const msg = typeof data.message === "object" ?
        data.message.join(",") :
        data.message
    return Promise.reject({ status, message: msg })
});
export class HttpFetch<P = any, D = any, R = any>{
    private readonly source = axios.CancelToken.source()
    private constructor(
        private readonly url: string,
        private readonly method: Method,
        private readonly data?: any
    ) { }
    public static make<T extends string>(url: T, method: Method = "GET") {
        type QueryElements = List.Omit<String.Split<T, ":">, 0>
        type QueryParams = Union.Merge<{
            [QueryElement in QueryElements[number]]: {
                [key in String.Split<QueryElement, "/">[0]]: string
            }
        }[QueryElements[number]]>
        return new HttpFetch<QueryParams, any, any>(url, method)
    }
    public RE<D, R>() {
        return new HttpFetch<P, D, R>(this.url, this.method, this.data);
    }
    public setData(data: D, parse = true) {
        return new HttpFetch<P, D, R>(
            this.url,
            this.method,
            parse ? stringify(data) : data
        )
    }
    public params(params: P) {
        const url = Object.keys(params).reduce((url, key) => {
            return url.replace(`:${key}`, params[key])
        }, this.url)
        return new HttpFetch<P, D, R>(
            url,
            this.method,
            this.data
        )
    }
    public cancel(msg: string = "中断请求") {
        this.source.cancel(msg);
    }
    public async commit(
        callback?:
            (err: {
                status: number,
                message: string
            },
                data: R
            ) => void
    ) {
        const { url, method, data } = this;
        const http = fetch({
            url,
            method,
            data
        });
        let err;
        const result: R = await http.then(e => e.data as R).catch((e) => {
            err = e
            return null;
        });
        if (!!callback) return callback(err, result);
        if (!!err) return Promise.reject(err);
        return result;
    }
    public toJson() {
        const { url, method, data } = this
        return JSON.stringify({ url, method, data });
    }
    public static parser(str: string) {
        const { url, method, data } = JSON.parse(str);
        return new HttpFetch(url, method, data);
    }
}

export default HttpFetch