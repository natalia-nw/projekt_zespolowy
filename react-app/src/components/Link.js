const Link = ({label, href}) => {
    return (
            <>
                <a className="secondary" href={href}>{label}</a><br/>
            </>
    );
    
}

export default Link;