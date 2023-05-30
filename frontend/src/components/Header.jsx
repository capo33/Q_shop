import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Container, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaUser } from "react-icons/fa";

import Logo from "../assets/logo.jpg";

const Header = () => {
  // const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src={Logo}
                alt='logo'
                width='30'
                height='30'
                className='d-inline-block  mx-2 my-2 rounded-circle '
              />
              shop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' className='mx-1'>
                      {cartItems.reduce(
                        (acc, currentItem) => acc + currentItem.qty,
                        0
                      )}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>

              {/* {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user mx-1'></i>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
