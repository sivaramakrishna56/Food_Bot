import React, { useContext, useEffect, useState } from "react";
import banner from "../images/food_bot_img2.jpg";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Ct from "./Ct"
const Home = () => {
  let [restaurants,setRest]=useState([])
  let [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/api/getprod?search=${encodeURIComponent(category)}`);
  };
  let obj=useContext(Ct)
  useEffect(()=>{
    axios.get("http://localhost:5000/api/getrest").then((res)=>{
      setRest(res.data)
    })
  },[])

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const foodCategories = [
    { name: "Biryani", img: "Biryani.png" },
    { name: "Pizza", img: "Pizza.png" },
    { name: "Burger", img: "Burger.png" },
    { name: "Shawarma", img: "Shawarma.png" },
    { name: "Cake", img: "Cake.png" },
    { name: "Noodles", img: "Noodles.png" },
    { name: "Momo", img: "Momo.png" },
    { name: "Shake", img: "Shake.png" },
    { name: "Samosa", img: "Samosa.png" },
    { name: "Pav Bhaji", img: "Pav%20Bhaji.png" },
    { name: "Pasta", img: "Pasta.png" },
    { name: "Pastry", img: "Pastry.png" },
    { name: "Pakoda", img: "Pakoda.png" },
    { name: "Salad", img: "Salad.png" },
    { name: "Dosa", img: "Dosa.png" },
    { name: "Juice", img: "Juice.png" },
  ];

  return (
    <div className="home">
      <div className="hero">
        <img src={banner} alt="Delicious Food" />
        <div className="hero-text">
          <h1>Welcome to FoodBot</h1>
          <p>Discover the best restaurants near you.</p>
          <a href="#1" className="btn"><ContentPasteSearchIcon/> Search</a>
        </div>
      </div>

      <div className="food-category-grid">
        {foodCategories.map((food, index) => (
          <button key={index} className="food-category-item" onClick={() => handleCategoryClick(food.name)}>
            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/${food.img}`} alt={food.name}  />
          </button>
        ))}
      </div>

      <div className="search-container">
        <input
          id="1"
          type="text"
          placeholder="Search for restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      

      <div className="restaurant-list">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <img src={`http://localhost:5000/resimg/${restaurant.rimg}`}/>
              <h5><b>{restaurant.name}</b></h5>
              <p>Location: {restaurant.location}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;