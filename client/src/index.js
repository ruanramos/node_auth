import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
