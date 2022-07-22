import { strFactory } from "../..";
import HttpFetch from "../../HttpFetch";
const getUrl = strFactory("api/account/basic/");

//获取用户关注列表
export const GetAccountFollow = HttpFetch.make(getUrl("follow/:hash_key/:id")).RE<{}, 123>();

//获取用户信息
export const GetAccountInfo = HttpFetch.make(getUrl("getUserInfo"));