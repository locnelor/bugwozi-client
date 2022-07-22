import Page from "../../layout/Page";
import withPage from "../../libs/page/withPage";
import ArticleEditor, { pushArticleData } from "../../components/ArticleEditor";
import { useCallback, useEffect } from "react";
import useQuery from "../../hooks/useQuery";
import { PublishArticle } from "../../libs/http/router/account/article";
import { useRouter } from "next/router";

export default withPage(null, () => {
    const [result, query] = useQuery(PublishArticle);
    const router = useRouter();
    const onFinish = useCallback(async (data: pushArticleData) => {
        await query(data).then((hash_key) => {
            router.push(`/home/article/${hash_key}`)
        }).catch((e) => {
            console.log(e)
        });
    }, []);
    return (
        <Page>
            <ArticleEditor onFinish={onFinish} />
        </Page>
    )
})