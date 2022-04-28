import { Reducer } from "redux";
import {
    Action,
    InitialValue,
    StoreInit,
    StoreMerge
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
        case StoreInit:
            state = data;
            break;
        case StoreMerge:
            for (const key in data) {
                (state as any)[key] = data[key];
            }
    }

    return { ...state }
}




export default reducer