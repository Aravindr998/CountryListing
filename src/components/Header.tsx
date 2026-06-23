import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"
import { fetchCountries, setFilter } from "../lib/slice/countrySlice"

const selectedClass = "border-b-2 border-[#3D3D3D]"
const Header = () => {
    const {filter} = useAppSelector(state => state.country)
    const dispatch = useAppDispatch()

    const handleClick = (filter: string) => {
        dispatch(setFilter(filter))
        dispatch(fetchCountries(0))
    }
    return(
        <div className="text-[#3D3D3D] fixed top-0 left-0 right-0 h-15 flex justify-between z-10 bg-white pb-5 px-20">
            <p className="noto-sans-700 text-xl">Countries</p>
            <div className="flex gap-5">
                <button className={`${filter === "all" ? selectedClass : ""} flex-1 py-5 pe-5`} onClick={() => handleClick("all")}>
                    All
                </button>
                <button className={`${filter === "Asia" ? selectedClass : ""} flex-1 py-5 pe-5`} onClick={() => handleClick("Asia")}>
                    Asia
                </button>
                <button className={`${filter === "Europe" ? selectedClass : ""} flex-1 py-5 pe-5`} onClick={() => handleClick("Europe")}>
                    Europe
                </button>
            </div>
        </div>
    )
}

export default Header