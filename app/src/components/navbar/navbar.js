import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import eee from "../../images/logo.png"


function NavScroll() {
  return (
    <Navbar className='mb-2' bg="" expand="lg" style={{backgroundColor:"#afeeee", borderRadius:"10px"}}>
      <Container>
        <Navbar.Brand href="#home"><img  src={eee} width={60} height={60} alt /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Цаг авах</Nav.Link>
            <Nav.Link href="#link">Холбоо барих</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;