import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

function Home() {
  return (
    <div className='global-container'>
      <div className='home-container'>
      <h1 className="welcome-message">Welcome to our fashion community</h1>
      <p>In our platform, you can explore the latest fashion trends, get style tips, and share your favorite looks with other fashion enthusiasts.</p>
      <p>Join us and be part of a community passionate about fashion!</p>
      <div className="categories-container">
        <Link to="/remeras" className="category-link">
          <img src="https://d22fxaf9t8d39k.cloudfront.net/e7cf823544fa4734131f6fa37b9c19c7eb99a22aeca524ce5f49e5d6698338e67239.jpeg" alt="Remeras" className="category-image" />
          <p className="category-name">T-Shirts</p>
        </Link>
        <Link to="/buzos" className="category-link">
          <img src="https://d22fxaf9t8d39k.cloudfront.net/c76e3936344ceed4587e955f7c449e395dec2c3b78cb7955c8f16224684381717239.jpg" alt="Buzos" className="category-image" />
          <p className="category-name">Divers</p>
        </Link>
        <Link to="/pantalones" className="category-link">
          <img src="https://d22fxaf9t8d39k.cloudfront.net/bf9127ac6b95b5983843909b7458d7b07a17ecf71f96feb3cbcc51a5fb3efd8a7239.jpeg" alt="Pantalones" className="category-image" />
          <p className="category-name">Pants</p>
        </Link>
        <Link to="/accesorios" className="category-link">
          <img src="https://acdn.mitiendanube.com/stores/001/131/056/products/m4211-6ae73fa73c1da2388816852126149047-640-0.webp" alt="Accesorios" className="category-image" />
          <p className="category-name">Accesories</p>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Home;



{/* <p>In our platform, you can explore the latest fashion trends, get style tips, and share your favorite looks with other fashion enthusiasts.</p>
      <p>Join us and be part of a community passionate about fashion!</p> */}
{/* <div className="category-container">
        {Object.keys(data).map((category) => (
          <Link key={category} to={`/${category}`} className="category-link">
            <img src={data[category][0].imageUrl} alt={category} className="category-image" />
            <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
          </Link>
        ))}
      </div> */}