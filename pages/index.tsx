import Link from 'next/link'
import Page from '../layout/Page'
import useProps from '../libs/http/useProps'
import makeServerSideProps from '../libs/page/makeServerSideProps'
import withPage from '../libs/page/withPage'
import { StoreInit } from '../libs/store/interface'


export default withPage(Page, (props: any) => {
  const data = useProps(props);

  return (
    <div >
      <Link href="/demo">
        <a >
          toDemo
        </a>
      </Link>
    </div>
  )
})
export const getServerSideProps = makeServerSideProps((store) => {
  store.dispatch({
    type: StoreInit,
    data: {
      a: "sbppk"
    }
  })
})