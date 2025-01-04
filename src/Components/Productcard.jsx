import React from 'react'
import { Link } from 'react-router-dom'
import './Prodcard.css'
import { BASE_URL } from '../services/baseUrl'
import { useNavigate } from 'react-router-dom'

function Productcard({item}) {

    const navigate=useNavigate()

    const handle = async (id) => {
        localStorage.setItem("id", id)
        navigate('/viewp')
      }

    console.log(item)
    return (
        <div>
            <div class="product-cardd ms-2 me-2">
              <img src={`${BASE_URL}/upload/${item.image}`}   onClick={() => handle(item._id)} alt="Product Image" className="product-image" />
                <div class="product-info">
                    <h3 class="product-title">{item.title}</h3>
                    <p class="product-price">₹{item.price}</p>
                </div>
            </div>

            


        </div>
    )
}

export default Productcard