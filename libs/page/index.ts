import HttpFetch from "../http/HttpFetch";


export const isServerReq = (req: any) => !!req ? !req.url.startsWith('/_next') : false;

export const handle = async (req: any, https?: void | {
    [key in string]: HttpFetch
}) => {
    if (!https) return {};

    const result: any = {};
    for (const key in https) {
        result[key] = "sbppk"
    }
    return result;
}