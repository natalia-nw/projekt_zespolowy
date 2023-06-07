import Form from "../components/Form";
import Link from "../components/Link";
import ApiURL from "../ApiURL";
import { useState, useEffect, useRef} from "react";
import { useNavigate} from "react-router-dom";
import session from "../session";


const LogPage = () => {
    const userRef = useRef();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    useEffect(() => {
        if (session === "true") {
          navigate("/"); 
        }
    }, [navigate]);
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${ApiURL}/auth/token/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
            })
           if (response.ok)
            {
                sessionStorage.setItem('isLogged', 'true');
                const data = await response.json();
                sessionStorage.setItem('Token', data.auth_token);
                sessionStorage.setItem('email', email);
                navigate("/", { replace: true });
                window.location.reload(false);
            }
            else
            {
                setErrMsg('Błędne dane logowania');
            }
        } catch (err) {
            if (!err.response) {
                setErrMsg('Brak odpowiedzi od serwera');
            } else if (err.response?.status === 400){
                setErrMsg('Brak e-maila lub hasła');
            } else if (err.response?.status === 401){
                setErrMsg('Brak autoryzacji');
            } else {
                setErrMsg('Logowanie nie powiodło się');
            }
        }
    }
    useEffect(() => {
        userRef.current.focus();
    }, [])
    useEffect(() => {
        setErrMsg('')
    }, [email, password])
    return (
        <>
            {errMsg && <p className="message">{errMsg}</p>}
            <Form h1={'Logowanie'} h2={'Zaloguj się do konta'} onSubmit={handleLogin}>
                <input
                type="text"
                name="email"
                placeholder="E-mail"
                ref={userRef}
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
                <br/>             
                <button type="submit" className="contrast">Zaloguj się</button>
                <Link label='Nie masz konta? Zarejestruj się' href='./rejestracja'/>
                <Link label='Nie pamiętasz hasła?' href='/przypomnijHaslo'/>
            </Form>
        </>
    );
}

export default LogPage;