import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../services/allApis'
import { toast } from 'react-toastify'

function Login() {

    const [log,setLog]=useState({
        email:"",password:""
    })

    const navigate=useNavigate()

    const handleLog = async (e) => {
        e.preventDefault()
        console.log(log)
        const { email, password } = log
        if (!email || !password) {
          toast.warning("Enter Email and Password!!")
        }
        else {
          const res = await loginApi(log)
          console.log(res)
          if (res.status === 200) {
            sessionStorage.setItem("currentUser", JSON.stringify(res.data.excistingUser._id))
            sessionStorage.setItem("uname", JSON.stringify(res.data.excistingUser.name));
            setLog({email:"",password:""})
            sessionStorage.setItem("role", res.data.role);
            sessionStorage.setItem("token", res.data.token);
            toast.success("Login Successfull!!")
            setLog({ email: "", password: "" });
            navigate(sessionStorage.getItem("role") === "admin" ? '/admin' : '/col');
           
          }
          else {
            toast.error(res.response.data)
          }
        }
      }


   


    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
            <div className='border shadow p-5 lr-res' style={{width:'500px'}}>
                <h2 className="text-center ht1 mb-4 mt-3">Sign <span className='ht2'>IN</span> </h2>
                <form>
                    
                    <div className="mb-3">

                        <input type="email" id="email" className="form-control ip1" placeholder="Enter your email" onChange={(e)=>setLog({...log,email:e.target.value})} />
                    </div>

                    <div className="mb-3">

                        <input type="password" id="password" className="form-control ip1 " placeholder="Enter your password" onChange={(e)=>setLog({...log,password:e.target.value})} />
                    </div>
                    <div className="d-flex justify-content-between"  >
                    <Link style={{ color: 'rgb(81, 78, 78)'}} to={'/forgotp'}>Forgot Password?</Link>
                    <Link to={'/reg'} style={{ color: 'rgb(81, 78, 78)'}}>New User?</Link>

                    </div>

                    <div className='d-flex justify-content-center'>
                   <button className='button-49' onClick={(e)=>{handleLog(e)}}><span>LOGIN</span></button> 

                </div>
                
                </form>
            </div>

        </div>
    )
}

export default Login