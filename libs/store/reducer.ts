import { Reducer } from "redux";
import {
    Action,
    InitialValue,
    StoreActionType,
} from "./interface";
export const initialValue: InitialValue = {

}
const reducer: Reducer<InitialValue, Action> = (
    state = initialValue,
    {
        type,
        data
    }
) => {

    switch (type) {
        case StoreActionType.StoreInit:
            state = data;
            break;
        case StoreActionType.StoreMerge:
            for (const key in data) {
                (state as any)[key] = data[key];
            }
            break;
        case StoreActionType.SetUser:
            state.user = data;
            break;
    }

    return { ...state }
}




export default reducer