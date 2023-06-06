import Form from "../components/Form";
import ApiURL from "../ApiURL";
import { useEffect, useState } from "react";
import HttpHeader from "../HttpHeader";
import { useNavigate } from "react-router-dom";

const AgreementRequest = () => {
    const [status, setStatus] = useState('');
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
            //console.log(dateStart);
        })
    }, [])
    const handleEdit = () => {
        fetch(`${ApiURL}/agreements/${sessionStorage.getItem("AgreementId")}`, {
            method: 'PUT',
            headers: HttpHeader,
            body: JSON.stringify({
                date_start: '2023-07-03',
                date_stop: '2023-07-23',
                status: status
            })
        })
        navigate('/my_hires');
        window.location.reload(false);
    }
    return (
        <Form h1={"Nowe wpożyczenie"} h2={"Dodaj nowe wypożyczenie dla danego przedmiotu"} onSubmit={handleEdit}>
            <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            >
            <option value="Zapytanie">Zapytanie otrzymującego</option>
            <option value="Zapytanie potwierdzone"  >Zapytanie potwierdzone</option>
            <option value="Zapytanie anulowane"  >Zapytanie anulowane</option>
        
            </select>
            <button type="sumbit">Zatwierdź</button>
            </Form>
    )
}

export default AgreementRequest;