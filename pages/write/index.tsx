import Page from "../../layout/Page";
import withPage from "../../libs/page/withPage";
import ArticleEditor, { pushArticleData } from "../../components/ArticleEditor";
import { useCallback } from "react";
export default withPage(null, () => {
    const onFinish = useCallback((data: pushArticleData) => {

    }, [])
    return (
        <Page>
            <ArticleEditor onFinish={onFinish} />
        </Page>
    )
})