import styled from "styled-components";
import { Col, Layout, Menu, Row } from "antd";
import Container from "./Container";
import StyledLink from "../components/StyledLink";
import Logo from "../components/Logo";
import { useRouter } from "next/router";
import Search from "../components/Search";
import UserButton from "../components/UserButton";
import { useStoreState } from "../libs/store";
const StyledHeader = styled(Layout.Header)`
    background:#fff;
`
const HeaderContent = styled.div`
    display:flex;
    align-items:center;
`
const UserContent = styled.div`
    display:flex;
    height:100%;
    justify-content: flex-end;
    align-items:center;
`
const Header = () => {
    const router = useRouter();
    const {
        state: {
            user
        }
    } = useStoreState();
    const menu = [{
        name: "精华",
        href: "/anthology"
    }, {
        name: "制造师们",
        href: "/creators"
    }];
    const selectedKeys = menu.filter(({ href }) => href === router.pathname).map(e => e.href);
    const renderSearch = () => {

        return (
            <Search />
        )
    }
    return (
        <StyledHeader>
            <Container>
                <Row gutter={20}>
                    <Col xl={4} lg={5} md={6} sm={2} xs={4}>
                        <StyledLink href="/">
                            <Logo />
                        </StyledLink>
                    </Col>
                    <Col xl={16} lg={14} md={12} sm={14} xs={20}>
                        <HeaderContent>
                            <Menu mode="horizontal" selectedKeys={selectedKeys} >
                                {menu.map(({ href, name }) => (
                                    <Menu.Item key={href} >
                                        <StyledLink href={href}>
                                            {name}
                                        </StyledLink>
                                    </Menu.Item>
                                ))}
                            </Menu>
                            {renderSearch()}
                        </HeaderContent>
                    </Col>
                    <Col xl={4} lg={5} md={6} sm={8} xs={0}>
                        <UserContent>
                            <UserButton user={user} back={router.asPath} />
                        </UserContent>
                    </Col>
                </Row>
            </Container>
        </StyledHeader>
    )
}

export default Header