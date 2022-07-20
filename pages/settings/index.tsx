import { Col, Row } from "antd";
import Head from "next/head";
import Container from "../../layout/Container";
import Page from "../../layout/Page";
import withPage from "../../libs/page/withPage";
import SettingSide from "../../components/SettingSide"

import http from "../../libs/http";

export default withPage(async (store, ctx) => {

    return {
        user: http.account.basic.getUserInfo
    }
}, ({ user }) => {
    return (
        <Page>
            <Head>
                <title>设置</title>
            </Head>
            <Container>
                <Row gutter={20}>
                    <Col span={6}>
                        <SettingSide />
                    </Col>
                    <Col span={18}>
        
                    </Col>
                </Row>
            </Container>
        </Page>
    )
}, (result) => {
    if (!result.user.data) {
        return {
            redirect: "/auth"
        }
    }
})
