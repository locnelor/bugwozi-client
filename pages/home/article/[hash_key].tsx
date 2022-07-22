import { Col, Row, Spin } from "antd";
import ArticleSideInfo from "../../../components/ArticleSideInfo";
import RichEditor from "../../../components/draftjs-richEditor";
import Container from "../../../layout/Container";
import Page from "../../../layout/Page";
import { GetAccountArticle } from "../../../libs/http/router/account/article";
import withPage from "../../../libs/page/withPage";


export default withPage(async (store, ctx) => {
    const { hash_key } = ctx.query;
    return {
        article: GetAccountArticle.params({ hash_key: hash_key.toString() })
    }
}, (props) => {
    // console.log(props)
    const { article } = props;
    const context = !!article.data && article.data.context

    return (
        <Page>
            <Container>
                <Row gutter={20}>
                    <Col span={6}>
                        <ArticleSideInfo article={article.data} loading={article.loading} />
                    </Col>
                    <Col span={18}>
                        {article.loading ? <Spin /> : <RichEditor
                            initialValue={context}
                            readOnly
                        />}
                    </Col>
                </Row>

            </Container>
        </Page>
    )
})