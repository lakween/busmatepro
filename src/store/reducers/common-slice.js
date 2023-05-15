import { createSlice } from '@reduxjs/toolkit'

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState: {
        yourBusArrive:{}
    },
    reducers: {
        setCommonState:(state,{payload}) =>( state = {...state,yourBusArrive:payload?.yourBusArrive})
    },
})

export const { setCommonState } = commonSlice.actions
export default commonSlice.reducer