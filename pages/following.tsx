import { Col, Row } from "antd";
import Head from "next/head";
import PageMenu from "../components/PageMenu";
import Side from "../components/Sider";
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
                <Row gutter={20}>
                    <Col span={6}>
                        <Side />
                    </Col>
                    <Col span={18}>
                        <PageMenu>
                            关注
                        </PageMenu>
                    </Col>
                </Row>
            </Container>
        </Page>
    )
})