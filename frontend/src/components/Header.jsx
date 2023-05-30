import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUber } from "react-icons/fa";
import Logo from "../assets/logo.jpg";
const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          {/* <LinkContainer to='/'>
            <Navbar.Brand>Q-shop</Navbar.Brand>
          </LinkContainer> */}
          <Navbar.Brand href='/'>
            <img
              src={Logo}
              alt='logo'
              width='30'
              height='30'
              className='d-inline-block  mx-2 my-2 rounded-circle '
            />
            shop
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/cart'>
                <FaShoppingCart />
                Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <FaUber />
                Sign In
              </Nav.Link>

              {/* <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart mx-1'></i>
                  Cart
                </Nav.Link>
              </LinkContainer> */}

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
