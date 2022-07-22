import { useEffect, useState } from "react"
import { HttpFetch } from "../libs/http"


export type withPropsResult<T extends { [k in string]: HttpFetch }> = {
    [k in keyof T]: {
        err: any,
        json: string,
        loading: boolean
        // data: Awaited<ReturnType<T[k]["commit"]>>
        data: Parameters<Parameters<T[k]["commit"]>[0]>[1]
    }
}

const useProps = <T extends withPropsResult<any>>(props: T) => {
    const [result, setResult] = useState(props);
    useEffect(() => {
        const map = {} as { [k in string]: HttpFetch };
        for (const key in props) {
            const { json, loading } = props[key as string]
            if (loading) {
                map[key] = HttpFetch.parser(json);
                map[key].commit((err, data) => {
                    result[key].loading = false;
                    result[key].err = err;
                    result[key].data = data as never;
                    setResult(result);
                })
            }
        }
        return () => {
            for (const key in map) {
                map[key].cancel()
            }
        }
    }, []);
    return result;
}
export default useProps