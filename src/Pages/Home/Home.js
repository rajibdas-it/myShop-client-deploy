import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Product from "../Product/Product";

const Home = () => {
  // const { NoOfTotalProduct, products } = useLoaderData();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [itemShowPerPage, setItemShowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(count / itemShowPerPage);
  useEffect(() => {
    fetch(
      `http://localhost:5000/products?page=${currentPage}&size=${itemShowPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [currentPage, itemShowPerPage]);
  return (
    <div className="w-[80%] mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
      {/* <p className="text-center">select page {currentPage}</p> */}
      <div className="my-5 flex justify-center">
        <div className="btn-group">
          {[...Array(pages).keys()].map((number) => (
            <input
              key={number}
              type="radio"
              name="options"
              data-title={number + 1}
              className="btn"
              onClick={() => setCurrentPage(number)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
