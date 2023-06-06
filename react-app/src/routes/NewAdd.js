import Form from "../components/Form";
import { useState } from "react";
import ApiURL from "../ApiURL";

const NewAdd = () => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [privDesc, setPrivDesc] = useState("");
    const [category, setCategory] = useState("");
    const [user, setUser] = useState("");
    const addAdd = async(e) => {
        e.preventDefault();
        setUser(sessionStorage.setItem('email'));
        fetch(`${ApiURL}/items/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                desc: desc,
                priv_desc: privDesc,
                category: category,
                public: true,
                user: user
            })
        })
    }
    return (
        <Form h1={"Nowe ogłoszenie"} h2={"Dodaj ogłoszenie o przedmiocie, który chcesz wypożyczyć"} onSubmit={addAdd}>
        <label>Nazwa</label>
        <input 
        type="text" 
        name="name"
        value={name}
        onChange={(e) => {setName(e.target.value)}}/>
        <label>Opis</label>
        <textarea 
        name="desc"
        value={desc}
        onChange={(e) => {setDesc(e.target.value)}}
        />
        <label>Opis prywatny</label>
        <textarea 
        name="priv_desc"
        value={privDesc}
        onChange={(e) => {setPrivDesc(e.target.value)}}
        />
        <label>Kategoria</label>
        <select 
        name="category"
        value={category}
        onChange={(e) => {setCategory(e.target.value)}}
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
        <label>Użytkownik</label>
        {sessionStorage.getItem('email')}
        <button type="sumbit">Zatwierdź</button>
    </Form>
    )
}

export default NewAdd;