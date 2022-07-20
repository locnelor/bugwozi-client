import { NextComponentType, NextPageContext } from "next"
import { AppContext, AppProps } from "next/app"
import { useEffect } from "react"
import { Provider } from "react-redux"
import makeStore from "../store"
import { StoreActionType, StoreType } from "../store/interface"



type callback = (store: StoreType, ctx: NextPageContext) => void | Promise<void>

/**
 * 封装app组件
 */
const withApp = (
    AppComponent: React.FC<{
        Component: NextComponentType<NextPageContext, any, {}>,
        pageProps: any
    }>,
    callback?: callback
) => {
    const WithApp = ({
        Component,
        pageProps: {
            _pageStore,
            ...pageProps
        },
        _store
    }: AppProps & {
        _store: any
    }) => {
        const store = makeStore(_store)
        useEffect(() => {
            // console.log(_pageStore, pageProps, "pageStore");
            store.dispatch({
                type: StoreActionType.StoreMerge,
                data: _pageStore
            })
        }, [_pageStore])
        return (
            <Provider store={store}>
                <AppComponent
                    Component={Component}
                    pageProps={pageProps}
                />
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