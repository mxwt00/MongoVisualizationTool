import {createSlice} from "@reduxjs/toolkit";
import {AppMode} from "./AppMode";

export const appModeSlice = createSlice({
    name: 'appMode',
    initialState: {
        mode: AppMode.titleScreen
    },
    reducers: {
        setMode: (state, mode) => {
            state.mode = mode.payload
        }
    }
})

export const {setMode} = appModeSlice.actions
export default appModeSlice.reducer