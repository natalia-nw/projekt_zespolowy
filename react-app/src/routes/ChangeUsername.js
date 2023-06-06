import Form from "../components/Form";
import HttpHeader from "../HttpHeader";
import ApiURL from "../ApiURL";
import { useNavigate} from "react-router-dom";
import { useState } from "react";

const ChangeUsername = () => {
    const [password, setPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [reNewEmail, setReNewEmail] = useState("");
    const navigate = useNavigate();
    const handleChange = async() => {
        fetch(`${ApiURL}/auth/users/set_email/`,{
            method: 'POST',
            headers: HttpHeader,
            body: JSON.stringify({
                current_password: password,
                new_email: newEmail,
                re_new_email: reNewEmail
            })
        })
        sessionStorage.setItem('email', newEmail);
        navigate('/mojProfil');
        window.location.reload(false);
        alert('Zmiana użytkownika przebiegła pomyślnie');
      }

    return (
        <Form h1="Nowa nazwa użytkownika" h2="Tu możesz ustawić nową nazwę użytkownika" onSubmit={handleChange}>
            <label>Obecne hasło</label>
            <input 
            type="password"
            name="current_password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <label>Nowa nazwa użytkownika</label>
            <input 
            type="email"
            name="new_email"
            onChange={(e) => setNewEmail(e.target.value)}
            />
            <label>Powtórz nową nazwę użytkownika</label>
            <input 
            type="email"
            name="re_new_email"
            onChange={(e) => setReNewEmail(e.target.value)}
            />
            <button type="submit">Zatwierdź</button>
        </Form>
    )
}
export default ChangeUsername;