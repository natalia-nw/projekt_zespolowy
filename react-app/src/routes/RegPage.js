import Link from "../components/Link";
import Form from "../components/Form";
import ApiURL from "../ApiURL";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const createAccount = async(e) => {
        e.preventDefault();
        try {
            fetch(`${ApiURL}/auth/users/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                password: password,
                re_password: rePassword,
              }),
            });
              navigate("/logowanie");
              alert("Udało się utworzyć konto! Sprawdź skrzynkę mailową");
          } 
          catch (error) {
            console.error(error);
            setErrMsg("Wystąpił błąd podczas tworzenia konta");
          }
    }
    return (
    <>
        {errMsg && <p className="message">{errMsg}</p>}
        <Form h1={'Rejestracja'} h2={'Zajmie ci to tylko chwilę!'} onSubmit={createAccount}>
            <input
            type="email"
            name="email"
            placeholder="E-mail"
            aria-label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            name="password"
            placeholder="Hasło"
            aria-label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <input
            type="password"
            name="re_password"
            placeholder="Powtórz hasło"
            aria-label="Password"
            onChange={(e) => setRePassword(e.target.value)}
            required
            />
            <button type="submit" className="contrast">Zarejestruj się</button>
            <Link label='Masz już konto? Zaloguj się!' href='/logowanie'/>
        </Form>
    </>
    );
}

export default RegPage;