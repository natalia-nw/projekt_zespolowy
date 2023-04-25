import NavBar from "../components/NavBar";

const Reminder = () => {
    return (
        <>
        <NavBar/>

    <main class="container">
      <article>
        <div>
          <hgroup>
            <h1>Przypomnienie hasła</h1>
            <h2>Podaj swój adres e-mail, a my wyślemy ci nowe hasło!</h2>
          </hgroup>
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