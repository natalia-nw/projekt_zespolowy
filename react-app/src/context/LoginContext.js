import { createContext, useState } from "react";

const LoginContext = createContext({});

export const LoginProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState([]);

    return (
        <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;