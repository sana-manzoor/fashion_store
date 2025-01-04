import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Productcard from '../Components/Productcard'
import { getLatestp } from '../services/allApis'
import { getbestsell } from '../services/allApis'
import AOS from 'aos'

function Home() {

  const [latp,setLatp]=useState([])

  const [bestsell,setBestsell]=useState([])

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with optional configuration
  }, []);

  const getlatest=async()=>{
    const result=await getLatestp()
    console.log(result)
    setLatp(result.data)
  }

  const getbestsellers=async()=>{
    const result=await getbestsell()
    console.log(result)
    setBestsell(result.data)
  }

  useEffect(()=>{
    getlatest()
    getbestsellers()
  },[])

  console.log(latp)

  
  return (
    <div className='container'>
      <div className="container hhh mb-5 " style={{marginTop:'80px'}}>
        <div className="row "  >
          {/* Column 1 */}
          <div className="col-md-6 border shadow col-12 p-4" >
            <div className="d-flex justify-content-center">
              <div className='text-[#414141]'>
                <div className='flex items-center gap-2 '>
                  <p className='w-8 md:w-11 h-[2px] bg-[#414141]'> </p>
                  <h4 className='font-medium text-sm  mt-5' data-aos="slide-down" data-aos-delay="100">AFFORDABLE FASHION</h4>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed pt-4 mb-5 display-3 hhh2' data-aos="zoom-in-down" data-aos-delay="600" >UNCOMPROMISED Style </h1>

                <div className='flex items-center gap-2'>
                  <p className='font-semibold text-sm'></p>
                  <h4 className='w-8 md:w-11 h-[2px] bg-[#414141]' data-aos="slide-left" data-aos-delay="1200">MODERN YOU</h4>
                </div>
                <div className='d-flex justify-content-center'>
                  <Link to={'col'}> <button className='button-48'><span>EXPLORE</span></button></Link>

                </div>
              </div>
            </div>

          </div>
          {/* Column 2 */}
          <div className="col-md-6 col-12 border shadow bgg p-4" >
            {/* <img src="https://img.freepik.com/free-photo/portrait-man-wearing-sunglasses_23-2149443754.jpg?ga=GA1.1.509451571.1731137306&semt=ais_hybrid" alt="" /> */}
          </div>
        </div>
      </div>


      <div className="mt-4 mb-5 container ">
      <h2 className="text-start ht1" data-aos="fade-down" data-aos-delay="100">Our best <span className='ht2'>SELLERS..</span> </h2>
      <div className='d-flex justify-content-between dd'>
          {
            latp?.map((item)=>(
              <Productcard item={item}/>
            ))
          }
          </div>

      </div>

      <div className="mt-4 mb-5 container">
      <h2 className="text-start ht1" data-aos="fade-down" data-aos-delay="100">Latest <span className='ht2'>COLLECTIONS</span> </h2>
        <div className='d-flex justify-content-between dd'>
          {
            bestsell?.map((item)=>(
              <Productcard item={item}/>
            ))
          }
          </div>


      </div>

      <div className='container'>
        <div className="row mt-3 mb-3">
        <h2 className="ht1" data-aos="fade-down" data-aos-delay="100">We <span className='ht2'>OFFER</span> </h2>

          <div className="col m-5 text-center">
              <img className='imgg' src="https://th.bing.com/th/id/OIP.sZSv9ABIg9pTn1_kKd9A3QHaHa?w=162&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
              <h5>Easy Exchange Policy</h5>
              <p>we offer hussle free exchange policy</p>
          </div>
          <div className="col m-5 text-center">
            <img className='imgg mb-1' src="https://www.steahlyoffroad.com/pub/media/wysiwyg/returns.png" alt="" />
            <h5>7 Days Return Policy</h5>
            <p>We offer 7 days return policy</p>

          </div>
          <div className="col m-5 text-center">
            <img src="https://th.bing.com/th/id/OIP.ZN06e4BTzPq_vWHYrZpL8wHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" className="imgg" />
            <h5>Best Customer Support</h5>
            <p>24/7 Customer Support</p>

          </div>
        </div>
      </div>


    </div>
  )
}

export default Home