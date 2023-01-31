import { configureStore} from "@reduxjs/toolkit";
import relationalContentSlice from "./RelationalContentSlice";
import erContentSlice from "./ErContentSlice";
import mongoContentSlice from "./MongoContentSlice";
import appModeSlice from "./AppModeSlice";


export const store = configureStore({
    reducer: {
        erContent: erContentSlice,
        relationalContent: relationalContentSlice,
        mongoContent: mongoContentSlice,
        appMode: appModeSlice
    }
})

export default store;