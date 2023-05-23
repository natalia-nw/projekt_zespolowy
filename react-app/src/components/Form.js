import Header from './Header';

const Form = (props) => {
    return (
        <main class="container">
            <article>
                <div>
                    <Header h1={props.h1} h2={props.h2}/>
                    <form>
                        {props.children}
                    </form>
                </div>
            </article>
        </main>
    );
}

export default Form;