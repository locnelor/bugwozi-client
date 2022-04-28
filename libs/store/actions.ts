import makeStore from "."
import { Action, StoreMerge } from "./interface";


const dispatch = (action: Action) => {
    const store = makeStore();
    store.dispatch(action)
}

//合并数据
export const mergeData = (data: any) => {

    return dispatch({
        type: StoreMerge,
        data
    })
}

//初始化数据
export const storeInit = () => {

}