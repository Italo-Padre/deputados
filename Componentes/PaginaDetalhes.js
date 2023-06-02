import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';

const PaginaDetalhes = (props) => {
  return (
    <div>
                <Navbar fixed="top" bg="success" expand="lg">
      <Container fluid>
        <Navbar.Brand>{props.titulo}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Pagina Inicial</Nav.Link>
            <Nav.Link href="/comparador">Comparador</Nav.Link>
            <NavDropdown title="Projetos" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/quiz">Quiz</NavDropdown.Item>
              <NavDropdown.Item href="/comparador">Comparador</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/><br/><br/>
    <Container>

    {props.children}
    </Container>
    </div>
  )
}

export default PaginaDetalhes