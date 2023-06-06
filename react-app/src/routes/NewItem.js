import Form from "../components/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiURL from "../ApiURL";

const NewItem = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [privDesc, setPrivDesc] = useState("");
  const [category, setCategory] = useState("");
  const [publicItem, setPublicItem] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);

  const navigate = useNavigate();

  const addItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("priv_desc", privDesc);
    formData.append("user", sessionStorage.getItem("id"));
    formData.append("category", category);
    formData.append("public", publicItem);

    for (let i = 0; i < images.length; i++) {
      formData.append("uploaded_images", images[i]);
    }

    try {
      await fetch(`${ApiURL}/items/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        body: formData,
      });
      navigate("/przedmioty");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const imagesUrl = files.map((file) => URL.createObjectURL(file));
    setImagesUrl(imagesUrl);
  };

  return (
    <Form
      h1={"Nowy przedmiot"}
      h2={"Dodaj nowy przedmiot, który chcesz wypożyczyć"}
      onSubmit={addItem}
    >
      <label>Zdjęcie</label>
      <input 
      type="file" 
      name="uploaded_images"
      multiple onChange={handleImageChange} />
      {imagesUrl.map((imageUrl) => (
        <img src={imageUrl} alt="brak" key={imageUrl} />
      ))}
      <label>Nazwa</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label>Opis</label>
      <textarea
        name="desc"
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
      <label>Opis prywatny</label>
      <textarea
        name="priv_desc"
        value={privDesc}
        onChange={(e) => {
          setPrivDesc(e.target.value);
        }}
      />
      <label>Kategoria</label>
      <select
        name="category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="">--------</option>
        <option value="Książki">Książki</option>
        <option value="Filmy, seriale">Filmy, seriale</option>
        <option value="Gry wideo">Gry wideo</option>
        <option value="Gry planszowe, karciane">Gry planszowe, karciane</option>
        <option value="Sport">Sport</option>
        <option value="Elektronika">Elektronika</option>
        <option value="Narzędzia">Narzędzia</option>
        <option value="Muzyka">Muzyka</option>
        <option value="Zabawki">Zabawki</option>
        <option value="Akcesoria na imprezy">Akcesoria na imprezy</option>
        <option value="Akcesoria dla dzieci">Akcesoria dla dzieci</option>
        <option value="Inne">Inne</option>
      </select>
      <label>Ogłoszenie publiczne</label>
      <input
        type="checkbox"
        name="public"
        checked={publicItem}
        onChange={() => setPublicItem((state) => !state)}
      />
      <br />
      <label>Użytkownik</label>
      {sessionStorage.getItem("email")}
      <button type="submit">Zatwierdź</button>
      {console.log("images", images)}
      {console.log("urls", imagesUrl)}
    </Form>
  );
};

export default NewItem;
