import React, { useContext, useEffect, useState } from "react";
import Ct from "./Ct";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import banner from "../images/edit.jpg";

const Edit = () => {
  let [prod, setProd] = useState({ _id: "", name: "", price: "", desc: "", cat: "" });
  let fd = new FormData();
  let obj = useContext(Ct);
  let navigate = useNavigate();

  let fun = (e) => {
    setProd({ ...prod, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let data = obj.state.proddet;
    delete data["comm"];
    setProd({ ...data });
  }, []);

  let edit = () => {
    axios
      .put("http://localhost:5000/auth/edit", prod, {
        headers: { Authorization: obj.state.token, uid: obj.state._id },
      })
      .then(() => {
        navigate("/auth/addrest");
      });
  };

  let fun1 = (e) => {
    fd.append("pimg", e.target.files[0]);
  };

  let editimg = () => {
    fd.append("_id", prod._id);
    fd.append("oldimg", prod.pimg);
    axios
      .put("http://localhost:5000/auth/editimg", fd, {
        headers: { Authorization: obj.state.token, uid: obj.state._id },
      })
      .then(() => {
        navigate("/auth/addrest");
      });
  };

  return (
    <div id="formcon">
    <img src={banner} alt="Delicious Food" />
      <div className="con">
        <div className="form">
          <TextField
            id="outlined-multiline-flexible"
            label="Enter Product Name"
            type="text"
            name="name"
            multiline
            maxRows={4}
            onChange={fun}
            value={prod.name}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Enter Price"
            type="text"
            name="price"
            multiline
            maxRows={4}
            onChange={fun}
            value={prod.price}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Enter Category"
            type="text"
            name="cat"
            multiline
            maxRows={4}
            onChange={fun}
            value={prod.cat}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Enter Description"
            type="text"
            name="desc"
            multiline
            maxRows={4}
            onChange={fun}
            value={prod.desc}
          />

          <button onClick={edit}>Edit</button>
        </div>

        <div className="form">
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Upload File
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              name="pimg"
              onChange={fun1}
            />
          </div>
          <button onClick={editimg}>Edit Image</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;