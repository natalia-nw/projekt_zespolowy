import Form from "./Form"

const AddForm = (props, name, setName, desc, setDesc, privDesc, setPrivDesc, category, setCategory, fn) => {
    return (
        <Form h1={"Nowy przedmiot"} h2={"Dodaj nowy przedmiot, który chcesz wypożyczyć"} onSubmit={fn}>
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
            {props.children}
            <label>Użytkownik</label>
            {sessionStorage.getItem('email')}
            <button type="sumbit">Zatwierdź</button>
        </Form>
    )
}

export default AddForm;