import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate=useNavigate()

  const logout=async()=>{
    sessionStorage.clear()
    navigate('/log')
  }

  return (
    <div className='fixed-top conatiner'>
     
     <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <h3 href="#home" className='hh'>FASHION_STORE</ h3>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-auto">
        
            
          </Nav>
          <Nav className="me-auto">
          <Link className='lk' style={{fontSize:'16px',color:'rgb(159, 5, 5)',textDecoration:'none',marginLeft:'28px'}}  to={'/'}>HOME</Link>
          <Link className='lk' style={{fontSize:'16px',color:'rgb(159, 5, 5)',textDecoration:'none',marginLeft:'28px'}} to={'col'}>COLLECTIONS</Link>
          <Link className='lk' style={{fontSize:'16px',color:'rgb(159, 5, 5)',textDecoration:'none',marginLeft:'28px'}}  to={'abt'}>ABOUT</Link>
          <Link className='lk' style={{fontSize:'16px',color:'rgb(159, 5, 5)',textDecoration:'none',marginLeft:'28px'}}  to={'con'}>CONTACT</Link>
          <Link className='lk' style={{fontSize:'16px',color:'rgb(159, 5, 5)',textDecoration:'none',marginLeft:'28px'}}  to={'cart'}>CART</Link>

          {
            sessionStorage.getItem("currentUser") ?
            <div className='lk' style={{fontSize:'16px',color:'rgb(159, 5, 5)',textDecoration:'none',marginLeft:'28px',cursor:'pointer'}} onClick={logout}>LOGOUT</div>
            :
            <Link className='lk' style={{fontSize:'16px',color:'rgb(159, 5, 5)',textDecoration:'none',marginLeft:'28px'}}  to={'log'}>LOGIN</Link>


          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    </div>
  )
}

export default Header