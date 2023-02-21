import {createSlice} from "@reduxjs/toolkit";

export const mongoContentSlice = createSlice({
    name: 'mongoContent',
    initialState: {
        collections: null
    },
    reducers: {
        setCollections: (state, documents) => {
            state.collections = documents
        }
    }
})

export const {setCollections} = mongoContentSlice.actions
export default mongoContentSlice.reducer