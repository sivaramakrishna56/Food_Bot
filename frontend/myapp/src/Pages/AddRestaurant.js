import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Ct from "../Pages/Ct";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  const { state } = useContext(Ct);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let [f,setF]=useState(true)

  useEffect(() => {
    if (!state?._id) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getprod");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [state?._id]);

  let edit=(prodobj)=>{
    obj.updstate({"proddet":prodobj})
    navigate("/auth/edit")
  }
  let del=(pid)=>{
    console.log(pid)
    axios.delete(`http://localhost:5000/auth/delprod/${pid}`,{"headers":{"Authorization":obj.state.token,"uid":obj.state._id}}).then((res)=>{
      console.log(res.data)
      setF(!f)
    })
  }

  const filteredProducts = products
    .filter((product) => product.restaurantId === state._id)
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="home">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for restaurant items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="restaurant-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="restaurant-card">
                <img
                  src={`http://localhost:5000/prdimg/${product.pimg}`}
                  alt={product.name}
                />
                <h5><b>Product:</b> {product.name}</h5>
                <div>Category: {product.cat}</div>
                <div>Price: ₹{product.price}</div>
                <div>Rating: ⭐{product.rating}</div>
                <div id="edit"><button onClick={()=>edit(product)}>Edit</button></div>
                <div id="delete"><button onClick={()=>del(product._id)}>Delete</button></div>
              </div>
            ))
          ) : (
            <p className="no-results">No items found for this restaurant.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddRestaurant;