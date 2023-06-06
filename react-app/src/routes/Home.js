import { useState, useEffect} from "react";
import Element from "../components/Element";
//import Find from "../components/Find";
import Headers from "../components/Headers";
import Button from "../components/Button";
import ApiURL from "../ApiURL";
import { useNavigate} from "react-router-dom";
import HttpHeader from "../HttpHeader";
import session from "../session";
import Describe from "../components/Describe";

const Home = () => {
    const [adds, setAdds] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    //const [search, setSearch] = useState(false);
    //const searchRef = useRef(search);
    const navigate = useNavigate();
    useEffect(() => {
    //if (!searchRef.current)
    //{
        fetch(`${ApiURL}/items/public`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setAdds(data.results)
        })
    //}
    }, [])
    useEffect(() => {
        if (session === 'true')
        {
            fetch(`${ApiURL}/auth/users/me`, {
                method: 'GET',
                headers: HttpHeader
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setId(data.id)
                sessionStorage.setItem('id', id);
            })
        }
    }, [id])
    const AgreementRequest = (id) => {
        sessionStorage.setItem("ItemId", id);
        navigate("/chceWypozyczyc");
    }
    const searchIt =() => {
        fetch(`${ApiURL}/items/public?search=${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            return response.json()
        })
    }
    return (
        <>
            <h1>Ogłoszenia</h1>
            <main className="container">
                <form onSubmit={searchIt}>
                    <input 
                    type="search" 
                    name="search"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    />
                </form>
            </main>
            <Button label={"Nowe ogłoszenie"} href={"/noweOgloszenie"}/>
            <ul>
                {adds.length > 0 ? (
                adds.map((add) => 
                <Element id={add.id}>
                   <Headers h1={add.name}/>
                        {add.images.map((image) => 
                        <img src={image.image} alt='obrazek'/>)}
                        <Describe category={add.category} desc={add.desc}/>
                    {id !== add.user ?
                    <>
                        <form onSubmit={() => AgreementRequest(add.id)}>
                            <button type="submit" className="agreement">Poproś o wypożyczenie</button>
                        </form>
                    </>  : null}
                </Element>
                )) : (
                <h1>Nie ma jeszcze żadnych ogłoszeń</h1>
                )}
            </ul>
        </>
    );
}

export default Home;