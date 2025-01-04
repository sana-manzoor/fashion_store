import React, { useEffect, useState } from 'react'
import Productcard from './Productcard'
import { getallp } from '../services/allApis'
import { BASE_URL } from '../services/baseUrl'
import { useNavigate } from 'react-router-dom'
import { addcart } from '../services/allApis'
import { toast } from 'react-toastify'


function Allprod() {

  const [allp, setAllp] = useState([])
  
  const [cart,setCart]=useState({})
  
  const handleSizeSelection = (size) => {
    setCart((prev) => ({ ...prev, size })); 
};


  const addtocart = async (item) => {
      if (!sessionStorage.getItem("currentUser")) {
          toast.warning("Login First!!")
          navigate('/log')
      }
      else if(!cart.size){
        toast.warning("Please choose a size!!")
      }
      else {
          const id = sessionStorage.getItem("currentUser")
          const idd = JSON.parse(id)
          const dataToSend = { pid: item._id, title: item.title, price: item.price, size: cart.size, image: item.image, uid: idd };

          console.log(dataToSend)
          const res1 = await addcart(dataToSend)
          console.log(res1)
          if (res1.status === 200) {
              toast.success("Product added to cart!!")
              setCart((prev) => ({ ...prev, size: null })); 
                 navigate('/cart')
          }
          else {
              toast.error("Product Already exists in cart")
          }
      }
  }

  const allprod = async () => {
    const result = await getallp()
    console.log(result)
    if (result.status === 200) {
      // console.log(result.data)
      setAllp(result.data)
      // console.log(prod)
    }


  }


  const navigate=useNavigate()


  const handle=async(id)=>{
    localStorage.setItem("id",id)
    navigate('/viewp')
  }

  useEffect(() => {
    allprod()
  }, [])

  console.log(allp)

  return (
    <div>
      <div className="row">
        {
          allp?.map(item => (

            <>
              <div className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="product-card shadow-sm rounded">
                  <img src={`${BASE_URL}/upload/${item.image}`} alt="Product" onClick={()=>{handle(item._id)}} className="product-image rounded-top"
                  />
                  <div className="product-info p-3">
                    <h2 className="product-title mb-2 ht1">{item.title}</h2>
                    <p className="product-price ht1 fw-bold">₹{item.price}</p>
                    <select id="size" className="form-select m-2" onChange={(e) => handleSizeSelection(e.target.value)} >
                        <option value="" selected disabled>--Select Size--</option>
                        <option value="S">Small (S)</option>
                        <option value="M">Medium (M)</option>
                        <option value="L">Large (L)</option>
                        <option value="XL">Extra Large (XL)</option>
                    </select>

                    <button className='button-94' onClick={() => { addtocart(item) }}><span>Add to Cart<i className="fa-solid fa-cart-plus fa-lg"></i></span></button>

                  </div>
                </div>
              </div>
            </>
          ))
        }

      </div>


    </div>
  )
}

export default Allprod