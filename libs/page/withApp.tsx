import { NextPageContext } from "next"
import { AppContext, AppProps } from "next/app"
import Head from "next/head"
import { Provider } from "react-redux"
import makeStore from "../store"
import { StoreType } from "../store/interface"



type callback = (store: StoreType, ctx: NextPageContext) => void | Promise<void>

/**
 * 封装app组件
 */
const withApp = (
    AppComponent: React.FC<{
        children: JSX.Element,
    }>,
    callback?: callback
) => {
    const WithApp = ({
        Component,
        pageProps,
        _store
    }: AppProps & {
        _store: any
    }) => {
        const store = makeStore(_store)
        return (
            <Provider store={store}>
                <AppComponent>
                    <Component {...pageProps} />
                </AppComponent>
            </Provider>
        )
    }
    WithApp.getInitialProps = async ({ ctx, Component }: AppContext) => {
        const pageProps = !!Component.getInitialProps ?
            await Component.getInitialProps(ctx) :
            {};
        if (typeof window !== "undefined") return { pageProps }
        const store = makeStore()
        if (!!callback) {
            await callback(store, ctx);
        }
        return {
            pageProps,
            _store: store.getState()
        }
    }
    return WithApp
}
export default withApp