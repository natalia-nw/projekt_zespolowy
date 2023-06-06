import Element from "../components/Element";
import ApiURL from "../ApiURL";
import { useState, useEffect } from "react";
import HttpHeader from "../HttpHeader";
import { useNavigate} from "react-router-dom";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

const MyAgreements = () => {
    const [agreements, setAgreements] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${ApiURL}/agreements/`, {
            method: 'GET',
            headers: HttpHeader
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setAgreements(data.results)
        })
    }, [])
    const goEdit = (item, agreement) => {
        sessionStorage.setItem('ItemId', item);
        sessionStorage.setItem('AgreementId', agreement);
        navigate("/edytujWypozyczenie");
        
    }
    const changeStatus = (item, agreement, date_start, date_stop, status) => {
        fetch(`${ApiURL}/items/${item}/agreements/${agreement}`, {
            method: 'PUT',
            headers: HttpHeader,
            body: JSON.stringify({
                status: status,
                date_start: date_start,
                date_stop: date_stop
            })
        })
    }
    const deleteAgreement = (item, agreement) => {
        fetch(`${ApiURL}/items/${item}/agreements/${agreement}`, {
            method: 'DELETE',
            headers: HttpHeader,
        })
    }
    return (
        <>
            <h1 className="title">Moje wypożyczenia</h1>
            <ul>
                    {agreements.length > 0 ? (
                    agreements.map((agreement) => 
                    <Element id={agreement.id}>
                        <div className='hire-item'>
                            {agreement.item.images.map((image) => 
                            <a href={image.image}><img src={image.image} alt='obrazek'/></a>)}
                            <p>Przedmiot: {agreement.item.name}</p>
                            <p>Kategoria: {agreement.item.category}</p>
                            <p>Uwagi: {agreement.notes}</p>
                            <p>Status: {agreement.status}</p>
                            <p> Dla: {agreement.receiver_email} </p>
                            <p>Od: {agreement.date_start}</p>
                            <p>Do: {agreement.date_stop}</p>
                        </div>
                        {console.log("receiver=", agreement.receiver)}
                        {agreement.status === "Zapytanie" && agreement.receiver_email !== sessionStorage.getItem('email') ? 
                        <>
                        <p className="title">Prośba o wypożyczenie</p>
                        <table>
                        <tr>
                        <td>
                        <form onSubmit={() => changeStatus(agreement.item.id, agreement.id, agreement.date_start, agreement.date_stop, "Zapytanie potwierdzone")}>
                            <button className="accept">Potwierdź</button>
                        </form>
                        </td>
                        <td>
                        <form onSubmit={() => changeStatus(agreement.item.id, agreement.id, agreement.date_start, agreement.date_stop, "Zapytanie anulowane")}>
                            <button className="cancel">Anuluj</button>
                        </form>
                        </td>
                        </tr>
                        </table>
                        </>
                        : null}
                        {sessionStorage.getItem('email') !== agreement.receiver_email ? 
                        <>
                            <EditButton fn={() => goEdit(agreement.item, agreement.id)}/>
                            <DeleteButton fn={() => deleteAgreement(agreement.item, agreement.id)}/>
                        </>
                        : null}
                    </Element>
                    )) : (
                    <h1>Brak wypożyczeń</h1>
                    )}
            </ul>
        </>
    );
}

export default MyAgreements;