import Form from "../components/Form";
import ApiURL from "../ApiURL";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import session from "../session";


const Reminder = () => {
    const navigate = useNavigate();
      useEffect(() => {
        if (session === "true") {
          navigate("/"); 
        }
    }, [navigate]);
    const [email, setEmail] = useState("");
    const sendEmail = async(e) => {
        e.preventDefault();
        fetch(`${ApiURL}/auth/users/reset_password/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
        })
    })
    alert('Wysłano wiadomość');
    }
    return (
      <>
        <Form h1={'Przypomnienie hasła'} h2={'Podaj swój adres e-mail, a my wyślemy ci nowe hasło!'} onSubmit={sendEmail}>
          <input
          type="text"
          name="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          <button type="submit" className="contrast">Wyślij</button>
        </Form>
      </>
    );
}

export default Reminder;