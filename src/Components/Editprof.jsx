import React,{useState,useEffect} from 'react'
import Admheader from './Admheader'
import { editprofile } from '../services/allApis'
import { getUser } from '../services/allApis'
import { BASE_URL } from '../services/baseUrl'
import { toast } from 'react-toastify'


function Editprof() {

    
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState("")

    const [editData, setEditData] = useState({})

    const getData = async (id) => {
        const result = await getUser(id)
        console.log(result)
        if (result.status === 200) {

            setEditData(result.data)
            setUser(result.data)
            setPreview(result.data.profile ? `${BASE_URL}/upload/${result.data.profile}` : preview);

        }
        else {
            console.log("err")
        }
    }

    useEffect(() => {
        const excistingUser = JSON.parse(sessionStorage.getItem("currentUser"))
        const id = excistingUser
        console.log(id)
        getData(id)

    }, [])

    // console.log(token)
    useEffect(() => {
        if (editData.profile != user.profile) {
            setPreview(URL.createObjectURL(editData.profile))
        }
    }, [editData.profile])

    const updateProfile = async (e) => {
        e.preventDefault()
        if (!editData.name || !editData.address || !editData.email || !editData.password || !editData.profile ) {
            toast.warning("Enter Valid Values!!")

        }
        else {

            console.log("Valid")
            const udata = new FormData()
            udata.append("name", editData.name)
            udata.append("address", editData.address)
            udata.append("email", editData.email)
            udata.append("password", editData.password)
            udata.append("profile", editData.profile)
            console.log(udata)
            if (!editData.profile) {
                const reqHeader = {
                    "Content-Type": "application/json"
                }
                const res = await editprofile( user._id,udata,reqHeader)
                console.log(res)
                if (res.status == 200) {
                    toast.success("Profile Updated Successfully!!")

                }
                else {
                    toast.error(res.response)
                }
            }
            else {
                const reqHeader = {
                    "Content-Type": "multipart/form-data"
                }
                const res = await editprofile(user._id,udata, reqHeader)
                console.log(res)
                if (res.status == 200) {

                    toast.success("Profile Updated Successfully!!")

                }
                else {
                    toast.error(res.response)
                }
            }

        }
    }



    console.log(editData)

    return (
        <>
        <Admheader />
        <div className="container mb-4" >
                <h2 className="text-center mt-5 ht1">Edit <span className='ht2'>PROFILE</span> </h2>

                <div className='container'>
                    <div className="container hhh  " style={{ marginTop: '19px' }}>
                        <form action="">
                            <div className="row "  >
                                {/* Column 2 */}
                                <div className="col-md-4 col-12  agg p-4" >

                                    <label htmlFor="image">
                                        <input type="file" name="image" id="image" style={{ display: 'none' }} onChange={(e) => { setEditData({ ...editData, profile: e.target.files[0] }) }} />
                                        <img src={preview ?preview :(user.profile ? `${BASE_URL}/upload/${user.profile}` : "https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-rouge.png")} height={'290px'} width={'380px'} alt="" className='img-fluid'  />
                                    </label>

                                </div>


                                {/* Column 1 */}
                                <div className="col-md-6 col-12 p-4" >
                                    <input type="text" name='name' placeholder='Enter the name..' className='form-control m-3' value={editData.name} onChange={(e) => { setEditData({ ...editData, name: e.target.value }) }}/>
                                    <input type="text" name='address' placeholder='Enter the address..' className='form-control m-3' value={editData.address} onChange={(e) => { setEditData({ ...editData, address: e.target.value }) }} />
                                    <input type="email" name='email' placeholder='Enter the email..' className='form-control m-3' value={editData.email} onChange={(e) => { setEditData({ ...editData, email: e.target.value }) }} />
                                    
                                    <input type="password" name="password" placeholder='Enter password' id="" className='form-control m-3' value={editData.password} onChange={(e) => { setEditData({ ...editData, password: e.target.value }) }} />

                                    <div className="d-flex justify-content-center">
                                    <button className='button-49' onClick={(e)=>{updateProfile(e)}}><span>UPDATE</span></button> 

                                    </div>



                                </div>

                            </div>

                        </form>


                    </div>







                </div>

            </div>
        </>
    )
}

export default Editprof