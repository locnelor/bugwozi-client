import Head from "next/head";
import AuthBox from "../../components/AuthBox";
import SignBox from "../../components/SignBox";
import Page from "../../layout/Page";
import withPage from "../../libs/page/withPage";



export default withPage(null, () => {
    return (
        <Page header={null}>
            <Head>
                <title>登录或注册</title>
            </Head>
            <AuthBox>
                <SignBox />
            </AuthBox>
        </Page>
    )
})