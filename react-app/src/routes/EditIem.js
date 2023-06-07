import Form from "../components/Form";
import ApiURL from "../ApiURL";
import { useEffect, useState } from "react";
import HttpHeader from "../HttpHeader";
import { useNavigate } from "react-router-dom";

const EditItem = () => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [privDesc, setPrivDesc] = useState("");
    const [category, setCategory] = useState("");
    const [publicItem, setPublicItem] = useState(false);
    const [user, setUser] = useState(sessionStorage.getItem('email'));
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${ApiURL}/items/${sessionStorage.getItem("ItemId")}`, {
            method: 'GET',
            headers: HttpHeader
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setName(data.name);
            setDesc(data.desc);
            setPrivDesc(data.priv_desc);
            setCategory(data.category);
            setPublicItem(data.public);
            setUser(data.user);
        })
    }, [])
    const handleEdit = () => {
        fetch(`${ApiURL}/items/${sessionStorage.getItem("ItemId")}`, {
            method: 'PUT',
            headers: HttpHeader,
            body: JSON.stringify({
                name: name,
                desc: desc,
                priv_desc: privDesc,
                category: category,
                public: publicItem,
                user: user,
            })
        })
        navigate("/przedmioty");
        window.location.reload(false);
        alert("Zmieniono pomyślnie");
    }
    return (
        <Form h1={"Edytuj przedmiot"} h2={"Edytuj dane o przedmiocie"} onSubmit={handleEdit}>
            <label>Nazwa</label>
            <input 
            type="text" 
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}/>
            <label>Opis</label>
            <textarea 
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            />
            <label>Opis prywatny</label>
            <textarea 
            name="priv_desc"
            value={privDesc}
            onChange={(e) => setPrivDesc(e.target.value)}
            />
            <label>Kategoria</label>
            <select 
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">--------</option>
                <option value="Książki"  >Książki</option>           
                <option value="Filmy, seriale"  >Filmy, seriale</option>      
                <option value="Gry wideo"  >Gry wideo</option>           
                <option value="Gry planszowe, karciane"  >Gry planszowe, karciane</option>
                <option value="Sport"  >Sport</option>
                <option value="Elektronika"  >Elektronika</option>
                <option value="Narzędzia"  >Narzędzia</option>
                <option value="Muzyka"  >Muzyka</option>
                <option value="Zabawki"  >Zabawki</option>
                <option value="Akcesoria na imprezy"  >Akcesoria na imprezy</option>
                <option value="Akcesoria dla dzieci"  >Akcesoria dla dzieci</option>
                <option value="Inne"  >Inne</option>
            </select>
            <label>ogłoszenie publiczne</label>
            <input 
            type="checkbox"
            name="public" 
            checked={publicItem}
            onChange = {() => setPublicItem((state) => !state)}
            />
            <br/>
            {console.log(publicItem)}
            <label>Użytkownik</label>
            {sessionStorage.getItem('email')}
            <button type="sumbit">Zatwierdź</button>
        </Form>
    )
}

export default EditItem;
