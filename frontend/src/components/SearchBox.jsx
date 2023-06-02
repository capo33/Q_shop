import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const { keyword: URLKeyword } = useParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(URLKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword('')
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q' // this is for the search bar
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        value={keyword}
      ></Form.Control>
      <Button
        type='submit'
        variant='outline-light'
        className='p-2 mx-2'
        onClick={() => navigate(`/search/${keyword}`)}
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
