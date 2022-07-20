import { Divider, Menu } from "antd";
import { useRouter } from "next/router";
import { useMemo } from "react"
import StyledLink from "./StyledLink";



const PageMenu = ({
    children
}) => {
    const { pathname } = useRouter();
    const menu = useMemo(() => {
        return (
            <Menu defaultSelectedKeys={[pathname]} mode="horizontal">
                <Menu.Item key="/">
                    <StyledLink href="/">
                        首页
                    </StyledLink>
                </Menu.Item>
                <Menu.Item key="/following">
                    <StyledLink href="/following">
                        关注
                    </StyledLink>
                </Menu.Item>
                <Menu.Item key="/dynamic">
                    <StyledLink href="/dynamic">
                        动态
                    </StyledLink>
                </Menu.Item>
            </Menu>
        )
    }, [])

    return (
        <>
            {menu}
            <Divider />
            {children}
        </>
    )
}
export default PageMenu