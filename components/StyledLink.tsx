import Link from "next/link"

import styled from "styled-components"

const StyledA = styled.a`
    color:#000;
    :hover{
        color:#505050;
    }
`

const StyledLink = ({ href, children }) => {
    return (
        <Link href={href} passHref>
            <StyledA>
                {children}
            </StyledA>
        </Link>
    )
}
export default StyledLink