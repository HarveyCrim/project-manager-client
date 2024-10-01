import {createSlice, PayloadAction} from "@reduxjs/toolkit"
type initialStateType = {
    isDarK: boolean,
    isSidebar: boolean
}
const initialState:initialStateType = {
    isDarK: false,
    isSidebar: false
}
const globalSlice = createSlice({
    name: "globalSlice",
    initialState,
    reducers: {
        setIsDark: (state, action: PayloadAction<boolean>) => {
            state.isDarK = action.payload
        },
        setIsSidebar: (state, action: PayloadAction<boolean>) => {
            state.isSidebar = action.payload
        }
    }
})

export const {setIsDark, setIsSidebar} = globalSlice.actions
export default globalSlice.reducer