
import { Layout } from "antd"
import styled from "styled-components"
import React from "react"
import Header from "./Header"
import Footer from "./Footer"

const StyledLayout = styled(Layout)`

`
const StyledContent = styled(Layout.Content)`

`
const Page = ({
    children,
    header = <Header />
}: {
    children: JSX.Element
    header?: JSX.Element
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