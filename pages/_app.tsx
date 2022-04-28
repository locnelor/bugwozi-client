import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import withApp from '../libs/page/withApp'



export default withApp(({
  children
}) => {
  return (
    <ConfigProvider locale={zhCN} >
      {children}
    </ConfigProvider>
  )
}, async (store, ctx) => {

})
