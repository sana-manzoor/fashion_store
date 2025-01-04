import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { changePass } from '../services/allApis';
import { toast } from 'react-toastify'



function Changep() {

    const [password, setPassword] = useState();

    const [cpassword, setCpassword] = useState()

    const navigate=useNavigate()
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const id = JSON.parse(localStorage.getItem("user"))
      console.log(id)

        if(password != cpassword){
           toast.warning("Password and Confirm Password are not same..")
        }
        else{
      const result=await changePass(id,{password})
      console.log(result)
      if(result.status===200){
        toast.success("Password changed Successfully..")
        localStorage.clear()
        navigate('/log')
      }
    }
    };

    console.log(password)
    console.log(cpassword)
  return (
    <div className="container hhh mb-5 " style={{ marginTop: '80px', minHeight: '60vh' }}>
            <div className="d-flex justify-content-center align-items-center " style={{ height: '390px' }}>
                <div className="container border shadow " style={{width:'600px'}}>
                <h2 className="text-center ht1 m-4">Change <span className='ht2'>PASSWORD..</span> </h2>
               <div className="container mx-auto">
               <form action="">
                    <input type="password" placeholder='Enter new Password'name='password' onChange={(e)=>setPassword(e.target.value)}  className='form-control mt-3' />
                    <input type="password" placeholder='Confirm Password' name='cpassword' onChange={(e)=>setCpassword(e.target.value)} className='form-control mt-3 mb-4' />
                </form>
               </div>
               <div className="d-flex justify-content-center m-4">
                   <button className="button-49" onClick={(e)=>{handleSubmit(e)}}> <span>Submit</span> </button>
               </div>
                </div>
            </div>
        </div>
        

  )
}

export default Changep