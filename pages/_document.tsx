import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />)
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ) as any
            }
        } finally {
            sheet.seal()
        }
    }
    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="/antd.min.css" />
                    <link rel="stylesheet" href="/public.css" />
                    <link rel="stylesheet" href="/index.css" />
                    <link rel="stylesheet" href="/atom-one-dark.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
export default MyDocument