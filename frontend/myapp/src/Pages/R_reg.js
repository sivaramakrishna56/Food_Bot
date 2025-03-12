import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import banner from "../images/r_reg.jpg";
import TextField from '@mui/material/TextField';

const R_reg = () => {
  let [data,setData]=useState({"_id":"","name":"","pwd":"","pan":"","fssai":"","rimg":"","location":""})
  let [msg,setMsg]=useState("")
  let navigate=useNavigate()
  let fun = (e) => {
    if (e.target.name === "rimg") {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };  
  let add = () => {
    if (
      data._id !== "" &&
      data.name !== "" &&
      data.pwd !== "" &&
      data.pan !== "" &&
      data.fssai !== "" &&
      data.rimg &&
      data.location !== ""
    ) {
      let formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
  
      axios
        .post("http://localhost:5000/auth/rreg", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setMsg(res.data.msg);
          if (res.data.msg === "account created") {
            navigate("/auth/rlogin");
          }
        });
    } else {
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
          label="Restaurant Name"
          type="text"
          name="name"
          multiline
          maxRows={4}
          onChange={fun}
          value={data.name}
        />   

        <TextField
          id="outlined-multiline-flexible"
          label="Restaurant Address"
          type="text"
          name="location"
          multiline
          maxRows={4}
          onChange={fun}
          value={data.location}
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

        <TextField
          id="outlined-multiline-flexible"
          label="Enter Pan Number"
          type="text"
          name="pan"
          multiline
          maxRows={4}
          onChange={fun}
          value={data.pan}
        /> 

        <TextField
          id="outlined-multiline-flexible"
          label="Enter Fssai License"
          type="text"
          name="fssai"
          multiline
          maxRows={4}
          onChange={fun}
          value={data.fssai}
        />   
        <div class="mb-3">
          <label for="formFile" class="form-label">Upload File</label>
          <input 
              class="form-control" 
              type="file" 
              id="formFile" 
              name="rimg" 
              onChange={fun} 
              />
        </div>
        <button onClick={add}>Sign Up</button>
      </div>
    </div>
    </div>
  );
};

export default R_reg;