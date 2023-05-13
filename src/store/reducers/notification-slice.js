import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState: [],
    reducers: {
        setNotificationSlice:(state,{payload}) =>( state = [...state,payload])
    },
})

export const { setNotificationSlice } = notificationSlice.actions
export default notificationSlice.reducer