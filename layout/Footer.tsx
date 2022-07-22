import { Divider, Layout } from "antd";
import styled from "styled-components";
import StyledLink from "../components/StyledLink";
import useKGNB from "../hooks/useKGNB";
import Container from "./Container";
const StyledFooter = styled(Layout.Footer)`
    background:#fff;
    font-size:12px;
`
const StyledContainer = styled(Container)`
    display:flex;
    align-items:center;
`
const Item = styled.div`
    margin-left:5px;
    margin-right:5px;
`
const Footer = () => {
    const list = [
        {
            name: "冀ICP备号3141592653",
            href: ""
        },
        { elem: <Divider type="vertical" /> },
        {
            name: "友情链接",
            href: ""
        },
        { elem: <Divider type="vertical" /> },
        {
            name: "kgnb",
            href: "/kgnb"
        },
        { elem: <Divider type="vertical" /> },
        {
            name: "关于",
            href: "/about"
        },
        { elem: <Divider type="vertical" /> },
        {
            name: "投喂",
            href: ""
        }
    ];
    const kgnb = useKGNB();
    return (
        <StyledFooter>
            <StyledContainer flex>
                {list.map(({ name, href, elem }, key) => !!elem ? elem : (
                    <Item key={key}>
                        <StyledLink href={href}>
                            {name}
                        </StyledLink>
                    </Item>
                ))}
            </StyledContainer>
            <Divider />
            <Container>
                {kgnb}
            </Container>
        </StyledFooter>
    )
}
export default Footer