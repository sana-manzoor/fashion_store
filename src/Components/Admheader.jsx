import React from 'react'
import { Navbar } from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Admheader() {

    const navigate=useNavigate()

  const logout=async()=>{
    sessionStorage.clear()
    navigate('/log')
  }

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <h3 href="#home" className='hh'>FASHION_STORE</ h3>
                <div className='btn text-light' style={{fontSize:'16px',backgroundColor:'rgb(159, 5, 5)',textDecoration:'none',marginLeft:'28px',cursor:'pointer'}} onClick={logout}>LOGOUT</div>

            </Container>
        </Navbar>
    )
}

export default Admheader