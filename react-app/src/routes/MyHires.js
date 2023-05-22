import Element from "../components/Element";
import Header from "../components/Header";
import odkurzacz from "../img/odkurzacz.jpg";

const MyHires = () => {
    return (
        <>
            <Header h1={"Moje wypożyczenia"}/>
            <Element>
                <Header h2={"Odkurzacz"}/>
                <img src={odkurzacz} alt='obrazek'/>
                <div class='hire-item'>
                    <p> Dla: Jan Kowalski <br/>Do: 06-06-2023</p>
                </div>
            </Element>
        </>
    );
}

export default MyHires;