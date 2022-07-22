import { Avatar, Tag } from "antd"
import Link from "next/link"
import styled from "styled-components"
import Article from "../type/article"
import StyledLink from "./StyledLink"


const Layout = styled.div`
    padding:20px 10px 20px 0px;
    background:#fff;
    border-radius:5px;   
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const Side = styled.img`
    max-height:120px;
    max-width:200px;
    padding-left:10px;
`
const Container = styled.div`
    display:flex;
`
const Content = styled.div`
    padding-left:10px;
`
const Title = styled.div`
    font-weight:700;
    font-size:24px;
`
const SubTitle = styled.div`
    max-height:80px;
    display:block; 
    overflow: hidden; 
    white-space: nowrap; 
    text-overflow: ellipsis; 
`
const Header = styled.div`
    display:flex;
    margin-top:10px;
    padding-left:10px;
    align-items:center;
`
const Name = styled.div`
    padding-left:5px;
    line-height:34px;
`
const StyledTag = styled(Tag)`
    margin-left:10px;
`


const ArticleLine: React.FC<{
    article: Article
}> = ({
    article
}) => {

        return (
            <Layout>
                <Container>
                    <Side src="https://i0.hdslb.com/bfs/article/80a6be135ad3a0c3681e31b249328714285ec689.jpg@942w_611h_progressive.webp" alt="" />
                    <Content>
                        <Header>
                            <Link href={`/user/${article.account.hash_key}`} passHref>
                                <a>
                                    <Avatar src={article.account.hash_key} />
                                </a>
                            </Link>
                            <Name>
                                <StyledLink href={`/user/${article.account.hash_key}`} >
                                    {article.account.user_name}
                                </StyledLink>
                            </Name>
                            {article.article_tags.map(tag => (
                                <StyledLink key={tag.id} href={`/?s=${tag.name}`}>
                                    <StyledTag>
                                        {tag.name}
                                    </StyledTag>
                                </StyledLink>
                            ))}

                        </Header>
                        <Title>
                            {article.title}
                        </Title>
                        <SubTitle>
                            <span style={{ width: "100%" }}>
                                {article.subTtile}
                            </span>
                        </SubTitle>
                    </Content>
                </Container>

            </Layout>
        )
    }
export default ArticleLine