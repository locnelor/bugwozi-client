import { useCallback } from "react";
import { useStore } from "react-redux";
import { legacy_createStore as createStore } from "redux"
import { InitialValue, StoreInit, StoreMerge, StoreType } from "./interface";
import reducer, { initialValue } from "./reducer";


let store: StoreType;
const makeStore = (init = initialValue) => {
    if (!!store) return store;
    const _store = createStore(reducer, init)
    if (typeof window === "undefined") return _store;
    store = _store;
    return store;
}


export const useStoreState = () => {
    const store: StoreType = useStore();
    const state = store.getState();
    const merge = useCallback((data: any) => {
        store.dispatch({
            type: StoreMerge,
            data
        })
    }, [])

    return {
        state,
        action: {
            merge
        }
    }
}

export default makeStore