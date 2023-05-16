import NavBar from "../components/NavBar";
import Link from "../components/Link";
import Header from "../components/Header";

const RegPage = () => {
    return (
    <>
        <NavBar/>
        <main class="container">
            <article class='grid'>
                <div>
                    <Header h1={"Rejestracja"} h2={"Zajmie ci to tylko chwilę!"}/>
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
                        <Link label='Masz już konto? Zaloguj się!' href='/auth/login'/>
                    </form>
                </div>
            </article>
        </main>
    </>
    );
}

export default RegPage;