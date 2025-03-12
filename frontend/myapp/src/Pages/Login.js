import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import banner from "../images/login_img.jpg";
import TextField from '@mui/material/TextField';
import Ct from "./Ct";

const Login = () => {
  let [data, setData] = useState({ _id: "", pwd: "" });
  let [msg, setMsg] = useState("");
  const navigate = useNavigate(); 
  let obj=useContext(Ct)

  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  let login = () => {
    if (data._id !== "" && data.pwd !== "") { 
      axios.post("https://food-bot-backend.onrender.com/api/login",data).then((res) => {
        setMsg(res.data.msg)
        if (res.data.token!==undefined) {
          obj.updstate(res.data)
          localStorage.setItem("userEmail", data._id);
          navigate("/api/home");
        }
      });
    }
    else {
      setMsg("Fill all fields");
    }
  };

  return (
    <div id="formcon">
      <img src={banner} alt="Delicious Food" />
      <div className="con">
        <div className="form">
          <div className="msg">{msg}</div>
          <TextField
            id="outlined-multiline-flexible"
            label="Enter Email"
            type="text"
            name="_id"
            multiline
            maxRows={4}
            onChange={fun}
            value={data._id}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Enter Password"
            type="text"
            name="pwd"
            multiline
            maxRows={1}
            onChange={fun}
            value={data.pwd}
            sx={{
              "& .MuiInputBase-input": {
                WebkitTextSecurity: "disc", // Hides text like a password field
              },
            }}
          />
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
