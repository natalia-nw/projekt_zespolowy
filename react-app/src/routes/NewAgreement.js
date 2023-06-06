import Form from "../components/Form";
import ApiURL from "../ApiURL";
import { useState } from "react";
import HttpHeader from "../HttpHeader";
import { useNavigate } from "react-router-dom";

const NewAgreement = () => {
    const [receiverEmail, setReceiverEmail] = useState("");
    const [notes, setNotes] = useState("");
    const [dateStart, setDateStart] = useState(null);
    const [dateStop, setDateStop] = useState(null);
    const navigate = useNavigate();
    const addHire = async(e) => {
        e.preventDefault();
        fetch(`${ApiURL}/items/${sessionStorage.getItem("ItemId")}/agreements/`, {
            method: 'POST',
            headers: HttpHeader,
            body: JSON.stringify({
                receiver_email: receiverEmail,
                notes: notes,
                date_start: dateStart,
                date_stop: dateStop
            })
        })
        console.log({dateStart, dateStop});
        navigate('/wypozyczenia');
        window.location.reload(false);
        alert('Dodano pomyślnie!')
    }
    return (
        <Form h1={"Nowe wpożyczenie"} h2={"Dodaj nowe wypożyczenie dla danego przedmiotu"} onSubmit={addHire}>
            <label>Dla</label>
            <input 
            type="email" 
            name="email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            />
            <label>Notatki</label>
            <textarea 
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            />
            <label>Od:</label>
            <input 
            type="date" 
            name="date_start"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            />
            <label>Do:</label>
            <input 
            type="date" 
            name="date_stop"
            value={dateStop}
            onChange={(e) => setDateStop(e.target.value)}
            />
            <button type="sumbit">Zatwierdź</button>
        </Form>
    )
}

export default NewAgreement;