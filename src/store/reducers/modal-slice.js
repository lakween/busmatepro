import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState: {
        sendRequestModel:{
            isOpen:false
        }
    },
    reducers: {
        setModalState:(state,{payload}) => state = payload,
        setModalPoperty:(state,{payload}) => {
            state = state[payload.model][payload.poperty] = payload.value
        }
    },
})

export const { setModalState, setModalPoperty } = modalSlice.actions
export default modalSlice.reducer