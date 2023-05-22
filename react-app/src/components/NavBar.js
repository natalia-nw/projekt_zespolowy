const NavBar = () => {
    return (
    <nav>
        <ul>
            <li>
                <a href="/" class="contrast" onclick="event.preventDefault()"><strong>Strona główna</strong></a>
            </li>
            <li>
                <a href="/my_hires" class="contrast" onclick="event.preventDefault()">Moje wypożyczenia</a>
            </li>
            <li>
                <a href="/my_items" class="contrast" onclick="event.preventDefault()">Moje przedmioty</a>
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