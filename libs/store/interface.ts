import { Store } from "redux";

export interface InitialValue {
    
}

export type StoreType = Store<InitialValue, Action>;


export enum StoreActionType {
    StoreInit,
    StoreMerge,
}
const {
    StoreInit,
    StoreMerge
} = StoreActionType

export {
    StoreInit,
    StoreMerge
}
export interface Action {
    type: StoreActionType,
    data: any
}