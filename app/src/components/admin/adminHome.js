import Admin from "./addTime";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import eee from "../../images/logo.png"
import AddWorker from "./addWorker";
import {Routes, Route, Switch, Link } from "react-router-dom";
import AddTime from "./addTime";
import AddJob from "./addJob";
import AddImage from "./addBanner";


function AdminHome() {
    return ( 
    <>
     <div className=''>
            <Navbar className='mb-2' bg="" expand="lg" style={{backgroundColor:"#afeeee", borderRadius:"10px"}}>
                <Container>
                <Navbar.Brand href="#home"><img  src={eee} width={60} height={60} alt /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link ><Link to="/addtime" style={{textDecoration:"none", color:"black"}}>Цаг Нэмэх</Link></Nav.Link>
                    <Nav.Link ><Link to="/addworker" style={{textDecoration:"none", color:"black"}}>Төрөл нэмэх</Link></Nav.Link>
                    <Nav.Link ><Link to="/addjob" style={{textDecoration:"none", color:"black"}}>Ажилтан нэмэх</Link></Nav.Link>
                    <Nav.Link ><Link to="/addbanner" style={{textDecoration:"none", color:"black"}}>Баннер нэмэх</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
   
   
    
    </div>
    
    
    
    </> );
}

export default AdminHome;