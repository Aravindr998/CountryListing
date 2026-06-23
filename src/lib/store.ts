import { configureStore } from '@reduxjs/toolkit'
import countryReducer from "./slice/countrySlice"

const reducer = {
    country: countryReducer
}

export const store = configureStore({
    reducer
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch