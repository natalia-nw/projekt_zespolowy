import Form from "../components/Form";
import { useState } from "react";
import ApiURL from "../ApiURL";
import HttpHeader from "../HttpHeader";
import { useNavigate } from "react-router-dom";

const NewItem = () => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [privDesc, setPrivDesc] = useState("");
    const [category, setCategory] = useState("");
    const [publicItem, setPublicItem] = useState(false);
    const [user, setUser] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const navigate = useNavigate();
    const addItem = async(e) => {
        e.preventDefault();
        setUser(sessionStorage.getItem('email'));
        fetch(`${ApiURL}/items/`, {
            method: 'POST',
            headers: HttpHeader,
            body: JSON.stringify({
                name: name,
                desc: desc,
                priv_desc: privDesc,
                category: category,
                public: publicItem,
                user: user,
                uploaded_images: uploadedImages,
            })
        })
        //navigate('/myItems');
        //window.location.reload(false);
    }
    const handleUploadFiles = (files) => {
        const uploaded = [...uploadedImages];
        let limitExceeded = false;
        files.some((file) => {
            if(uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if(uploaded.length === 5) setFileLimit(true);
                if(uploaded.length > 5) {
                    alert("Za dużo plików");
                    setFileLimit(true);
                    limitExceeded = true;
                    return true
                }
                
            }
        })
        if (!limitExceeded) setUploadedImages(uploaded);
    }
    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.value)
        handleUploadFiles(chosenFiles);
    }
    return (
        <Form h1={"Nowy przedmiot"} h2={"Dodaj nowy przedmiot, który chcesz wypożyczyć"} onSubmit={addItem}>
        <label>Zdjęcie</label>
        <input
        type="file"
        multiple
        accept="image/png"
        disabled={fileLimit}
        onChange={handleFileEvent}
        />
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
        <label>ogłoszenie publiczne</label>
            <input 
            type="checkbox"
            name="public" 
            checked={publicItem}
            onChange = {() => setPublicItem((state) => !state)}
            />
        <br/>
        <label>Użytkownik</label>
        {sessionStorage.getItem('email')}
        <button type="sumbit">Zatwierdź</button>
        {console.log(uploadedImages)}
    </Form>
    )
}

export default NewItem;