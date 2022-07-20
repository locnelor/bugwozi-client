import { Avatar } from "antd"
import styled from "styled-components"

const LogoContext = styled.div`
    display:flex;
    justify-context:center;
    align-items:center;
`
const LogoTitle = styled.div`
    padding-left:5px;
    padding-right:5px;
    font-size:18px;
    font-weight:700;
`
const Logo = ({
    name = process.env.NEXT_PUBLIC_LOGO_TITLE
}) => {
    return (
        <LogoContext>
            <Avatar src="/logo.png" size={40} />
            {name && (
                <LogoTitle>
                    {name}
                </LogoTitle>
            )}
        </LogoContext>
    )
}
export default Logo