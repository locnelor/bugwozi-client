import { message } from "antd";
import axios, { Method } from "axios";
import { stringify } from "qs"
type HttpFetchParams = { [k in string]: string };
type HttpFetchBody = { [k in string]: any };
const fetch = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BASE_API
})
interface HttpFetchTemplate {
    params?: HttpFetchParams,
    body?: HttpFetchBody,
    res?: any
}
let cookies = "";
fetch.interceptors.request.use(config => {
    if (!!cookies) config.headers.cookie = cookies;
    return config;
})
fetch.interceptors.response.use(({ data }) => {
    return data;
}, ({ response }) => {
    if (!response) return Promise.reject(null);
    const { data, status } = response;
    const msg = typeof data.message === "object" ?
        data.message.join(",") :
        data.message
    return Promise.reject({ status, message: msg })
});
class HttpFetch<T extends HttpFetchTemplate = any>{
    private readonly source = axios.CancelToken.source()
    private constructor(
        private readonly url: string,
        private readonly method: Method = "GET",
        private data: any = undefined,
    ) {
    }
    public static setCookie(cookie: string) {
        cookies = cookie;
    }
    private errCallback = (err) => Promise.reject<any>(err)
    private resultCallback = (data: T["res"]) => Promise.resolve(data);
    public setErrorCallback(callback: typeof this.errCallback) {
        this.errCallback = callback;
        const self = new HttpFetch(this.url, this.method);
        self.data = this.data;
        self.errCallback = callback;
        self.resultCallback = this.resultCallback;
        return self;
    }
    public setResultCallback(callback: typeof this.resultCallback) {
        this.resultCallback = callback;
        const self = new HttpFetch(this.url, this.method);
        self.data = this.data;
        self.errCallback = this.errCallback;
        self.resultCallback = callback;
        return self;
    }
    public static get<T extends HttpFetchTemplate>(url: string) {
        return new HttpFetch<T>(url, "GET");
    }
    public static post<T extends HttpFetchTemplate>(url: string) {
        return new HttpFetch<T>(url, "POST")
    }
    public setData(data: T["body"]) {
        return new HttpFetch(
            this.url,
            this.method,
            typeof data === "function" ? data : stringify(data)
        )
    }
    public params(param: T["params"]) {
        const url = Object.keys(param).reduce((url, key) => {
            return url.replace(`:${key}`, param[key])
        }, this.url)
        return new HttpFetch(
            url,
            this.method,
            this.data
        )
    }
    public cancel(message = "中断请求") {
        this.source.cancel(message)
    }
    public async commit(
        callback?: (err: any, data: T["res"]) => void
    ) {
        const { url, method, data } = this;
        const http = fetch({
            url,
            method,
            data
        });
        let err;
        let result: T["res"]
        const fn = (e: Promise<any>) => {
            return new Promise((resolve) => {
                e.then((data) => {
                    result = data;
                }).catch((e) => {
                    err = e;
                }).finally(() => {
                    resolve("")
                })
            })
        };
        await fn(http);
        if (!!err) await fn(this.errCallback(err));
        else if (!!result) await fn(this.resultCallback(result));
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