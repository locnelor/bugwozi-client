import axios, { AxiosRequestConfig, Method } from "axios";
import { stringify } from "qs"



type HttpFetchParams = { [k in string]: string };
type HttpFetchBody = { [k in string]: any };
interface HttpFetchTemplate {
    params?: HttpFetchParams,
    body?: HttpFetchBody,
    res?: any
}

class HttpFetch<T extends HttpFetchParams = any>{
    //为了中断请求的token
    private readonly source = axios.CancelToken.source()

    //请求配置
    private config: AxiosRequestConfig = {}
    private constructor(
        private readonly url: string,
        method: Method
    ) {
        this.config.url = url;
        this.config.method = method
    }
    public static get<T extends HttpFetchParams>(url: string) {
        return new HttpFetch<T>(url, "GET");
    }
    public static post<T extends HttpFetchParams>(url: string) {
        return new HttpFetch<T>(url, "POST")
    }
    public setData(data: T["body"], parse = true) {
        this.config.data = parse ? stringify(data) : data;
        return this;
    }
    public params(param: T["params"]) {
        this.config.url = this.url;
        for (const key in param) this.config.url = this.config.url?.replace(`:${key}`, param[key]);
        return this;
    }
    public cancel(message = "中断请求") {
        this.source.cancel(message)
    }
    public async commit(
        callback?: (err: any, data: T["res"]) => void
    ) {
        const http = axios(this.config);
        let err;
        const result: T["res"] = await http.catch((e) => err = e);
        if (!!callback) return callback(err, result);
        if (!!err) return Promise.reject(err);
        return result;
    }
    public toJson() {
        return JSON.stringify(this.config);
    }
    public static parser(str: string) {
        try {
            const json = JSON.parse(str);
            if (!json.url) return;
            if (!json.method) return;
            const http = new HttpFetch("", "GET");
            http.config = json;
            return http;
        } catch (e) {
            return
        }
    }
}
export default HttpFetch