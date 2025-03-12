import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import AddRestaurant from "./Pages/AddRestaurant";
import Login from "./Pages/Login";
import Reg from "./Pages/Reg";
import "./App.css";
import Ct from "./Pages/Ct";
import Logout from "./Pages/Logout";
import R_navbar from "./components/R_navbar";
import R_login from "./Pages/R_login";
import R_reg from "./Pages/R_reg";
import R_orders from "./Pages/R_orders";
import R_logout from "./Pages/R_logout";
import Footer from "./components/Footer";
import Getprod from "./Pages/Getprod";
import Additem from "./Pages/Additem";
import Km from "./Pages/Km";
import Edit from "./Pages/Edit";
import GettCart from "./Pages/GettCart";
import Orders from "./Pages/Orders";

const Layout = ({ children }) => {
  const location = useLocation(); 

  return (
    <>
      {location.pathname.startsWith("/api") && <Navbar />}
      {location.pathname.startsWith("/auth") && <R_navbar />}
      {children}
    </>
  );
};

const App = () => {
  let [state,setState]=useState({"token":"","_id":"","name":"","role":""})
  let updstate=(obj)=>{
    setState({...state,...obj})
  }
  let obj={"state":state,"updstate":updstate}
  return (
    <BrowserRouter>
      <Ct.Provider value={obj}>
      <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/api/home" />} />
        <Route path="/api/home" element={<Home />} />
        <Route path="/auth/addrest" element={<AddRestaurant />} />  
        <Route path="/auth/rlogin" element={<R_login/>}/>
        <Route path="/auth/rlogout" element={<R_logout/>}/>
        <Route path="/auth/rreg" element={<R_reg/>}/>
        <Route path="/auth/rorders" element={<R_orders/>}/>
        <Route path="/api/orders" element={<Orders/>}/>
        <Route path="/api/gettcart" element={<GettCart/>}/>
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/reg" element={<Reg />} />
        <Route path="/api/logout" element={<Logout/>}/>
        <Route path="/api/getprod" element={<Getprod/>}/>
        <Route path="/auth/additem" element={<Additem/>}/>
        <Route path="/km" element={<Km/>}/>
        <Route path="/auth/edit" element={<Edit/>}/>
      </Routes>
      </Layout>
      <Footer/>
      </Ct.Provider>
    </BrowserRouter>
  );
};

export default App;