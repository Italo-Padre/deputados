import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';


const Pagina = (props) => {
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
              <NavDropdown.Item href="#action3">Quiz</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Comparador</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Pesquisar"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark">Pesquisar</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/><br/><br/>
    </div>
  )
}

export default Pagina