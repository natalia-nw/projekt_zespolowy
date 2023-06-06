import { useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
//import axios from "axios";
//import queryString from "query-string";
import ApiURL from "../ApiURL";

const NewPassword = () => {
    const [password, setPassword] = useState("");
    //const location = useLocation();
    const { uid, token } = useParams();
    /*useEffect(() => {
        //const { uid, token } = queryString.parse(location.search);
        console.log(uid, token);
        //activateAccount(uid, token);
  }, [uid, token]);*/

  const activateAccount = () => {
    const authToken = "ecb6859043a3c304eccf968287775775579fdfc6";
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    };
    fetch(`${ApiURL}/auth/users/reset_password_confirm/`,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            uid: uid,
            token: token,
            new_password: password,
        })
    })
    .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <Form h1={"Nowe hasło"} h2={"Stwórz nowe hasło"} onSubmit={activateAccount}>
        <input 
        type="password" 
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Zatwierdź</button>
    </Form>
  );
}

export default NewPassword;