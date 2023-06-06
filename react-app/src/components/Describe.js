const Describe = (props) => {
    return (
        <div className='hire-item'>
            <p>Kategoria: {props.category}</p>
            <p>Opis: {props.desc}</p>
            {props.children}
        </div>
    )
}

export default Describe;