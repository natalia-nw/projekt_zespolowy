import Header from './Headers';

const Form = (props) => {
    return (
        <main className="container">
            <article>
                <div>
                    <Header h1={props.h1} h2={props.h2}/>
                    <form onSubmit={props.onSubmit}>
                        {props.children}
                    </form>
                </div>
            </article>
        </main>
    );
}

export default Form;