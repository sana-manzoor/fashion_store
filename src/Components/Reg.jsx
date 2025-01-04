import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../services/allApis'
import { toast } from 'react-toastify'


function Reg() {

    const [reg, setReg] = useState({
        name: "",
        address: "",
        email: "",
        password: ""
    })

    const [valn, setValn] = useState(true)
    const [vala, setVala] = useState(true)
    const [vale, setVale] = useState(true)
    const [valp, setValp] = useState(true)


    const handleDetails = (e) => {
        const { name, value } = e.target

        if (name == 'name') {
            if (!!value.match(/^[a-z0-9]/)) {
                setReg({ ...reg, [name]: value })
                setValn(true)

            }
            else {
                setReg({ ...reg, [name]: value })
                setValn(false)
            }
        }
        else if (name == 'address') {
            if (!!value.match(/^[a-z]{4,}$/)) {
                setReg({ ...reg, [name]: value })
                setVala(true)

            }
            else {
                setReg({ ...reg, [name]: value })
                setVala(false)
            }

        }
        else if (name == 'email') {
            if (!!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                setReg({ ...reg, [name]: value })
                setVale(true)

            }
            else {
                setReg({ ...reg, [name]: value })
                setVale(false)
            }

        }
        else {
            if (name == 'password' && !!value.match(/^[a-z0-9_$&-]{5,}$/)) {
                setReg({ ...reg, [name]: value })
                setValp(true)

            }
            else {
                setReg({ ...reg, [name]: value })
                setValp(false)
            }

        }
    }


    const registerem = async (e) => {
        e.preventDefault()
        if (!reg.name || !reg.address || !reg.email || !reg.password) {
            toast.warning("enter all values")
        }
        else {
            const result = await register(reg)
            console.log(reg)
            toast.success("Verification mail send to your email..")

        }
    }

    console.log(reg)
    return (
        <div>
            <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
                <div className='border shadow p-5' style={{ width: '500px' }}>
                    <h2 className="text-center ht1 mb-4 mt-3">Sign <span className='ht2'>UP</span> </h2>
                    <form>
                        <div className="mb-3">

                            <input type="text" name='name' id="name" className="form-control ip1" placeholder="Enter your name" onChange={(e) => handleDetails(e)} />
                            {

                                !valn &&
                                <div className='text-danger'>
                                    *invalid name

                                </div>
                            }
                        </div>


                        <div className="mb-3">

                            <input type="text" name='address' id="address" className="form-control ip1" placeholder="Enter your address" onChange={(e) => handleDetails(e)} />
                            {
                         
                         !vala &&
                         <div className='text-danger'>
                             *invalid address

                         </div>
                     }

                        </div>
                    
                        <div className="mb-3">

                            <input type="email" id="email" name='email' className="form-control ip1" placeholder="Enter your email" onChange={(e) => handleDetails(e)} />
                            {
                
                !vale &&
                <div className='text-danger'>
                    *Enter a valid email

                </div>
            }
                        </div>
                      

                        <div className="mb-3">

                            <input type="password" name='password' id="password" className="form-control ip1 " placeholder="Enter your password" onChange={(e) => handleDetails(e)} />
                            {
                           
                           !valp &&
                           <div className='text-danger'>
                               *Password should contain min 5 characters with digits or underscore

                           </div>
                       }
                       
                        </div>
                        <div className="d-flex justify-content-end"  >
                            <Link to={'/log'} style={{ color: 'rgb(81, 78, 78)' }}>Already a User?</Link>

                        </div>
                       

                        <div className='d-flex justify-content-center'>
                            <button className='button-49' onClick={(e) => { registerem(e) }}><span>REGISTER</span></button>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Reg