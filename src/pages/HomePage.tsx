import CountryList from "../components/CountryList";
import Header from "../components/Header";
import HomeSlider from "../components/HomeSlider";
import Welcome from "../components/Welcome";

const HomePage = () => {
    return <div className="p-20">
        <Header />
        <Welcome />
        <div className="mt-5 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[4fr_1fr]">
            <HomeSlider />
            <img
                src="https://picsum.photos/200/100"
                className="order-first w-full object-cover sm:order-0"
            />
        </div>
        <CountryList />
    </div>
}

export default HomePage
