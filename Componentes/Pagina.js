import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';


const Pagina = (props) => {
  
  return (
    <div>
         <Navbar fixed="top" bg="success" expand="lg">
      <Container fluid>
        <Navbar.Brand className='text-white'>{props.titulo}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='text-white' href="/">Pagina Inicial</Nav.Link>
            <Nav.Link className='text-white' href="/comparador">Comparador</Nav.Link>
            <Nav.Link className='text-white' href="/quiz">Quiz</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Pesquisar"
              className="me-2"
              aria-label="Search"
              value={props.value}
              onChange={props.onChange}
            />
            
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/><br/><br/>
    </div>
  )
}

export default Pagina