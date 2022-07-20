import styled from "styled-components"
import React from "react"
import { Layout } from "antd"
import Header from "./Header"
import Footer from "./Footer"

const StyledLayout = styled(Layout)`

`
const StyledContent = styled(Layout.Content)`
    padding-top:10px;
`
type props = {
    header?: JSX.Element,
    children?: React.ReactNode
}
const Page: React.FC<props> = ({
    children,
    header = <Header />
}) => {
    return (
        <StyledLayout>
            {header}
            <StyledContent>
                {children}
            </StyledContent>
            <Footer />
        </StyledLayout>
    )
}
export default Page