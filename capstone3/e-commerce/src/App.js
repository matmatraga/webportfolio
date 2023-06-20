import './App.css';
import { useState, useEffect } from 'react';
import AppNavBar from './components/AppNavBar.js';
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import NotFound from './pages/NotFound.js';
import Logout from './pages/Logout.js';
import { UserProvider } from './UserContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });

  useEffect(() => {
    let userDetails = {};
    if (localStorage.getItem('token') === null) {
      userDetails = {
        id: null,
        isAdmin: null
      };
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(result => result.json())
        .then(data => {
          userDetails = {
            id: data._id,
            isAdmin: data.isAdmin
          };
          setUser(userDetails); // Update the state with the fetched user details
        });
    }
  }, [])

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    console.log(user);
    console.log(localStorage.getItem('token'));
  }, [user]);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <BrowserRouter>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
