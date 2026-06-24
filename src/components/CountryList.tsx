import { useEffect, useRef } from "react"
import { clearCountries, fetchCountries, loadMoreCountries } from "../lib/slice/countrySlice"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"
import { useSearchParams } from "react-router"

const CountryList = () => {
    const currentOffsetRef = useRef(0)
    const dispatch = useAppDispatch()
    const { countries, loading } = useAppSelector(state => state.country)
    const [searchParams] = useSearchParams()
    const filter = searchParams.get("filter")

    useEffect(() => {
        currentOffsetRef.current = 0
        dispatch(fetchCountries({ filter, offset: 0 }))
        return () => {
            dispatch(clearCountries())
        }
    }, [filter, dispatch])

    const handleLoadMore = () => {
        if (loading) return
        currentOffsetRef.current += 10
        dispatch(loadMoreCountries({ filter, offset: currentOffsetRef.current }))
    }

    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {
                countries?.map(item => {
                    return (
                        <div className="flex gap-5 items-center p-5 border-2 shadow-xl" key={item?.name}>
                            <img className="w-10" src={item?.flags?.png} />
                            <div>
                                <p>{item?.name}</p>
                                <p>{item?.region}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className="w-full flex justify-center">
            <button className="bg-[#3C3C3C] px-5 py-2 text-white mt-5" onClick={handleLoadMore}>{loading ? "Loading..." : "Load More"}</button>
        </div>
    </>
}

export default CountryList