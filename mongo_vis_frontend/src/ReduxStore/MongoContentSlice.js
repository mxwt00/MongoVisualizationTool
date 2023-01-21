import {createSlice} from "@reduxjs/toolkit";

export const mongoContentSlice = createSlice({
    name: 'mongoContent',
    initialState: {
        documents: null
    },
    reducers: {
        setDocuments: (state, documents) => {
            state.documents = documents
        }
    }
})

export const {setDocuments} = mongoContentSlice.actions
export default mongoContentSlice.reducer