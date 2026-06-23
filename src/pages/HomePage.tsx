import CountryList from "../components/CountryList";
import Header from "../components/Header";
import HomeSlider from "../components/HomeSlider";
import Welcome from "../components/Welcome";

const HomePage = () => {
    return <div className="p-20">
        <Header />
        <Welcome />
        <HomeSlider />
        <CountryList />
    </div>
}

export default HomePage