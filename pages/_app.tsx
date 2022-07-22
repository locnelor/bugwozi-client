import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { setCookie } from '../libs/http/HttpFetch'
import { GetAccountInfo } from '../libs/http/router/account/basic'
import withApp from '../libs/page/withApp'
import { StoreActionType } from '../libs/store/interface'



export default withApp(({
  Component,
  pageProps
}) => {
  return (
    <ConfigProvider locale={zhCN} >
      <Component
        {...pageProps}
      />
    </ConfigProvider>
  )
}, async (store, ctx) => {
  if (!!ctx.req) {
    const cookie = ctx.req.headers.cookie;
    setCookie(cookie);
    const user = await GetAccountInfo.commit().catch((e) => {
    });
    store.dispatch({
      type: StoreActionType.SetUser,
      data: user
    });
  }
})
