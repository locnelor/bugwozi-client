import { GetServerSideProps, GetServerSidePropsContext, PreviewData, Redirect } from "next"
import { ParsedUrlQuery } from "querystring"
import { isServerReq } from "."
import HttpFetch from "../http/HttpFetch"
import makeStore from "../store"
import { StoreType } from "../store/interface"

type callbackResult = {
    props?: {
        [k in string]: HttpFetch
    }
    redirect?: Redirect
    notFound?: true
} | void
/**
 * store
 * 传入一个空，与page中store合并。
 * 
 * props
 * 使用instanceof判断是否为httpFetch类型
 * ? 是服务端则执行ssr预渲染，否则返回httpFetch的json，使用useProps进行客户端请求
 * : 直接返回
 */
const makeServerSideProps = function (
    callback: (
        store: StoreType,
        ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    ) => callbackResult | Promise<callbackResult>
) {
    const result: GetServerSideProps = async (ctx) => {
        const store = makeStore();
        const callbackResult = await callback(store, ctx);
        if (!callbackResult) return {
            props: {
                _store: store.getState()
            }
        }
        const { props, notFound, redirect } = callbackResult
        if (!!notFound) return { notFound };
        if (!!redirect) return { redirect };
        if (!props) return {
            props: {
                _store: store.getState()
            }
        }
        const data: any = {};
        const isServer = isServerReq(ctx.req);
        for (const key in props) {
            if (props[key] instanceof HttpFetch) {
                const item = {} as {
                    data: any
                    err: any
                    json: any
                };
                if (isServer) {
                    await props[key].commit()
                        .then((data) => {
                            item.data = data;
                        }).catch((err) => {
                            item.err = err;
                            item.json = props[key].toJson()
                        })
                }
                item.json = props[key].toJson();
                data[key] = item;
                continue;
            }
            data[key] = props[key];
        }
        return { props: data }
    }
    return result
}
export default makeServerSideProps