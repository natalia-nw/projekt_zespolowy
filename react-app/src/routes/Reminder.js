import NavBar from "../components/NavBar";
import Header from "../components/Header";

const Reminder = () => {
    return (
        <>
        <NavBar/>

    <main class="container">
      <article>
        <div>
          <Header h1={"Przypomnienie hasła"} h2={"Podaj swój adres e-mail, a my wyślemy ci nowe hasło!"}/>
          <form>
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              required
            />
            
            <button type="submit" class="contrast" onclick="event.preventDefault()">Wyślij</button>
          </form>
        </div>
      </article>
    </main>
    </>
    );
}

export default Reminder;