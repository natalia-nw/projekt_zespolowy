import '../styles/app.css';


const Link = ({label, href}) => {
    return (
        <div className='link'>
            <a href={href}>{label}</a>
        </div>
    );
    
}

export default Link;