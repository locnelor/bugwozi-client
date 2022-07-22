

export default interface Account {
    uid: number
    hash_key: string
    user_name: string
    user_info?: string
    exp:number
    create_date: Date
}