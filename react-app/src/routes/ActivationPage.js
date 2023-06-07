import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Headers";
import axios from "axios";
import ApiURL from "../ApiURL";

const ActivationPage = () => {
    const { uid, token } = useParams();
  useEffect(() => {
    console.log(uid, token);
    activateAccount(uid, token);
  }, [uid, token]);

  const activateAccount = (uid, token) => {
    const authToken = "ecb6859043a3c304eccf968287775775579fdfc6";
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    };
    axios.post(`${ApiURL}/auth/users/activation/`, {uid, token}, {headers})
    .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  } 
  return (
    <Header h1={"Konto zostało aktywowane"} h2={"Możesz zamknąć kartę"}/>
  );
};

export default ActivationPage;