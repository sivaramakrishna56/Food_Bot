import React from "react";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div>
                    <h2>About FoodBot</h2>
                    <ul>
                        {['Who We Are', 'Blog', 'Work With Us', 'Investor Relations', 'Report Fraud', 'Press Kit', 'Contact Us'].map((item, index) => (
                            <li key={index}><a href="#">{item}</a></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2>FOODVERSE</h2>
                    <ul>
                        {['Foodbot', 'Blinkit', 'District', 'Feeding India', 'Hyperpure', 'Foodbot Live', 'Foodland', 'Weather Union'].map((item, index) => (
                            <li key={index}><a href="#">{item}</a></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2>For Restaurants</h2>
                    <ul>
                        {['Partner With Us', 'Apps For You'].map((item, index) => (
                            <li key={index}><a href="#">{item}</a></li>
                        ))}
                    </ul>
                    <h2>Learn More</h2>
                    <ul>
                        {['Privacy', 'Security', 'Terms'].map((item, index) => (
                            <li key={index}><a href="#">{item}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
