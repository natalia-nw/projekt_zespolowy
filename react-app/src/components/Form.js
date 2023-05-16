import Header from './Header';
import Link from './Link';

const Form = () => {
    return (
        <main class="container">
            <article>
                <div>
                    <Header h1='Logowanie' h2='Zaloguj się do konta'/>
                    <form>
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
                    </form>
                </div>
            </article>
        </main>
    );
}

export default Form;