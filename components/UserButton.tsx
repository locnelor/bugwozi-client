import { Avatar, Button, Card, Menu, Popover } from "antd"
import Link from "next/link";
import Account from "../type/account"
import UserOutlined from "@ant-design/icons/UserOutlined"
import styled from "styled-components";
import StyledLink from "./StyledLink";
import PlusOutlined from "@ant-design/icons/PlusOutlined"
const UserContainer = styled.div`
    display:flex;
    justify-content:end;
    align-items:center;
`
const StyledMargin = styled.div`
    margin-left:10px;
    margin-right:10px;
`
const StyledPopoverContext = styled.div`
    padding:10px;
`
const UserButton: React.FC<{
    user: Account,
    back?: string
}> = ({
    user,
    back = "/"
}) => {
        if (!user) {
            return (
                <Link href={`/auth?back=${encodeURIComponent(back)}`} passHref>
                    <a>
                        <Button type="dashed">
                            <UserOutlined /> 注册 或 登录
                        </Button>
                    </a>
                </Link>
            )
        }
        const menu = [{
            name: "个人主页",
            icon: "",
            href: "/home"
        }, {
            name: "设置",
            icon: "",
            href: "setting"
        }, {
            name: "退出登录",
            icon: "",
            href: "logout"
        }];
        return (
            <UserContainer>
                <Popover content={
                    <StyledPopoverContext>
                        发布文章
                    </StyledPopoverContext>
                }>
                    <StyledMargin>
                        <StyledLink href="/write">
                            <PlusOutlined />
                        </StyledLink>
                    </StyledMargin>
                </Popover>
                <Popover content={(
                    <Menu mode="inline">
                        {menu.map(({ name, icon, href }, key) => (
                            <Menu.Item key={key}>
                                <StyledLink href={href}>
                                    {name}
                                </StyledLink>
                            </Menu.Item>
                        ))}
                    </Menu>
                )}>
                    <Avatar src={`${process.env.NEXT_PUBLIC_BASE_API}/basic/picture/avatar/${user.hash_key}/40`} />
                </Popover>
            </UserContainer>
        )

    }
export default UserButton