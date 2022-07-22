import { Divider, Layout } from "antd";
import { useMemo } from "react";
import styled from "styled-components";
import StyledLink from "../components/StyledLink";
import useKGNB from "../hooks/useKGNB";
import Container from "./Container";
const StyledFooter = styled(Layout.Footer)`
    background:#fff;
    font-size:12px;
    margin-top:20px;
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
    const kgnb = useKGNB();
    const list = useMemo(() => [
        {
            name: "冀ICP备号3141592653",
            href: "/"
        },
        { elem: true },
        {
            name: "友情链接",
            href: "/links"
        },
        { elem: true },
        {
            name: "kgnb",
            href: "/kgnb"
        },
        { elem: true },
        {
            name: "关于",
            href: "/about"
        },
        { elem: true },
        {
            name: "投喂",
            href: "/feeding"
        }
    ], []);
    return (
        <StyledFooter>
            <StyledContainer flex>
                {list.map(({ name, href, elem }, key) => !!elem ? <Divider type="vertical" key={key} /> : (
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