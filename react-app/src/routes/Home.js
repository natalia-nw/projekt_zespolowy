import Ad from "../components/Ad";
import Find from "../components/Find";
import Header from "../components/Header";
import NavBar from "../components/NavBar";


const Home = () => {
    return (
        <>
            <NavBar/>
            <Header title='Ogłoszenia'/>
            <Find/>
            <Ad/>
        </>
    );
}

export default Home;