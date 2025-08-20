// src/components/Navbar.jsx
// Barra de navegación con link a Home y a Favoritos (con contador).

import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function AppNavbar() {
  const { state } = useStore();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Link a Home */}
        <Navbar.Brand as={Link} to="/">SW Blog</Navbar.Brand>

        {/* Link a Favoritos con contador */}
        <Nav>
          <Nav.Link as={Link} to="/favorites">
            Favoritos{" "}
            <Badge bg="light" text="dark">
              {state.favorites.length}
            </Badge>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
