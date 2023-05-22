import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import '@picocss/pico';
import './styles/app.css';
import Home from './routes/Home';
import LogPage from './routes/LogPage';
import RegPage from './routes/RegPage';
import Reminder from './routes/Reminder';
import reportWebVitals from './reportWebVitals';
import MyHires from './routes/MyHires';
import MyItems from './routes/MyItems';
import Layout from './routes/Layout';
export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/auth/login' element={<LogPage/>}/>
            <Route path='/auth/registration' element={<RegPage/>}/>
            <Route path='/reminder' element={<Reminder/>}/>
            <Route path='/my_hires' element={<MyHires/>}/>
            <Route path='/my_items' element={<MyItems/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
