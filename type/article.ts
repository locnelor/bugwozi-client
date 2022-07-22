import Account from "./account"
import article_tag from "./article_tag"


export type articleStatus = "inspect" | "success" | "rejects"
export type articleCover = "cover" | "none"
type Article = {
    id: number
    account: Account,
    hash_key: string
    title: string
    subTtile: string
    status: articleStatus
    reason?: string
    views: number
    create_time: Date
    type: articleCover
    issue_num: number
    article_tags: article_tag[]
}
export default Article