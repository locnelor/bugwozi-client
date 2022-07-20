import { Store } from "redux";
import Account from "../../type/account";

export interface InitialValue {
    user?: Account
}

export type StoreType = Store<InitialValue, Action>;


export enum StoreActionType {
    StoreInit,
    StoreMerge,
    SetUser
}
export interface Action {
    type: StoreActionType,
    data: any
}