import '../styles/app.css';
import Button from './Button';
import Header from './Header';
import Input from './Input';

const Form = () => {
    return (
        <article>
            <div>
                <form>
                    <Header/>
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
                </form>
            </div>
      </article>
    );
}

export default Form;