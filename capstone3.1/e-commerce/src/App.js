import './App.css';

import {useState, useEffect} from 'react';

import AppNavBar from './components/AppNavbar.js';
import Home from './pages/Home.js';
import Products from './pages/Products.js';
import AdminDashboard from './pages/AdminDashboard.js';
import CreateProduct from './pages/CreateProduct.js';
import UpdateProduct from './pages/UpdateProduct.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import NotFound from './pages/NotFound.js';
import ProductView from './pages/ProductView.js';

//Import UserProvider
import {UserProvider} from './UserContext.js';

import 'bootstrap/dist/css/bootstrap.min.css';

//The BrowserRouter component will enable us to simulate page navigation by synchronizing the shown content and the shown URL in the web browser.
//The Routes component holds all our Route components. It selects which 'Route' component to show based on the url endpoint.
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  let userDetails = {};
  useEffect(()=>{
    if(localStorage.getItem('token') === null){
      userDetails = {
        id: null,
        isAdmin: null
      }
    }else{
        fetch(`${process.env.REACT_APP_API_URL}/users`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(result => result.json())
      .then(data => {
          userDetails = {
              id : data._id,
              isAdmin: data.isAdmin
          };

      })
    }
  }, [])
  
  
  const [user, setUser] = useState(userDetails);

  const unsetUser = () => {
    localStorage.clear();
  }
  useEffect(()=> {
    console.log(user);
    console.log(localStorage.getItem('token'));
  }, [user])


  

  return (
    <UserProvider value = {{user, setUser, unsetUser}}>
        <BrowserRouter>
          <AppNavBar />
            <Routes>
              <Route path = '/' element = {<Home/>} />
              <Route path = '/products' element = {<Products/>} />
              <Route path = '/admin' element = {<AdminDashboard/>} />
              <Route path = '/createProduct' element = {<CreateProduct/>} />
              <Route path = '/updateProduct' element = {<UpdateProduct/>} />
              <Route path = '/register' element = {<Register/>} />
              <Route path = '/login' element = {<Login/>} />
              <Route path = '/logout' element = {<Logout/>} />
              <Route path = '/products/:productId' element = {<ProductView/>}/>
              <Route path = '*' element = {<NotFound/>} />
            </Routes>
        </BrowserRouter>
    </UserProvider>
    

  );
}

export default App;

