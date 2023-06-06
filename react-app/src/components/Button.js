const Button = ({label, href}) => {
    return (
        <a role="button" className="link-button" href={href}> {label} </a>
    );
    
}

export default Button;