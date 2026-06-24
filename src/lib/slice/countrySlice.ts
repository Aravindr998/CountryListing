import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Country } from "../../types/api.types"

interface CountryInitialState {
    countries: Country[];
    loading: boolean
}

const initialState: CountryInitialState = {
    countries: [],
    loading: false,
}

const getCountries = async ({offset, filter}: {offset: number, filter: string | null}) => {
    let url = `https://countries.dev/countries?fields=name,flags,region&limit=10&offset=${offset}`
    if (filter && filter !== "all") {
        url = `https://countries.dev/region/${filter}?fields=name,flags,region&limit=10&offset=${offset}`
    }
    const response = await fetch(url)
    const data: Country[] = await response.json()
    return data
}

export const fetchCountries = createAsyncThunk("country/fetchCountries", getCountries)

export const loadMoreCountries = createAsyncThunk("country/loadMoreCountries", getCountries)

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        clearCountries: (state) => {
            state.countries = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCountries.fulfilled, (state, action) => {
            state.loading = false
            state.countries = action.payload
        })
        builder.addCase(fetchCountries.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCountries.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(loadMoreCountries.fulfilled, (state, action) => {
            state.loading = false
            state.countries = [...state.countries, ...action.payload]
        })
        builder.addCase(loadMoreCountries.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loadMoreCountries.rejected, (state) => {
            state.loading = false
        })
    }
})

export const { clearCountries } = countrySlice.actions
export default countrySlice.reducer