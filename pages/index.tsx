import { Card, Col, Row } from "antd";
import Head from "next/head";
import ArticleLine from "../components/ArticleLine";
import Container from "../layout/Container";
import Page from "../layout/Page";
import withPage from "../libs/page/withPage";
import Account from "../type/account";
import Article from "../type/article";


export default withPage(null, () => {
  const account: Account = {
    uid: 0,
    hash_key: "hash_key",
    user_name: "阔哥牛逼",
    exp: 1024,
    create_date: new Date()
  }
  const articles: Article[] = [{
    account,
    id: 1,
    hash_key: "string",
    title: "string",
    subTtile: new Array(200).fill("阔").join(""),
    status: "inspect",
    views: 10,
    create_time: new Date(),
    issue_num: 123,
    article_tags: [{
      id: 0,
      name: "js"
    }]
  }];
  return (
    <Page>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_NAME}
        </title>
      </Head>
      <Container>
        <Row gutter={20}>
          <Col span={18}>
            {articles.map((article) => (
              <ArticleLine
                key={article.hash_key}
                article={article}
              />
            ))}
          </Col>
          <Col span={6}>
            <Card>
              213
            </Card>
          </Col>
        </Row>

      </Container>
    </Page>
  )
})