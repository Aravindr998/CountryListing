import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    countries: [],
    loading: false,
    filter: "all"
}

export const fetchCountries = createAsyncThunk("country/fetchCountries", async(offset: number, thunkApi) => {
    let url = `https://api.restcountries.com/countries/v5?response_fields=names.common%2Cregion%2Cflag.url_png&limit=24&offset=${offset}`
    const filter = thunkApi.getState().country?.filter
    console.log(filter, "filter")
    if (filter !== "all") {
        url+= `?region=${filter}`
    }
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_REST_COUNTRIES_API_KEY}`
        }
    })
    const data = await response.json()
    return data
})

export const loadMoreCountries = createAsyncThunk("country/loadMoreCountries", async(offset: number) => {
    let url = `https://api.restcountries.com/countries/v5?response_fields=names.common%2Cregion%2Cflag.url_png&limit=24&offset=${offset}`
    const filter = thunkApi.getState().country?.filter
    if (filter !== "all") {
        url+= `?region=${filter}`
    }
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_REST_COUNTRIES_API_KEY}`
        }
    })
    const data = await response.json()
    return data
})

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        clearCountries: (state) => {
            state.countries = []
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCountries.fulfilled, (state, action) => {
            state.loading = false
            state.countries = action.payload.data.objects
        })
        builder.addCase(fetchCountries.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCountries.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(loadMoreCountries.fulfilled, (state, action) => {
            state.loading = false
            state.countries = [...state.countries, ...action.payload.data.objects]
        })
        builder.addCase(loadMoreCountries.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loadMoreCountries.rejected, (state) => {
            state.loading = false
        })
    }
})

export const { clearCountries, setFilter } = countrySlice.actions
export default countrySlice.reducer