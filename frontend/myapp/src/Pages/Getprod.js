import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Ct from "./Ct";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Getprod = () => {
  let [products, setProd] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  let obj = useContext(Ct);
  let [f, setF] = useState(true);
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:5000/api/getprod").then((res) => {
      setProd(res.data);
    });
  }, [f]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  let addcart = (prodobj) => {
    axios
      .post(
        "http://localhost:5000/api/addcart",
        {
          uid: obj.state._id,
          pid: prodobj._id,
          pimg: prodobj.pimg,
          price: prodobj.price,
          name: prodobj.name,
          qty: 1,
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

  let knowmore = (prodobj) => {
    obj.updstate({ proddet: prodobj });
    navigate("/km");
  };

  let del = (pid) => {
    axios
      .delete(`http://localhost:5000/delprod/${pid}`, {
        headers: { Authorization: obj.state.token, uid: obj.state._id },
      })
      .then((res) => {
        setF(!f);
        toast.success("Product deleted!", { autoClose: 1500 });
      })
      .catch(() => {
        toast.error("Failed to delete product.");
      });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      {/* Toast Container */}
      <ToastContainer />

      <div className="search-container">
        <input
          id="1"
          type="text"
          placeholder="Search for Food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="restaurant-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="restaurant-card">
              <img src={`http://localhost:5000/prdimg/${product.pimg}`} alt="product" />
              <h5>{product.name}</h5>
              <div id="1">Category: {product.cat}</div>
              <div id="2">Price: ₹{product.price}</div>
              <div id="3">Rating: {product.rating}</div>
              {obj.state.token !== "" && (
                <div id="addcart">
                  <button onClick={() => addcart(product)}>Add to Cart</button>
                </div>
              )}
              <div id="knowmore">
                <button onClick={() => knowmore(product)}>Know more</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Getprod;