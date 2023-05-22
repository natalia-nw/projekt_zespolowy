import Element from "../components/Element";
import Header from "../components/Header";
import odkurzacz from "../img/odkurzacz.jpg";

const MyItems = () => {
    return (
        <>
            <Header h1={"Moje przedmioty"}/>
            <Element>
                <Header h2={"Odkurzacz"}/>
                <img src={odkurzacz} alt='obrazek'/>
                <div class='hire-item'>
                    <p> Opis: Poziom hałasu dB :78<br/>Moc maksymalna W:800<br/>Typ filtra:Wylotowy <br/> Funkcje:Regulacja mocy ssania, Zwijacz przewodu</p>
                </div>
            </Element>
        </>
    ); 
}

export default MyItems;