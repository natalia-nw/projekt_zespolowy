import Form from "../components/Form";
import HttpHeader from "../HttpHeader";
import ApiURL from "../ApiURL";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ChangePassowrd = () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");
    const navigate = useNavigate();
    const handleChange = async() => {
        fetch(`${ApiURL}/auth/users/set_password/`,{
            method: 'POST',
            headers: HttpHeader,
            body: JSON.stringify({
                current_password: password,
                new_password: newPassword,
                re_new_password: reNewPassword
            })
        })
        .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        navigate('/mojProfil');
      }
    return (
        <Form h1="Nowe hasło" h2="Tu możesz ustawić nowe hasło" onSubmit={handleChange}>
            <label>Obecne hasło</label>
            <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <label>Nowe hasło</label>
            <input 
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>Powtórz nowe hasło</label>
            <input 
            type="password"
            onChange={(e) => setReNewPassword(e.target.value)}
            />
            <button type="submit">Zatwierdź</button>
        </Form>
    )
}
export default ChangePassowrd;