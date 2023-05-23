const Element = (props) => {
    return (
        <main class="container-fluid">
                    <article>
                        {props.children}
                    </article>
            </main>
    );
}

export default Element;
