import NavBar from "../components/NavBar";

const RegPage = () => {
    return (
    <>
        <NavBar/>

        <main class="container">
        <article>
            <div>
            <hgroup>
                <h1>Rejestracja</h1>
                <h2>Zajmie ci to tylko chwilę!</h2>
            </hgroup>
            <form>
                <input
                type="text"
                name="username"
                placeholder="Nazwa użytkownika"
                aria-label="Login"
                required
                />
                <input
                type="email"
                name="email"
                placeholder="E-mail"
                aria-label="Email"
                required
                />
                <input
                type="password"
                name="password"
                placeholder="Hasło"
                aria-label="Password"
                required
                />
                <button type="submit" class="contrast" onclick="event.preventDefault()">Zarejestruj się</button>
                <a href="/auth/login" class="secondary" onclick="event.preventDefault()">Masz już konto? Zaloguj się!</a>
            </form>
            </div>
        </article>
        </main>
    </>
    );
}

export default RegPage;