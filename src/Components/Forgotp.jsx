import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Verifyem } from '../services/allApis'
import { toast } from 'react-toastify'


function Forgotp() {

    const [data,setData]=useState({
        name:"",
        email:""
    })

    const navigate=useNavigate()

    const Handlesubmit=async(e)=>{
        e.preventDefault()
        const result=await Verifyem(data)
        console.log(result)
        if(result.status==200){
            toast.success("User verified successfullyy")
            localStorage.setItem("user",JSON.stringify(result.data._id))
            navigate('/changep')
        }
        else{
            toast.error("Username/Email not verified!!")
        }
    }

    console.log(data)
    return (
        <div className="container hhh mb-5 " style={{ marginTop: '80px', minHeight: '60vh' }}>
            <div className="d-flex justify-content-center align-items-center " style={{ height: '390px' }}>
                <div className="container border shadow " style={{width:'600px'}}>
                <h2 className="text-center ht1 m-4">Forgot <span className='ht2'>PASSWORD?</span> </h2>
               <div className="container mx-auto">
               <form action="">
                    <input type="text" placeholder='Enter username'name='name' onChange={(e)=>{setData({...data,name:e.target.value})}}  className='form-control mt-3' />
                    <input type="email" placeholder='Enter email' name='email' onChange={(e)=>{setData({...data,email:e.target.value})}} className='form-control mt-3 mb-4' />
                </form>
               </div>
               <div className="d-flex justify-content-center m-4">
                   <button className="button-49" onClick={(e)=>{Handlesubmit(e)}}> <span>Submit</span></button>
               </div>
                </div>
            </div>
        </div>
    )
}

export default Forgotp