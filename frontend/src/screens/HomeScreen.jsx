import React, { useState,   useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

// import products from "../data/products";
import Product from "../components/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:5000/api/v1/products");
      console.log(data);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
