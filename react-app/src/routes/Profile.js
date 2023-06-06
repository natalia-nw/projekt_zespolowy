import { useState, useEffect } from "react";
import HttpHeader from "../HttpHeader";
import ApiURL from "../ApiURL";
import Form from "../components/Form";
import axios from "axios";
import Button from "../components/Button";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append("id", sessionStorage.getItem("id"));
    formData.append("email", sessionStorage.getItem("email"));
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone_number", phoneNumber);
    formData.append("bio", bio);
    if (image !== null) {
      formData.append("image", image);
    }
    try {
      await axios.put(`${ApiURL}/auth/users/me/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  useEffect(() => {
    fetch(`${ApiURL}/auth/users/me/`, {
      method: "GET",
      headers: HttpHeader,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhoneNumber(data.phone_number);
        setBio(data.bio);
        setImageUrl(data.image);
        sessionStorage.setItem('email', data.email);
      });

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <Form h1={"Mój profil"} h2={"Tu możesz ustawić swoje dane"} onSubmit={handleEdit}>
      <label>Imię</label>
      <input
        type="text"
        name="first_name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label>Nazwisko</label>
      <input
        type="text"
        name="last_name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label>Nr telefonu</label>
      <input
        type="text"
        name="phone_number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <label>Biogram</label>
      <input
        type="text"
        name="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <label>Zdjęcie</label>
      <input type="file" name="image" onChange={handleImageChange} />
      {imageUrl && <img src={imageUrl} alt="brak" />}
      <button type="submit">Zatwierdź</button>
      {console.log(image)}
      <div class="title"><Button label={"Zmień nazwę użytkownika"} href={"/zmienNazweUzytkownika"}/><Button label={"Zmień hasło"} href={"/zmienHaslo"}/></div>
      
    </Form>
  );
};

export default Profile;
