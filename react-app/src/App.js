import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import LogPage from './routes/LogPage';
import RegPage from './routes/RegPage';
import Reminder from './routes/Reminder';
import MyItems from './routes/MyItems';
import MyAgreements from "./routes/MyAgreements";
import NewItem from './routes/NewItem';
import Layout from './routes/Layout';
import NewAgreement from './routes/NewAgreement';
import NewAdd from "./routes/NewAdd";
import EditItem from "./routes/EditIem";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./routes/Profile";
import ActivationPage from "./routes/ActivationPage";
import NewPassword from "./routes/NewPassword";
import EditAgreement from "./routes/EditAgreement";
import AgreementRequest from "./routes/AgreementRequest";
import ChangePassowrd from "./routes/ChangePassword";
import ChangeUsername from "./routes/ChangeUsername";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/noweOgloszenie' element={<ProtectedRoute><NewAdd/></ProtectedRoute>}/>
          <Route path='/logowanie' element={<LogPage/>}/>
          <Route path='/rejestracja' element={<RegPage/>}/>
          <Route path='/przypomnijHaslo' element={<Reminder/>}/>
          <Route path='/mojProfil' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path='/wypozyczenia' element={<ProtectedRoute><MyAgreements/></ProtectedRoute>}/>
          <Route path='/przedmioty' element={<ProtectedRoute><MyItems/></ProtectedRoute>}/>
          <Route path='/edytujPrzedmiot' element={<ProtectedRoute><EditItem/></ProtectedRoute>}/>
          <Route path='/nowyPrzedmiot' element={<ProtectedRoute><NewItem/></ProtectedRoute>}/>
          <Route path='/noweWypozyczenie' element={<ProtectedRoute><NewAgreement/></ProtectedRoute>}/>
          <Route path='/edytujWypozyczenie' element={<ProtectedRoute><EditAgreement/></ProtectedRoute>}/>
          <Route path='/chceWypozyczyc' element={<ProtectedRoute><AgreementRequest/></ProtectedRoute>}/>
          <Route path='/zmienHaslo' element={<ProtectedRoute><ChangePassowrd/></ProtectedRoute>}/>
          <Route path='/zmienNazweUzytkownika' element={<ProtectedRoute><ChangeUsername/></ProtectedRoute>}/>
        </Route>
        <Route path='/activate/:uid/:token' element={<ActivationPage/>}/>
        <Route path='/password-reset/:uid/:token' element={<NewPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
