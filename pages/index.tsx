import Head from "next/head";
import Container from "../layout/Container";
import Page from "../layout/Page";
import withPage from "../libs/page/withPage";


export default withPage(null, () => {


  return (
    <Page>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_NAME}
        </title>
      </Head>
      <Container>
        123
      </Container>
    </Page>
  )
})