

export default interface Account {
    uid: number
    hash_key: string
    user_name: string
    user_info?: string
    article_stars:number
    article_view:number
    exp:number
    fans_count:number
    follow_count:number
    create_date: string
}