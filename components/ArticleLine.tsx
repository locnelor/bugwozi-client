import { Avatar, Tag } from "antd"
import Link from "next/link"
import styled from "styled-components"
import Article, { articleCover } from "../type/article"
import StyledLink from "./StyledLink"
const Layout = styled.div`
    padding:10px 10px 10px 0px;
    background:#fff;
    border-radius:5px;   
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-top:10px;
    margin-bottom:10px;
`
const Side = styled.img`
    height:120px;
    width:200px;
    padding-left:10px;
`
const Container = styled.div`
    display:flex;
`
const Content = styled.div<{
    type: articleCover
}>`
    padding-left:10px;
    width:${props => props.type === "cover" ? "calc(100% - 200px)" : "100%"};
    position:relative;
`
const Title = styled.div`
    font-weight:700;
    font-size:24px;
`
const SubTitle = styled.div`
    max-height:80px;
    display:block; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
    overflow: hidden; 
`
const Footer = styled.div<{
    type: articleCover
}>`
    display:flex;
    margin-top:10px;
    padding-left:10px;
    align-items:center;
    bottom:0px;
    ${props => props.type === "cover" ? "position:absolute;" : ""} 
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
                    {article.type === "cover" && (
                        <StyledLink href={`/article/${article.hash_key}`}>
                            <Side src="https://i0.hdslb.com/bfs/article/80a6be135ad3a0c3681e31b249328714285ec689.jpg@942w_611h_progressive.webp" alt="" />
                        </StyledLink>
                    )}
                    <Content type={article.type}>
                        <Title>
                            <StyledLink href={`/article/${article.hash_key}`}>
                                {article.title}
                            </StyledLink>
                        </Title>
                        <SubTitle>
                            <StyledLink href={`/article/${article.hash_key}`}>
                                {article.subTtile}
                            </StyledLink>
                        </SubTitle>
                        <Footer type={article.type}>
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
                        </Footer>
                    </Content>
                </Container>
            </Layout >
        )
    }
export default ArticleLine