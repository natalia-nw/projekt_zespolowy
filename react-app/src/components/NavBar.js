//import { useContext, useState } from "react";
import session from "../session";

const NavBar = () => {
    //const {loggedIn, setLoggedIn} = useState(session);
    return (
    <nav>
        <ul>
            <li>
                <a href="/" className="contrast"><strong>Strona główna</strong></a>
            </li>
            <li>
                <a href="/myAgreements" className="contrast">Moje wypożyczenia</a>
            </li>
            <li>
                <a href="/myItems" className="contrast">Moje przedmioty</a>
            </li>
        </ul>
        <ul>
            <li>
                <a href="/myProfile" className="contrast">{session === 'true' ? `Profil: ${sessionStorage.getItem('email')}` : ''}</a>
            </li>
            <li>
                {console.log("session=", session)}
                {console.log("token=", sessionStorage.getItem('Token'))}
                {console.log(sessionStorage.getItem('email'))}
                {console.log(sessionStorage.getItem('id'))}
            </li>
            <li>
                <a href="/auth/login" onClick={() => {sessionStorage.setItem('isLogged', 'false'); sessionStorage.setItem('Token', '');}}> {session==='true' ? 'Wyloguj się' : 'Zaloguj się'} </a>
            </li>
            <li>
                <a href="/auth/registration"> {session==='true' ? '' : 'Zarejestruj się'}</a>
            </li>
        </ul>
    </nav>
    );
}

export default NavBar;