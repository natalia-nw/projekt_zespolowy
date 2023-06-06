import session from "../session";

const NavBar = () => {
    return (
    <nav>
        <ul>
            <li>
                <a href="/" className="contrast"><strong>Strona główna</strong></a>
            </li>
            <li>
                <a href="/wypozyczenia" className="contrast">Moje wypożyczenia</a>
            </li>
            <li>
                <a href="/przedmioty" className="contrast">Moje przedmioty</a>
            </li>
        </ul>
        <ul>
            <li>
                <a href="/mojProfil" className="contrast">{session === 'true' ? `Profil: ${sessionStorage.getItem('email')}` : ''}</a>
            </li>
            <li>
                {console.log("session=", session)}
                {console.log("token=", sessionStorage.getItem('Token'))}
                {console.log(sessionStorage.getItem('email'))}
                {console.log(sessionStorage.getItem('id'))}
            </li>
            <li>
                <a href="/logowanie" onClick={() => {sessionStorage.setItem('isLogged', 'false'); sessionStorage.setItem('Token', ''); sessionStorage.setItem('email', '');}}> {session === 'true' ? 'Wyloguj się' : 'Zaloguj się'} </a>
            </li>
            <li>
                <a href="/rejestracja"> {session === 'true' ? '' : 'Zarejestruj się'}</a>
            </li>
        </ul>
    </nav>
    );
}

export default NavBar;