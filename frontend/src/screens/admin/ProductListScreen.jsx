import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: isLoadingCreate }] =
    useCreateProductMutation();

  const dispatch = useDispatch();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message || err?.error);
      }
    }
  };

  const deleteHandler = (id) => {
    console.log("deleteHandler" + id);
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          {/* <LinkContainer to='/admin/product/create'>
            <Button className='my-3'>
              Create Product
            </Button>
          </LinkContainer> */}
          <Button className='btn-sm m-3' onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>€{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer
                      to={`/admin/product/${product._id}/edit`}
                      style={{ background: "blue" }}
                    >
                      <Button className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      className='btn-sm'
                      style={{ background: "red" }}
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
