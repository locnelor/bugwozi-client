import { useEffect, useState } from "react";



const useKGNB = () => {
    const kgnb = ["阔哥牛逼", new Array(10).fill("阔哥牛逼").join("")];
    const [key, setKey] = useState(0);
    const [result, setResult] = useState("");
    const [status, setStatus] = useState("entering");
    const [line, setLine] = useState(true);
    useEffect(() => {
        const time = setTimeout(() => setLine(!line), 500);
        return () => clearTimeout(time);
    }, [line])
    useEffect(() => {
        if (status === "deleting") {
            if (result.length === 0) {
                setKey(key + 1 === kgnb.length ? 0 : key + 1);
                setStatus("entering");
                return;
            }
            const time = setTimeout(() => {
                setResult(result.slice(0, result.length - 1));
            }, 50);
            return () => clearTimeout(time);
        }
        if (status === "finish") {
            const time = setTimeout(() => {
                setStatus("deleting");
            }, 3000);
            return () => clearTimeout(time);
        }
        if (status === "entering") {
            if (result.length === kgnb[key].length) {
                setStatus("finish");
                return;
            }
            const str = result + kgnb[key][result.length];
            const time = setTimeout(() => {
                setResult(str);
            }, 100);
            return () => clearTimeout(time);
        }
    }, [status, result]);
    return result + (line ? "|" : "");
}
export default useKGNB;