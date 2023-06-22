import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext.js';

export default function AppNavBar() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            ASTER
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {!user.isAdmin && (
              <Nav.Link as={NavLink} to="/products">
                Products
              </Nav.Link>
            )}
            {!user.isAdmin && user.id && (
              <Nav.Link as={NavLink} to="/cart">
                Cart
              </Nav.Link>
            )}
            {user.isAdmin && (
              <Nav.Link as={NavLink} to="/admin">
                Admin Dashboard
              </Nav.Link>
            )}
            {!user.id ? (
              <>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/logout">
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
