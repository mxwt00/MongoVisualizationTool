import { configureStore} from "@reduxjs/toolkit";
import relationalContentSlice from "./RelationalContentSlice";
import erContentSlice from "./ErContentSlice";
import mongoContentSlice from "./MongoContentSlice";


export const store = configureStore({
    reducer: {
        erContent: erContentSlice,
        relationalContent: relationalContentSlice,
        mongoContent: mongoContentSlice
    }
})

export default store;