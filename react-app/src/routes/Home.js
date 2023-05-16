import Ad from "../components/Ad";
import Find from "../components/Find";
import NavBar from "../components/NavBar";


const Home = () => {
    return (
        <>
            <NavBar/>
            <h1>Ogłoszenia</h1>
            <Find/>
            <Ad/>
        </>
    );
}

export default Home;