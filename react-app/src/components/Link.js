const Link = ({label, href}) => {
    return (
            <>
                <a class="secondary" href={href}>{label}</a><br/>
            </>
    );
    
}

export default Link;