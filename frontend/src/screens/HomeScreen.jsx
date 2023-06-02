import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  // this is the old one without pagination
  // const { data: products = [], isLoading, error } = useGetProductsQuery();

  // this is the new one with pagination
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const { products = [] } = data || {};

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <>
          <Link to='/' className='btn btn-light mb-4'>
            Go Back
          </Link>
          <h1>Search Results</h1>
        </>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
        {!keyword && <h1>Latest Products</h1>}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data?.pages}
            page={data?.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
