import Element from "../components/Element";
import Headers from "../components/Headers";
import odkurzacz from "../img/odkurzacz.jpg";
import ApiURL from "../ApiURL";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate} from "react-router-dom";
import HttpHeader from "../HttpHeader";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";

const MyItems = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const goEdit = (id) => {
        sessionStorage.setItem("ItemId", id);
        navigate("/EditItem");
    }
    const deleteItem = (id) => {
        fetch(`${ApiURL}/items/${id}`, {
            method: 'DELETE',
            headers: HttpHeader,
        })

    }
    const HireIt = (id) => { 
        sessionStorage.setItem("ItemId", id);
        navigate("/NewAgreement");
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
            <Headers h1={"Moje przedmioty"}/>
            <Button label={"Nowy przedmiot"} href={"newItem"}/>
            <ul>
                {items.length > 0 ? (
                    items.map((item) =>
                    <Element id={item.id}>
                        <DeleteButton fn={() => deleteItem(item.id)}/>
                        <EditButton fn={() => goEdit(item.id)}/>
                        <Headers h1={item.name}/>
                        <img src={odkurzacz} alt='obrazek'/>
                        <div className='hire-item'>
                            <p>Opis: {item.desc}</p>
                            <p>Opis prywatny: {item.priv_desc}</p>
                            <p>Kategoria: {item.category}</p>
                            <p>Czy publiczny? {item.public ? 'tak' : 'nie'}</p>
                        </div>
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