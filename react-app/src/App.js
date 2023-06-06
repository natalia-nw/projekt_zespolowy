import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import LogPage from './routes/LogPage';
import RegPage from './routes/RegPage';
import Reminder from './routes/Reminder';
import MyItems from './routes/MyItems';
import MyAgreements from "./routes/MyAgreements";
import NewItem from './routes/NewItem';
import Layout from './routes/Layout';
import { AuthProvider} from './context/AutoProvider';
import {LoginProvider} from './context/LoginContext';
import NewAgreement from './routes/NewAgreement';
import NewAdd from "./routes/NewAdd";
import EditItem from "./routes/EditIem";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./routes/Profile";
import ActivationPage from "./routes/ActivationPage";
import NewPassword from "./routes/NewPassword";
import EditAgreement from "./routes/EditAgreement";
import AgreementRequest from "./routes/AgreementRequest";

function App() {
  return (
    <LoginProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path='/newAdd' element={<ProtectedRoute><NewAdd/></ProtectedRoute>}/>
              <Route path='/auth/login' element={<LogPage/>}/>
              <Route path='/auth/registration' element={<RegPage/>}/>
              <Route path='/reminder' element={<Reminder/>}/>
              <Route path='/myProfile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
              <Route path='/myAgreements' element={<ProtectedRoute><MyAgreements/></ProtectedRoute>}/>
              <Route path='/myItems' element={<ProtectedRoute><MyItems/></ProtectedRoute>}/>
              <Route path='/EditItem' element={<ProtectedRoute><EditItem/></ProtectedRoute>}/>
              <Route path='/newItem' element={<ProtectedRoute><NewItem/></ProtectedRoute>}/>
              <Route path='/newAgreement' element={<ProtectedRoute><NewAgreement/></ProtectedRoute>}/>
              <Route path='/EditAgreement' element={<EditAgreement/>}/>
              <Route path='/agreementRequest' element={<AgreementRequest/>}/>
            </Route>
            <Route path='/activate/:uid/:token' element={<ActivationPage/>}/>
            <Route path='/password-reset/:uid/:token' element={<NewPassword/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LoginProvider>
  );
}

export default App;
