import React from 'react'
import { Route, Navigate, useLocation, BrowserRouter, Routes } from "react-router-dom";
import Userfront from "@userfront/react";
import Header from './NavigationBar/header';
import Libraries from './Dashboard/Libraries';
import Library from './Components/Library';
import Profile from "./Components/Profile";
import NewForm from './Components/newForm';
import ImageUpload from './Components/imageUpload';
import ImageDisplay from './Components/imageDisplay';
import EditForm from './Components/editForm';
import './App.css'

const SignupForm = Userfront.build({
  toolId: "nkdmaal"
});

const LoginForm = Userfront.build({
  toolId: "llbrddr"
});

Userfront.init("vnd78z9b");

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <div className='content'>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/dashboard" element={<RequireAuth><Libraries /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/newform" element={<RequireAuth><NewForm /></RequireAuth>} />
            <Route path="/upload" element={<RequireAuth><ImageUpload /></RequireAuth>} />
            <Route path="/gallery" element={<RequireAuth><ImageDisplay /></RequireAuth>} />
            <Route path="/lists/:id" element={<RequireAuth><Library /></RequireAuth>} />
            <Route path="/edit/:id" element={<RequireAuth><EditForm /></RequireAuth>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );

  function RequireAuth({ children }) {
    let location = useLocation();
    if (!Userfront.tokens.accessToken) {
      // Redirect to the /login page
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }
}

export default App;