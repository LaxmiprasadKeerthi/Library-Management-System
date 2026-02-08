// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Books from "./components/Books";
import About from "./components/About";
import Contact from "./components/Contact";
import PreBook from "./components/PreBook";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Status from "./components/Status";
import Admin from "./components/Admin";
import AddBook from "./components/AddBook";
import ProtectedRoute from "./components/ProtectedRoutes";
import PreBookPage from "./components/PreBookPage";
import AdminDashBoard from "./components/AdminDashBoard";
import Profile from "./components/Profile";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/prebook" element={<PreBookPage />} />
        <Route path="/admin" element={<Admin />} />
<Route path="/admin-dashboard" element={<AdminDashBoard />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/prebook"
          element={
            <ProtectedRoute>
              <PreBook user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <Status user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
