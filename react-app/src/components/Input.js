import '../styles/app.css';


const Input = ({name, placeholder}) => {
    return (
        <input
        type="text"
        name={name}
        placeholder={placeholder}
        required
        />
    );
    
}

export default Input;