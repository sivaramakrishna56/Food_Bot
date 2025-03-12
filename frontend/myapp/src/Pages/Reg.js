import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import banner from "../images/reg_img.jpg";
const Reg = () => {
  let [data,setData]=useState({"_id":"","name":"","pwd":""})
  let [msg,setMsg]=useState("")
  let navigate=useNavigate()
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let add=()=>{
    if(data._id!==""&&data.name!==""&&data.pwd!=="")
    {
      axios.post("http://localhost:5000/api/reg",data).then((res)=>{
        setMsg(res.data.msg)
        if(res.data.msg==="account created")
        {
          navigate("/api/login")
        }
      })
    }
    else{
      setMsg("fill all fields")
    }
  }
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
          label="Enter Name"
          type="text"
          name="name"
          multiline
          maxRows={4}
          onChange={fun}
          value={data.name}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Create Password"
          type="password"
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
        <button onClick={add}>Sign Up</button>
      </div>
    </div>
    </div>
  );
};

export default Reg;