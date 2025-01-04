import React from 'react'
import { Link } from 'react-router-dom'

function Contact() {
  return (
    <div className="container mb-5" style={{ marginTop: '80px', minHeight: '400px' }}>
      <div className="container hhh mb-5 " style={{ marginTop: '80px' }}>
        <div className="row "  >
          <div className="col-md-6 col-12 bgg3 p-4" >
            {/* <img src="https://img.freepik.com/free-photo/portrait-man-wearing-sunglasses_23-2149443754.jpg?ga=GA1.1.509451571.1731137306&semt=ais_hybrid" alt="" /> */}
          </div>

          <div className="col-md-6 col-12 p-4" >
            <h2 className="text-center ht1">Contact <span className='ht2'>US</span> </h2>
            <div className="container">
              <div className=" p-4">
                <h3 className="text-start mb-4">Our <span className='ht2'>STORE</span></h3>
                <div className="mb-3">
                  <i className="fas fa-map-marker-alt me-2" style={{ color: 'rgb(159, 5, 5)'}}></i>
                  <span>670102,Thalassery,Kannur,Kerala,India</span>
                </div>
                <div className="mb-3">
                  <i className="fas fa-phone-alt me-2" style={{ color: 'rgb(159, 5, 5)'}}></i>
                  <span>+91 9977886655</span>
                </div>
                <div>
                  <i className="fas fa-envelope me-2" style={{ color: 'rgb(159, 5, 5)'}}></i>
                  <span>fasion_store@gmail.com</span>
                </div>
              </div>
            </div>
            <div className='p-4'>
            <h3 className="text-start">Careers with<span className='ht2'> US</span></h3>
            <p>Learn more about our company culture and open positions</p>
            <div className='d-flex justify-content-center'>
                  <Link> <button className='button-48'><span>EXPLORE CAREERS</span></button></Link>

                </div>


            </div>
          
          </div>


        </div>
      </div>






    </div>
  )
}

export default Contact