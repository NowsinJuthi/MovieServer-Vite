import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./component/register";
import Login from "./component/login";
import Verify from "./component/verify";
import UserForm from './component/userForm'
import ShowUserData from './component/showUserData';
import ExpireUser from "./component/ExpireUser";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/user" element={<UserForm />} /> 
          <Route path="/user-data" element={<ShowUserData />} />
          <Route path="/expire-user" element={<ExpireUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;