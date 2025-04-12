import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Detection from './components/Detection';
import Home from './components/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-primary flex">
        {isAuthenticated && <Sidebar />}
        <div className="flex-1">
          <Routes>
            <Route path="/signin" element={!isAuthenticated ? <SignIn setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuthenticated ? <SignUp setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} />
            <Route path="/detection" element={isAuthenticated ? <Detection /> : <Navigate to="/signin" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
