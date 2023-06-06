import Form from "../components/Form";
import Link from "../components/Link";
import ApiURL from "../ApiURL";
//import session from "../session";
import { useState, useEffect, useRef} from "react";
//import AuthContext from "../context/AutoProvider";
//import LoginContext from "../context/LoginContext";
import { useNavigate} from "react-router-dom";


const LogPage = () => {
    //const [loggedIn, setLoggedIn] = useContext(AuthContext);
    //const {setAuth} = useContext(AuthContext);
    //const {setLoggedIn} = useContext(LoginContext);
    const userRef = useRef();
    //const errRef = useRef();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            /*const response = await axios.post(LOGIN_URL, 
                JSON.stringify({user, password, repassword}),
                {
                    headers: { 'Context-Type': 'application/json'},
                    withCredentials: true
                }
            );*/
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
            /*.then(response => {
                return response.json()
            })
            .then(data => {
                setToken(data.auth_token);
                sessionStorage.setItem('Token', token);
                console.log("token=", sessionStorage.getItem('Token'));
            })*/
           if (response.ok)
            {
                sessionStorage.setItem('isLogged', 'true');
                const data = await response.json();
                sessionStorage.setItem('Token', data.auth_token);
                sessionStorage.setItem('email', email);
                navigate("/");
                window.location.reload(false);
            }
            else
            {
                setErrMsg('Błędne dane logowania');
            }
            //console.log(JSON.stringify(response?.data));
            //const accessToken = response?.data.accessToken;
            //const roles = response?.data.roles;
            //setAuth({user, password, accessToken});
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
            //errRef.current.focus();
        }
        /*console.log(user, password, repassword);
        axios.post(`${apiUrl}auth/login`, {
            username: user,
            password: password,
            re_password: repassword
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
          });*/
    }
    useEffect(() => {
        userRef.current.focus();
    }, [])
    useEffect(() => {
        setErrMsg('')
    }, [email, password])
    return (
        <>
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
                <button type="submit" className="contrast">Wyślij</button>
                <Link label='Nie masz konta? Zarejestruj się' href='./registration'/>
                <Link label='Nie pamiętasz hasła?' href='/reminder'/>
                {errMsg && <p>{errMsg}</p>}
            </Form>
        </>
    );
}

export default LogPage;