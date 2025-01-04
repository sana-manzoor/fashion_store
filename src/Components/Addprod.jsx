import React, { useState, useEffect } from 'react'
import Admheader from './Admheader'
import { Link } from 'react-router-dom'
import { addProd } from '../services/allApis'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Addprod() {

    const [token, setToken] = useState("")

    const [preview, setPreview] = useState("")

    const navigate = useNavigate()

    const [addp, setAddp] = useState({
        pid: '',
        title: '',
        price: '',
        description: '',
        size: [],
        category: '',
        subcategory: '',
        image: '',
        number: '',
        userId: ''
    })

    const handleAddprod = async (e) => {
        e.preventDefault()
        if (!addp.pid || !addp.title || !addp.price || !addp.description || !addp.category || !addp.size || !addp.subcategory || !addp.number || !addp.userId || !addp.image) {
            toast.warning("Enter Valid Values")

        }
        else {
            // const {title,overview,languages,github,demo,userId,image}=projectDetails
            // console.log(projectDetails)
            const pdata = new FormData()
            pdata.append("pid", addp.pid)
            pdata.append("title", addp.title)
            pdata.append("description", addp.description)
            pdata.append("price", addp.price)
            addp.size.forEach((size) => pdata.append("size[]", size));
            pdata.append("category", addp.category)
            pdata.append("subcategory", addp.subcategory)
            pdata.append("number", addp.number)
            pdata.append("userId", addp.userId)
            pdata.append("image", addp.image)

            console.log(pdata)

            const reqHeader = {
                // "Content-Type":"multipart/form-data","Authorization":`Bearer ${token}`
                "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token} `
            }
            console.log(reqHeader);
            const res = await addProd(pdata, reqHeader)
            console.log(res);
            if (res.status === 200) {
                // setAddProjectResponse(res.data)
                toast.success("Product added successfully..!!")
                setAddp({
                    title: '',
                    price: '',
                    description: '',
                    size: [],
                    category: '',
                    subcategory: '',
                    image: '',
                    number: '',
                    userId: ''
                })

                navigate('/admin')
            }
            else {
                toast.error("Product adding failed..!!")
            }


        }
    }


    useEffect(() => {
        const excistingUser = JSON.parse(sessionStorage.getItem('currentUser'))
        setAddp({ ...addp, userId: excistingUser })
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])

    useEffect(() => {
        if (addp.image) {
            setPreview(URL.createObjectURL(addp.image))
        }
    }, [addp.image])

    console.log(addp)

    return (
        <>
            <Admheader />
            <div className="container mb-2" >
                <h2 className="text-center mt-5 ht1">Add <span className='ht2'>PRODUCT</span> </h2>

                <div className='container'>
                    <div className="container hhh  " style={{ marginTop: '19px' }}>
                        <form action="">
                            <div className="row "  >
                                {/* Column 2 */}
                                <div className="col-md-4 col-12  agg p-4" >

                                    <label htmlFor="image">
                                        <input type="file" name="image" id="image" style={{ display: 'none' }} onChange={(e) => { setAddp({ ...addp, image: e.target.files[0] }) }} />
                                        <img src={preview ? preview : "https://tse2.mm.bing.net/th?id=OIP.XB7cz2tc-c3VbX5OgX80yAHaHa&pid=Api&P=0&h=180"} height={'300px'} alt="" />
                                    </label>

                                </div>


                                {/* Column 1 */}
                                <div className="col-md-6 col-12 p-4" >
                                    <input type="number" name='pid' placeholder='Enter the id..' className='form-control m-3' value={addp.pid} onChange={(e) => { setAddp({ ...addp, pid: e.target.value }) }} />
                                    <input type="text" name='title' placeholder='Enter the title..' className='form-control m-3' value={addp.title} onChange={(e) => { setAddp({ ...addp, title: e.target.value }) }} />
                                    <input type="number" name='price' placeholder='Enter the price..' className='form-control m-3' value={addp.price} onChange={(e) => { setAddp({ ...addp, price: e.target.value }) }} />
                                    <input type="text" name='description' placeholder='Enter the desciption..' className='form-control m-3' value={addp.description} onChange={(e) => { setAddp({ ...addp, description: e.target.value }) }} />
                                    <div className='ms-4'>
                                       
                                        <label className='me-2'>
                                            <input
                                                type="checkbox"
                                                value="small"
                                                checked={addp.size.includes("small")}
                                                onChange={(e) => {
                                                    const newSize = e.target.value;
                                                    setAddp((prev) => ({
                                                        ...prev,
                                                        size: prev.size.includes(newSize)
                                                            ? prev.size.filter((size) => size !== newSize) // Remove if already selected
                                                            : [...prev.size, newSize], // Add if not selected
                                                    }));
                                                }}
                                            />
                                            Small (S)
                                        </label>
                                        <label className='me-2'>
                                            <input
                                                type="checkbox"
                                                value="medium"
                                                checked={addp.size.includes("medium")}
                                                onChange={(e) => {
                                                    const newSize = e.target.value;
                                                    setAddp((prev) => ({
                                                        ...prev,
                                                        size: prev.size.includes(newSize)
                                                            ? prev.size.filter((size) => size !== newSize)
                                                            : [...prev.size, newSize],
                                                    }));
                                                }}
                                            />
                                            Medium (M)
                                        </label>
                                        <label className='me-2'>
                                            <input
                                                type="checkbox"
                                                value="large"
                                                checked={addp.size.includes("large")}
                                                onChange={(e) => {
                                                    const newSize = e.target.value;
                                                    setAddp((prev) => ({
                                                        ...prev,
                                                        size: prev.size.includes(newSize)
                                                            ? prev.size.filter((size) => size !== newSize)
                                                            : [...prev.size, newSize],
                                                    }));
                                                }}
                                            />
                                            Large (L)
                                        </label>
                                        <label className='me-2'>
                                            <input
                                                type="checkbox"
                                                value="xlarge"
                                                checked={addp.size.includes("xlarge")}
                                                onChange={(e) => {
                                                    const newSize = e.target.value;
                                                    setAddp((prev) => ({
                                                        ...prev,
                                                        size: prev.size.includes(newSize)
                                                            ? prev.size.filter((size) => size !== newSize)
                                                            : [...prev.size, newSize],
                                                    }));
                                                }}
                                            />
                                            Extra Large (XL)
                                        </label>
                                    </div>
                                    <div className="d-flex justify-content-center m-3">
                                        {/* <input type="text" placeholder='enter Category' className='form-control ' value={addp.category} onChange={(e) => { setAddp({ ...addp, category: e.target.value }) }} /> */}
                                        <select id="size" className=" form-select" value={addp.category} onChange={(e) => { setAddp({ ...addp, category: e.target.value }) }} >
                                            <option value="" selected disabled>-Select Category-</option>
                                            <option value="men">Men</option>
                                            <option value="women">Women</option>
                                            <option value="kids">Kids</option>
                                        </select>
                                        {/* <input type="text" placeholder='enter sub category' className='form-control ms-4 ' value={addp.subcategory} onChange={(e) => { setAddp({ ...addp, subcategory: e.target.value }) }} /> */}
                                        <select id="size" className="ms-3 form-select" value={addp.subcategory} onChange={(e) => { setAddp({ ...addp, subcategory: e.target.value }) }} >
                                            <option value="" selected disabled>-Select Subcategory-</option>
                                            <option value="topwear">Top Wear</option>
                                            <option value="bottomwear">Bottom Wear</option>
                                            <option value="winterwear">Winter Wear</option>
                                        </select>
                                    </div>
                                    <input type="number" name="number" placeholder='Enter product count' id="" className='form-control m-3' value={addp.number} onChange={(e) => { setAddp({ ...addp, number: e.target.value }) }} />


                                    <button className='button-49' onClick={(e) => { handleAddprod(e) }}><span>Add</span></button>



                                </div>

                            </div>

                        </form>


                    </div>







                </div>

            </div>
        </>

    )
}

export default Addprod