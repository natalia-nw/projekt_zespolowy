import Header from "../components/Header";
import Form from "../components/Form";
import Link from "../components/Link";
import NavBar from "../components/NavBar";


const LogPage = () => {
    return (
        <>
            <NavBar/>
            <Header h1='Logowanie' h2='Zaloguj się do konta'/>
            <Form/>
            <Link className='register' label='Nie masz konta? Zarejestruj się' href='./registration'/>
            <Link className='reminder' label='Nie pamiętasz hasła?' href='/reminder'/>
        </>
    );
}

export default LogPage;