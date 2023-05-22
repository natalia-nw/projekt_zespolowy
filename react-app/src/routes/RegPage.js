import Link from "../components/Link";
import Form from "../components/Form";

const RegPage = () => {
    return (
    <>
        <Form h1={'Rejestracja'} h2={'Zajmie ci to tylko chwilę!'}>
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
        </Form>
    </>
    );
}

export default RegPage;