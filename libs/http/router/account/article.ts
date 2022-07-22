import { strFactory } from "../..";
import Article from "../../../../type/article";
import HttpFetch from "../../HttpFetch";
const getUrl = strFactory("account/article/")

//发布文章
export const PublishArticle = HttpFetch.make(getUrl("publish"), "POST").RE<{
    title: string
    subTitle: string
    context: string
    cover?: string
    tags: string[]
    type: string
    isVisible: boolean
}, string>()

//获取文章
export const GetAccountArticle = HttpFetch.make(getUrl("get/:hash_key"), "GET").RE<null, Article>()

