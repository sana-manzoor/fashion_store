import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import { Navbar } from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Admheader from '../Components/Admheader'

function Admin() {
    return (
        <div  style={{ minHeight: '80vh' }}>
            {/* <Sidebar /> */}
           
            <div>
         <Admheader/>

                <div className='container'>

                    <h2 className="text-start mt-3 ht1">Welcome  <span className='ht2'>ADMIN</span> </h2>

                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-md-4" >
                                
                                <div className="card text-light  mb-3" style={{ backgroundColor: 'rgb(159, 5, 5)',height:'180px' }}>
                                    <Link to={'/addp'} className='text-decoration-none'>
                                    <div className="card-body text-light p-5 text-center">
                                        <h3><i className="fa-solid fa-shirt fa-xl"></i></h3>
                                        <h4>Add Products</h4>

                                    </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card text-light  mb-3" style={{ backgroundColor: 'rgb(159, 5, 5)',height:'180px'  }}>
                                <Link to={'/viewu'} className='text-decoration-none'> 
                                    <div className="card-body p-5 text-light text-center">
                                        <h3><i className="fa-regular fa-user fa-xl"></i></h3>
                                        <h4>View Users</h4>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card text-light  mb-3" style={{ backgroundColor: 'rgb(159, 5, 5)',height:'180px'  }}>
                                <Link to={'/viewallp'} className='text-decoration-none'>
                                    <div className="card-body p-5 text-light text-center">
                                        <h3><i className="fa-solid fa-shirt fa-xl"></i></h3>
                                        <h4>View Products</h4>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="container ">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card text-light  mb-3" style={{ backgroundColor: 'rgb(159, 5, 5)',height:'180px'  }}>
                                <Link to={'/editprof'} className='text-decoration-none'>
                                    <div className="card-body p-5 text-light text-center">
                                        <h3><i className="fa-regular fa-address-card fa-xl"></i></h3>
                                        <h4>View Profile</h4>

                                    </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card text-light  mb-3" style={{ backgroundColor: 'rgb(159, 5, 5)',height:'180px'  }}>
                                <Link to={'/viewallord'} className='text-decoration-none'>
                                    <div className="card-body p-5 text-light text-center">
                                        <h3><i className="fa-solid fa-cart-shopping fa-xl"></i></h3>
                                        <h4>View Orders</h4>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Admin