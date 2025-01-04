import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { BASE_URL } from '../services/baseUrl';
import { editprod } from '../services/allApis';
import { toast } from 'react-toastify'



function Editprod({ prod }) {


    const [show, setShow] = useState(false);

    const [preview, setPreview] = useState("")

    const handleClose = () => {
        setShow(false);
        setPreview("")
    }
    const handleShow = () => setShow(true);
    


    const [token, setToken] = useState("")

    const [editData, setEditData] = useState({
        pid: prod.pid, title: prod.title, price: prod.price, number: prod.number, category: prod.category, subcategory: prod.subcategory, description: prod.description, userId: prod.userId, image: prod.image

    })



    useEffect(() => {
        const excistingUser = JSON.parse(sessionStorage.getItem("currentUser"))
        setEditData({ ...editData, userId: excistingUser })
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])

    // console.log(token)
    useEffect(() => {
        if (editData.image != prod.image) {
            setPreview(URL.createObjectURL(editData.image))
        }
    }, [editData.image])


    const updateprod = async () => {

        console.log("Valid")
        const pdata = new FormData()
        pdata.append("pid", editData.pid)
        pdata.append("title", editData.title)
        pdata.append("description", editData.description)
        pdata.append("price", editData.price)
        pdata.append("size", editData.size)
        pdata.append("category", editData.category)
        pdata.append("subcategory", editData.subcategory)
        pdata.append("number", editData.number)
        pdata.append("image", editData.image)
        pdata.append("userId", editData.userId)
        console.log(pdata)
        if (editData.image == prod.image) {
            const reqHeader = {
                "Content-Type": "application/json", "Authorization": `Bearer ${token} `
            }
            console.log(reqHeader)
            const res = await editprod(prod._id,pdata,reqHeader)
            console.log(res)
            if (res.status == 200) {

                toast.success("prod Updated Successfully!!")
                handleClose()
            }
            else {
                toast.error(res.response)
            }
        }
        else {
            const reqHeader = {
                "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token} `
            }
            const res = await editprod( prod._id,pdata,reqHeader)
            console.log(res)
            if (res.status == 200) {
                toast.success("prod Updated Successfully!!")
                handleClose()
            }
            else {
                toast.error(res.response)
            }
        }

    }

    

 

    return (
        <div>
            <div>
                <>
                    
                    <button className="btn"> <i className="fa-regular fa-pen-to-square fa-lg" onClick={handleShow} ></i></button> 

                    <Modal className='modal-xl'
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header >
                        <h2 className="text-center ht1 ">Edit <span className='ht2'>Product</span> </h2>

                        </Modal.Header>
                        <Modal.Body>

                            <div className='row align-items-center'>
                                <div className='col-lg-4'>
                                    <label htmlFor="food">
                                        <input type="file" id='food' style={{ display: 'none' }} onChange={(e) => setEditData({ ...editData, image: e.target.files[0] })} />
                                        <img src={preview ? preview : `${BASE_URL}/upload/${prod.image}`} className='img-fluid' alt="" style={{ width: '400px' }} />
                                    </label>
                                </div>
                                <div className='col-lg-8 p-4'>
                                    <div className='d-flex align-items-center flex-column'>


                                        <form className='w-100  mt-4'>
                                            <Form>
                                                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                        Pid:
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control type="number" placeholder="enter pid" defaultValue={prod.pid} onChange={(e) => setEditData({ ...editData, pid: e.target.value })} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                        Title:
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control type="text" placeholder="title" defaultValue={prod.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput2">
                                                    <Form.Label style={{ fontSize: '17px', fontWeight: '400' }} column sm="2">
                                                        Description:
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control type="text" placeholder="Author" defaultValue={prod.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput3">
                                                    <Form.Label style={{ fontSize: '17px', fontWeight: '400' }} column sm="2">
                                                        Price:
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control type="number" placeholder="enter price" defaultValue={prod.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput4">
                                                    <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                        Size:
                                                    </Form.Label>
                                                    <Col sm="10">

                                                        <select id="size" className=" form-select  " defaultValue={prod.size} onChange={(e) => { setEditData({ ...editData, size: e.target.value }) }} >
                                                            <option value="" selected disabled>--Select Size--</option>
                                                            <option value="small">Small (S)</option>
                                                            <option value="medium">Medium (M)</option>
                                                            <option value="large">Large (L)</option>
                                                            <option value="xlarge">Extra Large (XL)</option>
                                                        </select>                                                </Col>
                                                </Form.Group>


                                                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput4">
                                                    <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                        Category:
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control type="text" placeholder="category" defaultValue={prod.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput4">
                                                    <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                        Subcategory:
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control type="text" placeholder="subcategory" defaultValue={prod.subcategory} onChange={(e) => setEditData({ ...editData, subcategory: e.target.value })} />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput4">
                                                    <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                        Number:
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control type="number" placeholder="number of copies" defaultValue={prod.number} onChange={(e) => setEditData({ ...editData, number: e.target.value })} />
                                                    </Col>
                                                </Form.Group>
                                            </Form>


                                        </form><br />




                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-dark" className='btn btn-lg' style={{ textAlign: 'center' }} onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="outline-dark" className='btn btn-lg' style={{ textAlign: 'center' }} onClick={updateprod} >Update</Button>

                        </Modal.Footer>
                    </Modal>
                </>
            </div>
        </div>
    )
}

export default Editprod