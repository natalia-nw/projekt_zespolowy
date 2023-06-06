import Form from "../components/Form";
import ApiURL from "../ApiURL";
import { useEffect, useState } from "react";
import HttpHeader from "../HttpHeader";
import { useNavigate } from "react-router-dom";

const EditAgreement = () => {
    const [notes, setNotes] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateStop, setDateStop] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${ApiURL}/items/${sessionStorage.getItem("ItemId")}/agreements/${sessionStorage.getItem("AgreementId")}`, {
            method: 'GET',
            headers: HttpHeader
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setNotes(data.notes);
            setDateStart(data.date_start);
            setDateStop(data.date_stop);
            //console.log(dateStart);
        })
    }, [])
    const handleEdit = () => {
        fetch(`${ApiURL}/agreements/${sessionStorage.getItem("AgreementId")}`, {
            method: 'PUT',
            headers: HttpHeader,
            body: JSON.stringify({
                notes: notes,
                date_start: dateStart,
                date_stop: dateStop
            })
        })
        navigate('/wypozyczenia');
        window.location.reload(false);
    }
    return (
        <Form h1={"Nowe wpożyczenie"} h2={"Dodaj nowe wypożyczenie dla danego przedmiotu"} onSubmit={handleEdit}>
            <textarea 
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            />
            <input 
            type="date" 
            name="date_start"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            />
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

export default EditAgreement;