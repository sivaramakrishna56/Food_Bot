import React, { useContext, useEffect, useState } from "react";
import Ct from "./Ct";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import "../App.css"; // Updated CSS
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Km = () => {
  let obj = useContext(Ct);
  let [prodobj, setProd] = useState("");
  let [rv, setRv] = useState({ text: "", rt: 5 });
  const [hover, setHover] = useState(-1);
  let navigate = useNavigate();

  useEffect(() => {
    setProd(obj.state.proddet);
  }, []);

  let addComment = () => {
    axios
      .put(
        "http://localhost:5000/api/addcom",
        { ...rv, name: obj.state.name, _id: prodobj._id },
        { headers: { Authorization: obj.state.token } }
      )
      .then((res) => {
        setProd(res.data);
        setRv({ text: "", rt: 5 });
      });
  };
  let addcart = (prodobj) => {   
    axios.post("http://localhost:5000/api/addcart",
      {
        uid: obj.state._id,
        pid: prodobj._id,
        pimg: prodobj.pimg,
        price: prodobj.price,
        name: prodobj.name,
        qty: 1,
        restaurantId: prodobj.restaurantId, // ✅ Ensure it's included
      },
        { headers: { Authorization: obj.state.token } }
      )
      .then((res) => {
        toast.success("Item added to cart!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setTimeout(() => {
            navigate("/api/getprod");
        }, 2100); 
      })
      .catch((error) => {
        toast.error("Failed to add item to cart!", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="km-container">
      <ToastContainer />
      {prodobj !== "" && (
        <div className="km-card">
          {/* Left side - Image */}
          <div className="km-img-container">
            <img
              src={`http://localhost:5000/prdimg/${prodobj.pimg}`}
              className="km-product-img"
              alt={prodobj.name}
            />
          </div>

          {/* Right side - Details */}
          <div className="km-content">
            <h2 className="km-title">{prodobj.name.toUpperCase()}</h2>
            <p className="km-price">Price: ${prodobj.price}</p>
            <p className="km-category">Category: {prodobj.cat}</p>

            <h3 className="km-comments-title">User Comments:</h3>
            <div className="km-comments">
              {prodobj.comm.map((com, index) => (
                <div key={index} className="km-comment">
                  <h4>{com.name}</h4>
                  <p>{com.text}</p>
                  <Rating value={com.rt} precision={0.5} readOnly />
                </div>
              ))}
            </div>

            {/* Add Comment */}
            {obj.state.token !== "" && (
              <div className="km-review">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onChange={(e) => setRv({ ...rv, text: e.target.value })}
                  value={rv.text}
                  className="km-input"
                />
                <Rating
                  name="hover-feedback"
                  value={rv.rt}
                  precision={0.5}
                  onChange={(event, newValue) => setRv({ ...rv, rt: newValue })}
                  onChangeActive={(event, newHover) => setHover(newHover)}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <button className="km-btn" onClick={addComment}>
                  Add Comment
                </button>
              </div>
            )}

            {/* Buttons */}
            {obj.state.token !== "" && (
              <div>
                <button className="km-btn" onClick={() => addcart(prodobj)}>Add to Cart</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Km;