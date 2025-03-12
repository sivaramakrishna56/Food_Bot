import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import Ct from "../Pages/Ct";

const R_navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  let obj=useContext(Ct)

  const words = ["Food Delivery Website", "Restaurant Partner"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 1000);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(words[index].substring(0, subIndex));
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 75 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting,words]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <h1>🤖Food Bot</h1>
          <span className="typing-text">{text} |</span>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          {obj.state.token===""&&<NavLink to="/api/home" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>}
          {obj.state.token!==""&&<NavLink to="/auth/addrest" className={({ isActive }) => (isActive ? "active" : "")}>Restaurant</NavLink>}
          {obj.state.token!==""&&<NavLink to="/auth/rorders" className={({isActive})=>(isActive ? "active":"")}>Orders</NavLink>}
          {obj.state.token===""&&<NavLink to="/auth/rlogin" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink>}
          {obj.state.token===""&&<NavLink to="/auth/rreg" className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink>}
          {obj.state.token!==""&&<NavLink to="/auth/additem" className={({isActive})=>(isActive ? "active":"")}>Add Item</NavLink>}
          {obj.state.token!==""&&<NavLink to="/auth/rlogout" className={({ isActive }) => (isActive ? "active" : "")}>Logout</NavLink>}
          {obj.state.token!==""&&<div className="msg">{obj.state.name}</div>}
        </div>
      </div>
    </nav>
  );
};

export default R_navbar;