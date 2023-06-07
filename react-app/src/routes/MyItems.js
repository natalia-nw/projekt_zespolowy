import Element from "../components/Element";
import Headers from "../components/Headers";
import ApiURL from "../ApiURL";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate} from "react-router-dom";
import HttpHeader from "../HttpHeader";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import Describe from "../components/Describe";

const MyItems = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const goEdit = (id) => {
        sessionStorage.setItem("ItemId", id);
        navigate("/edytujPrzedmiot");
    }
    const deleteItem = (id) => {
        fetch(`${ApiURL}/items/${id}`, {
            method: 'DELETE',
            headers: HttpHeader,
        })
        window.location.reload(false);
        alert('Usunięto pomyślnie!')

    }
    const HireIt = (id) => { 
        sessionStorage.setItem("ItemId", id);
        navigate("/noweWypozyczenie");
    }

    useEffect(() => {
        fetch(`${ApiURL}/items/`, {
            method: 'GET',
            headers: HttpHeader,
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setItems(data.results)
        })
    }, [])
    return (
        <>
            <h1 className="title">Moje przedmioty</h1>
            <div class="title"><Button label={"Dodaj nowy przedmiot"} href={"/nowyPrzedmiot"}/></div>
            <ul>
                {items.length > 0 ? (
                    items.map((item) =>
                    <Element id={item.id}>
                        <DeleteButton fn={() => deleteItem(item.id)}/>
                        <EditButton fn={() => goEdit(item.id)}/>
                        <Headers h1={item.name}/>
                        {item.images.map((image) => 
                        <a href={image.image}><img src={image.image} alt='obrazek'/></a>)}
                        <Describe category={item.category} desc={item.desc}>
                            <p>Opis prywatny: {item.priv_desc}</p>
                            <p>Czy publiczny? {item.public ? 'tak' : 'nie'}</p>
                        </Describe>
                        <button className="agreement" onClick={() => HireIt(item.id)}>Wypożycz</button>
                    {console.log(item.name, item.id)}
                    </Element>
                        )): (
                    <h1>Brak przedmiotów</h1>
                    )}
            </ul>
        </>
    ); 
}

export default MyItems;