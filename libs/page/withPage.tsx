import { NextPageContext } from "next";
import HttpFetch, { setCookie } from "../http/HttpFetch";
import makeStore from "../store";
import { StoreType } from "../store/interface";
type withPropsResult<T> = {
    [k in keyof T]: {
        err: any,
        json: string,
        data: T[k] extends HttpFetch ? Awaited<ReturnType<T[k]["commit"]>> : null
    }
}
type DefaultType = { [k in string]: HttpFetch } | null
type PageComponentType<T> = React.FC<withPropsResult<T>>
type GetInitialFunction<T> = (
    store: StoreType,
    ctx: NextPageContext
) => Promise<T>
type callbackType<T> = (result: withPropsResult<T>) => {
    redirect?: string,
    notFound?: true
} | void
function withPage<T extends DefaultType>(
    getInitialFunction: GetInitialFunction<T> = null,
    PageComponent: PageComponentType<T>,
    cb?: callbackType<T>,
    { ssr } = { ssr: false }
) {
    const WithPage = (props) => {
        return <PageComponent {...props} />
    }
    WithPage.getInitialProps = async (ctx: NextPageContext) => {
        const isServer = !!ctx.req;
        const store = makeStore();
        const getPropsData = async (fetchs: T) => {
            if (!fetchs) return null;
            const result = (Object.keys(fetchs) as (keyof T)[])
                .reduce((acc, key) => {
                    const json = fetchs[key].toJson()
                    acc[key] = {
                        json,
                        data: null,
                        err: null
                    }
                    return acc;
                }, {} as withPropsResult<T>);
            if (isServer || ssr) {
                setCookie(ctx.req?.headers.cookie);
                for (const key in fetchs) {
                    const data = await fetchs[key].commit().catch((err) => {
                        result[key].err = err;
                    });
                    result[key].data = data;
                }
            }
            return result;
        };
        const result = !!getInitialFunction ? await getInitialFunction(store, ctx) : {} as T;
        const props = await getPropsData(result);
        const method = !!cb && isServer ? cb(props) : {} as ReturnType<callbackType<T>>;
        if (!!method) {
            if (!!method.redirect) {
                ctx.res.writeHead(302, {
                    Location: method.redirect
                })
                ctx.res.end()
                return;
            }
            if (!!method.notFound) {
                ctx.res.writeHead(404)
                ctx.res.end()
                return;
            }
        }
        return props;
    }
    return WithPage
}
export default withPage