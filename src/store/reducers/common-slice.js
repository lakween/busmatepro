import { createSlice } from '@reduxjs/toolkit'

const commonSlice = createSlice({
    name: 'counter',
    initialState: {},
    reducers: {
        setCommonState:(state,{payload}) => state = payload
    },
})

export const { setCommonState } = commonSlice.actions
export default commonSlice.reducer