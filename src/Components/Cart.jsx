import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../services/baseUrl'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getcart } from '../services/allApis'
import { incrcart } from '../services/allApis'
import { deletecartApi } from '../services/allApis'
import { decrcart } from '../services/allApis'
import { useMemo } from 'react'

function Cart() {

    const [cartlist, setCartlist] = useState([])

    const [total, setTotal] = useState(0)

    const [uid, setUid] = useState("")

    const userid = () => {
        if (sessionStorage.getItem("currentUser")) {
            const uu = JSON.parse(sessionStorage.getItem("currentUser"))
            // console.log(uu)
            setUid(uu)
        }
    }

    const navigate = useNavigate()


    const cartss = async () => {
        console.log(uid)
        const result = await getcart(uid)
        console.log(result)
        if (result.status === 200) {
            console.log(result.data)
            setCartlist(result.data)
        }
        else {
            console.log(result)
        }
    }



    const deletecartt = async (id) => {
        // console.log(id)
        const res = await deletecartApi(id)
        console.log(res)
        if (res.status === 200) {

            cartss()
        }
    }

    const increasee = async (id) => {
        const res = await incrcart(id)
        console.log(res)
        cartss()
    }

    const decreasee = async (id) => {
        const res = await decrcart(id)
        console.log(res)
        cartss()
    }

    const handletot = () => {
        if (total) {
            localStorage.setItem("amount", JSON.stringify(total))

        }
    }


    useEffect(() => {
        userid()
        cartss()
    }, [uid])

    useMemo(() => {
        const totalAmount = cartlist?.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalAmount || 0);

    }, [cartlist]);


    return (
        <>
            {
                                        cartlist?.map((item, index) => (
                                            <tr>
                                                <td  style={{fontSize:'10px'}}>{index + 1}</td>
                                                <td style={{fontSize:'11px'}}>{item.title}</td>
                                                <td className='d-flex justify-content-center'>
                                                    <img src={`${BASE_URL}/upload/${item.image}`} className='c-img' alt="" />
                                                </td>
                                                {/* <!-- <td>{{i.price}}</td> --> */}
                                                <td> {item.price}</td>
                                                <td>
                                                    <div  style={{fontSize:'15px'}}>
                                                        <button className="btn"  style={{fontSize:'10px'}} onClick={() => { increasee(item._id) }} >+</button>
                                                        {item.quantity}
                                                        <button className="btn"  style={{fontSize:'10px'}} onClick={() => { decreasee(item._id) }} >-</button>

                                                    </div>

                                                </td>

                                                <td onClick={() => { deletecartt(item._id) }} ><i className="fa-solid fa-trash fa-lg" style={{ cursor: 'pointer' }} ></i></td>
                                            </tr>


                                        ))
                                    }
                                </tbody>



                            </table>



                        </div>

                        <div className="col-md-3 ms-2">
                            <div className="card mt-5 shadow">
                                <div className=" container card-body">
                                    <h3 className="text-center ht1 m-4">cart <span className='ht2'>SUMMARY..</span> </h3>
                                    <hr />
                                    <h5 className="card-text  ht1">
                                        <strong>Total Products:</strong> <span>{cartlist?.length || 0}</span>
                                    </h5>
                                    {cartlist?.length > 0 ? (
                                        <h5 className=" card-text ht1">
                                            <strong>Total Amount:</strong> ₹{total || 0}
                                        </h5>
                                    ) : (
                                        <p className=" text-muted">No items in the cart.</p>
                                    )}

                                    <div className="d-flex justify-content-center  py-3">
                                        <Link to="/pay">
                                            <button className="button-94" onClick={handletot}>
                                               <span> Proceed to Checkout</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>


                        </div>


                    </div>
                    :


                    <div style={{ height: '80vh' }} className="d-flex justify-content-center align-items-center">
                        <h2 className='text-center '>No Cart Summary....<Link to={'/col'}><span className='text-dark' style={{ textDecoration: 'underline' }}>Click here to shop!!</span></Link></h2>
                    </div>


            }
        </>
    )
}

export default Cart
