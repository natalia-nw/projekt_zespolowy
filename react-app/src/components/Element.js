const Element = (props) => {
    return (
        <main className="container-fluid">
            <article>
                <li key={props.id}>
                    {props.children}
                </li>
            </article>
        </main>
    );
}

export default Element;
