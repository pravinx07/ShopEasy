import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    const data = await fetch("https://dummyjson.com/products");
    const jsonData = await data.json();
    setProduct(jsonData.products);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <h2 className="text-center m-3 text-2xl font-medium">Explore Products</h2>
        <div className=" md:flex flex-wrap  justify-center">
          {product.map((item) => (
      <Link to={`/product/${item.id}`}>
            <div
              key={item.id}
              className="card bg-base-100 w-82 shadow-sm border border-gray-500 m-2 hover:scale-102 transform duration-75  "
            >
              <figure>
                <img src={item.thumbnail} alt={item.title} />
              </figure>
              <div className="card-body items-center">
                <h2 className="card-title">{item.title}</h2>

                <h2>
                  <span className="text-2xl text-gray-400 font-bold">
                    ${item.price}
                  </span>
                </h2>
                <h3>{item.rating} ⭐ /5 ⭐ </h3>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          </Link>
          ))}
        </div>
    </>
  );
};

export default Home;
