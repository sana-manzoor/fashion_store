import React, { useEffect, useState } from 'react'
import Productcard from './Productcard'
import { getPro } from '../services/allApis'
import { BASE_URL } from '../services/baseUrl'
import { getrelpro } from '../services/allApis'
import { useNavigate } from 'react-router-dom'
import './viewp.css'
import { addcart } from '../services/allApis'
import { toast } from 'react-toastify'



function Viewprod() {

    const [data, setData] = useState({})

    const [cart, setCart] = useState({})

    const [reldata, setReldata] = useState([])
    const navigate = useNavigate()

    const getProduct = async (id) => {
        const result = await getPro(id)
        console.log(result)
        setData(result.data)
        getrelProduct(result.data.category)
        localStorage.clear()

    }

    const handle = async (id) => {

        getProduct(id)
    }


    const getrelProduct = async (id) => {
        const result = await getrelpro(id)
        console.log(result)
        setReldata(result.data)
    }


    const addtocart = async (item) => {
        if (!sessionStorage.getItem("currentUser")) {
            toast.warning("Login First!!")
            navigate('/log')
        }
        else {
            const id = sessionStorage.getItem("currentUser")
            const idd = JSON.parse(id)
            const dataToSend = { pid: data._id, title: data.title, price: data.price, size: cart.size, image: data.image, uid: idd };

            console.log(dataToSend)
            const res1 = await addcart(dataToSend)
            console.log(res1)
            if (res1.status === 200) {
                toast.success("data added to cart!!")
                navigate('/cart')
            }
            else {
                toast.error("Product Already excists in cart")
            }
        }
    }

    useEffect(() => {
        if (localStorage.getItem("id")) {
            const id = localStorage.getItem("id")
            getProduct(id)
        }


    }, [])
    console.log(reldata)

    return (

        <div className="container mb-5" style={{ marginTop: '80px', minHeight: '500px' }}>
            <div className="row gx-4 gx-lg-5 mb-4 align-items-center">
                <div className="  col-md-6">
                    <img className="card-img-top mb-5 mb-md-0" src={`${BASE_URL}/upload/${data.image}`} alt="..." height={'480px'} />
                </div>
                <div className="  col-md-6">
                    {/* <div className="small mb-1">Product Id: 23</div> */}
                    <h2 className="display-5 fw-bolder ht1 mb-3">{data.title}</h2>
                    <div className='mb-3' >
                        <i className="fas fa-star" style={{ color: "rgb(159, 5, 5)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(159, 5, 5)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(159, 5, 5)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(159, 5, 5)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "#E89595" }}></i>
                    </div>
                    <div className="fs-5 mb-4">
                        <h3 className='ht1'>₹{data.price}</h3>
                    </div>
                    <p className="lead">{data.description}</p>
                    <h6>Select Size:</h6>
                    <select id="size" className="form-select mt-4 mb-4" onChange={(e) => { setCart({ ...cart, size: e.target.value }) }} >
                        <option value="" selected disabled>--Select--</option>
                        {data.size?.map((size) => (
                          <option key={size} value={size}>
                            {size === "S"
                              ? "Small (S)"
                              : size === "M"
                                ? "Medium (M)"
                                : size === "L"
                                  ? "Large (L)"
                                  : size === "XL"
                                    ? "Extra Large (XL)"
                                    : size}
                          </option>
                        ))}
                    </select>

                    <div className='d-flex justify-content-start'>
                        <button className='button-49' onClick={() => { addtocart(data) }}><span>Add to Cart<i className="fa-solid fa-cart-plus fa-lg"></i></span></button>
                    </div>


                    <div>
                        {/* <h4>Images</h4>
                    {
                        data?.images.length >0 &&
                        data?.images.map(item=>(
                            <img src={item} height={'100px'} width={'100px'} />
                        ))
                    } */}
                    </div>
                    {/* <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-dark"   ><i className="fa-solid fa-lg fa-heart-circle-plus" style={{color: '#ec1387'}}></i></button>
                        <button className="btn btn-outline-dark"  ><i className="fa-solid fa-cart-plus fa-lg"></i></button>
                </div> */}
                </div>


            </div>

            <h2 className="text-center ht1 mb-4 mt-5">Related <span className='ht2'>PRODUCTS</span> </h2>
            <div className="row">
                {
                    reldata?.map(item => (

                        <>
                            <div className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4">
                                <div className="product-card shadow-sm rounded">
                                    <img src={`${BASE_URL}/upload/${item.image}`} alt="Product" onClick={() => { handle(item._id) }} className="product-image rounded-top"
                                    />
                                    <div className="product-info p-3">
                                        <h2 className="product-title mb-2 ht1">{item.title}</h2>
                                        <p className="product-price ht1 fw-bold">₹{item.price}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                }

            </div>

            {/*             
            <div className="container">
                
                <Productcard />
            </div> */}

        </div>
    )
}

export default Viewprod