import { Button, Divider, Space } from "antd";
import styled from "styled-components";
import Container from "../layout/Container";
import StyledLink from "./StyledLink";



const StyledContainer = styled(Container)`
    width:340px;
    margin-top:80px;
    margin-bottom:60px;
    background:#fff;
    padding:20px 40px;
`
const StyledButton = styled(Button)`
    margin-bottom:12px;
`

const Title = styled.div`
    font-size:24px;
    font-weight:700;
    text-align:center;
`
const SubTitle = styled.div`
    text-align:center;
    color:#808080;
`


const AuthBox = ({
    children
}) => {

    return (
        <StyledContainer>
            <Title>
                {process.env.NEXT_PUBLIC_NAME}
            </Title>
            <SubTitle>
                {process.env.NEXT_PUBLIC_SUBTITLE}
            </SubTitle>
            {children}
            <Divider>更多登陆方式</Divider>
            <StyledButton
                block
            >
                <StyledLink href="/asd">
                    github快速登录
                </StyledLink>
            </StyledButton>
            <StyledButton
                block
            >
                <StyledLink href={process.env.NEXT_PUBLIC_GITEE_PATH}>
                    gitee快速登录
                </StyledLink>
            </StyledButton>
            <StyledButton
                type="link"
                block
            >
                原账号密码登录
            </StyledButton>
        </StyledContainer>
    )
}
export default AuthBox