import HttpFetch from "./HttpFetch"
import { AccountBasicGetUserInfo } from "./router/account/basic"
const http = {
    account: {
        basic: {
            getUserInfo: HttpFetch.get<AccountBasicGetUserInfo>("/account/basic/getUserInfo")
        },
        post: {
            article: HttpFetch.post("/account/post/article")
        }
    }
}
export default http