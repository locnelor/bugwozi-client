import { Col, Row } from "antd";
import Head from "next/head";
import styled from "styled-components";
import ArticleLine from "../components/ArticleLine";
import StyledLink from "../components/StyledLink";
import Container from "../layout/Container";
import Page from "../layout/Page";
import withPage from "../libs/page/withPage";
import Account from "../type/account";
import Article from "../type/article";
const SideCard = styled.div`
  border-radius:5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding:10px;
  background:#fff;
  margin-top:10px;
`
const HotTitle = styled.div`
  font-size:18px;
  text-align:center;
`
const HotItem = styled.div`
  line-height:30px;
  display:flex;
  cursor:pointer;
  :hover{
    color:#3f51bf;
  }
  transition:.4s;
`
const HotItemContext = styled.div`
  width:calc(100% - 33px);
  text-overflow: ellipsis; 
  white-space: nowrap; 
  overflow: hidden; 
`
const HotItemKey = styled.div`
  padding-left:10px;
  padding-right:10px;
`
const InfoText = styled.div`
  text-align:center;
  font-size:16px;
`



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
    type: "none",
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
  }, {
    account,
    id: 1,
    hash_key: "string1",
    type: "cover",
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
  const hotList = new Array(10).fill({ keyword: "阔哥牛逼" })
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
            <SideCard>
              <HotTitle>
                本周热搜
              </HotTitle>
              {hotList.map(({ keyword }, key) => (
                <StyledLink href="" key={key}>
                  <HotItem key={key}>
                    <HotItemKey>{key + 1}、</HotItemKey>
                    <HotItemContext>{keyword}</HotItemContext>
                  </HotItem>
                </StyledLink>
              ))}
            </SideCard>
            <SideCard>
              <Row gutter={20}>
                <Col span={12}>
                  <HotTitle>用户总数</HotTitle>
                  <InfoText>1024</InfoText>
                </Col>
                <Col span={12}>
                  <HotTitle>收录文章</HotTitle>
                  <InfoText>1024</InfoText>
                </Col>
              </Row>
            </SideCard>
          </Col>
        </Row>

      </Container>
    </Page>
  )
})