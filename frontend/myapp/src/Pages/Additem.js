import React, { useState } from "react";
import axios from "axios";
/*import { useNavigate } from "react-router-dom";*/
import TextField from '@mui/material/TextField';

import banner from "../images/reg_img.jpg";
const Additem = () => {
  let [data,setData]=useState({"name":"","cat":"","price":"","disc":"","rating":"","pimg":"","restaurantId":""})
  let [msg,setMsg]=useState("")
  /*let navigate=useNavigate()*/
  let fun = (e) => {
    if (e.target.name === "pimg") {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
  let add = () => {
    if (
      data.name !== "" &&
      data.cat !== "" &&
      data.price !== "" &&
      data.rating !== "" &&
      data.pimg !== "" &&
      data.restaurantId !==""
    ) {
      let formData = new FormData();
      for (let key in data) {
        formData.append(key, data[key]);
      }
  
      axios.post("http://localhost:5000/auth/additem", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setMsg(res.data.msg);
          if (res.data.msg === "prod was added") {
            setData({"name":"","cat":"","price":"","disc":"","rating":"","pimg":"","restaurantId":""})
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
          label="Enter Category"
          type="text"
          name="cat"
          multiline
          maxRows={4}
          onChange={fun}
          value={data.cat}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Enter price"
          type="text"
          name="price"
          multiline
          maxRows={4}
          onChange={fun}
          value={data.price}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Enter Discount"
          type="text"
          name="disc"
          multiline
          maxRows={4}
          onChange={fun}
          value={data.disc}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Enter Rating"
          type="text"
          name="rating"
          multiline
          maxRows={4}
          onChange={fun}
          value={data.rating}
        />

        <div class="mb-3">
          <label for="formFile" class="form-label">Upload File</label>
          <input 
              class="form-control" 
              type="file" 
              id="formFile" 
              name="pimg" 
              onChange={fun} 
              />
        </div>
        <TextField
          id="outlined-multiline-flexible"
          label="Enter RestaurantId"
          type="text"
          name="restaurantId"
          multiline
          maxRows={4}
          onChange={fun}
          value={data.restaurantId}
        />
        <button onClick={add}>Add Item</button>
      </div>
    </div>
    </div>
  );
};

export default Additem;