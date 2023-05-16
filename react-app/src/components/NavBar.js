const NavBar = () => {
    return (
    <nav class="container-fluid">
        <ul>
            <li>
                <a href="/" class="contrast" onclick="event.preventDefault()"><strong>Strona główna</strong></a>
            </li>
        </ul>
        <ul>
            <li>
                <a href="/auth/login" onclick="event.preventDefault()">Zaloguj się</a>
            </li>
            <li>
                <a href="/auth/registration" onclick="event.preventDefault()">Zarejestruj się</a>
            </li>
        </ul>
    </nav>
    );
}

export default NavBar;