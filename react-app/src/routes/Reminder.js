import Form from "../components/Form";

const Reminder = () => {
    return (
      <>
        <Form h1={'Przypomnienie hasła'} h2={'Podaj swój adres e-mail, a my wyślemy ci nowe hasło!'}>
          <input
          type="text"
          name="email"
          placeholder="E-mail"
          required
          />
          <button type="submit" class="contrast" onclick="event.preventDefault()">Wyślij</button>
        </Form>
      </>
    );
}

export default Reminder;