import Form from "../components/Form";
import Link from "../components/Link";


const LogPage = () => {
    return (
        <>
            <Form h1={'Logowanie'} h2={'Zaloguj się do konta'}>
                <input
                type="text"
                name="email"
                placeholder="E-mail"
                required
                />
                <br/>
                <input
                type="password"
                name="password"
                placeholder="Hasło"
                aria-label="Password"
                required
                />              
                <button type="submit" class="contrast" onclick="event.preventDefault()">Wyślij</button>
                <Link label='Nie masz konta? Zarejestruj się' href='./registration'/>
                <Link label='Nie pamiętasz hasła?' href='/reminder'/>
            </Form>
        </>
    );
}

export default LogPage;