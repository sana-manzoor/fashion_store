import React from 'react'
import { Link } from 'react-router-dom'
import './About.css'

function About() {
  return (
    <div className="container mb-5" style={{ marginTop: '80px', minHeight: '400px' }}>
      <div className="container hhh mb-5 " style={{ marginTop: '80px' }}>
        <div className="row "  >
          {/* Column 1 */}
          <div className="col-md-6 col-12 p-4" >
            <h2 className="text-center ht1">About <span className='ht2'>US</span> </h2>
            <p>Welcome to FASHION_STORE, where style meets individuality.For us, we believe clothing is more than just fabric—it’s an expression of who you are. That’s why every piece in our collection is crafted with precision, from sourcing the finest materials to ensuring exceptional attention to detail.</p>

            <p>Whether you’re dressing up for an event or refreshing your everyday wardrobe, our pieces are designed to make you look and feel your best. At our store, we’re dedicated to offering an exceptional shopping experience, from easy browsing to seamless checkout and reliable delivery.</p>

            <h2 className="text-center ht1">Our <span className='ht2'>MISSION</span> </h2>
            <p>To inspire confidence and self-expression through versatile and comfortable fashion, empowering our customers to feel their best every day.To empower individuals through fashion, helping them express their unique style with confidence.</p>

          </div>
          {/* Column 2 */}
          <div className="col-md-6 col-12 bgg2 p-4" >
            {/* <img src="https://img.freepik.com/free-photo/portrait-man-wearing-sunglasses_23-2149443754.jpg?ga=GA1.1.509451571.1731137306&semt=ais_hybrid" alt="" /> */}
          </div>
        </div>
      </div>


      <h2 className="text-center ht1 mb-5">
  Why <span className="ht2">CHOOSE US?</span>
</h2>
<div className="row text-center">
  <div className="col-md-3 mb-4">
    <div className="p-4 border rounded shadow-sm">
      <i className="fa-solid fa-star fa-2x mb-3" style={{ color: 'rgb(159, 5, 5)' }}></i>
      <h5>Quality Assurance</h5>
      <p className="text-muted">We use premium materials to ensure top-notch quality and durability in every product.</p>
    </div>
  </div>
  <div className="col-md-3 mb-4">
    <div className="p-4 border rounded shadow-sm">
      <i className="fa-solid fa-leaf fa-2x mb-3" style={{ color:'rgb(159, 5, 5)' }}></i>
      <h5>Sustainability</h5>
      <p className="text-muted">Committed to eco-friendly practices and sustainable sourcing for a greener future.</p>
    </div>
  </div>
  <div className="col-md-3 mb-4">
    <div className="p-4 border rounded shadow-sm">
      <i className="fa-solid fa-wallet fa-2x mb-3" style={{ color: 'rgb(159, 5, 5)'}}></i>
      <h5>Affordable Luxury</h5>
      <p className="text-muted">Experience luxurious fashion and quality products at prices that don’t break the bank.</p>
    </div>
  </div>
  <div className="col-md-3 mb-4">
    <div className="p-4 border rounded shadow-sm">
    <i className="fa-solid fa-shirt fa-2x mb-3" style={{ color: 'rgb(159, 5, 5)'}}></i>
      <h5>Inclusive Designs</h5>
      <p className="text-muted">Our collections cater to all sizes, styles, and preferences, celebrating diversity and individuality.</p>
    </div>
  </div>
</div>



    </div >
  )
}

export default About

