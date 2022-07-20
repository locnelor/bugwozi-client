import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { useRouter } from 'next/router'
import http from '../libs/http'
import HttpFetch from '../libs/http/HttpFetch'
import withApp from '../libs/page/withApp'
import { StoreActionType } from '../libs/store/interface'



export default withApp(({
  Component,
  pageProps
}) => {
  // const router = useRouter();
  // console.log(router)
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
    HttpFetch.setCookie(cookie);
    const user = await http.account.basic.getUserInfo.commit().catch((e) => {
    });
    store.dispatch({
      type: StoreActionType.SetUser,
      data: user
    });
  }
})
