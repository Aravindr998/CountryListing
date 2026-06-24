import { useSearchParams } from "react-router";

const selectedClass = "border-b-2 border-[#3D3D3D]"
const Header = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter")

    const handleClick = (filter: string) => {
        setSearchParams({filter})
    }

    return(
        <div className="text-[#3D3D3D] fixed top-0 left-0 right-0 h-15 flex justify-between z-10 bg-white pb-5 px-20">
            <p className="noto-sans-700 text-xl p-2">Countries</p>
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