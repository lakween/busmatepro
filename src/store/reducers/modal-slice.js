import {createSlice} from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState: {
        sendRequestModel: {
            isOpen: false,
            data: {}
        },
        sendMessageModal: {
            isOpen: false,
            data: {}
        },
        sendReplyMessageModal: {
            isOpen: false,
            data: {}
        }
    },
    reducers: {
        setModalPoperty: (state, {payload}) => {
            state = state[payload.model][payload.poperty] = payload.value
        }
    },
})

export const {setModalPoperty} = modalSlice.actions
export default modalSlice.reducer