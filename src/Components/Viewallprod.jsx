import React, { useState, useEffect } from 'react'
import Admheader from './Admheader'
import { BASE_URL } from '../services/baseUrl'
import { getallpp } from '../services/allApis'
import { Table } from 'react-bootstrap'
import { delprod } from '../services/allApis'
import Editprod from './Editprod'
import { toast } from 'react-toastify'


function Viewallprod() {

  const [prod, setProd] = useState([])

  const [token, setToken] = useState("")

  const allprod = async () => {
    const result = await getallpp()
    console.log(result)
    if (result.status === 200) {
      console.log(result.data)
      setProd(result.data)
      // console.log(prod)
    }


  }

  const deleteProd = async (id) => {
    const reqHeader = {
      "Content-Type": "application/json", "Authorization": `Bearer ${token}`
    }
    const result = await delprod(id, reqHeader)
    // console.log(result)
    if (result.status === 200) {
      // console.log(result.data)
      allprod()
      // setStudents(result.data)
      toast.success("deleted successfully!")
    }
    else {
      toast.error("deletion failed!!")
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    allprod()

  }, [])

  return (
    <>
      <Admheader />
      <div className="container mb-5 allcc" style={{ marginTop: '30px', minHeight: '400px' }} >
        <h2 className="text-center ht1 m-3 ">All <span className='ht2'>Products</span> </h2>

        <div className="table-responsive">
          <Table bordered hover>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Number</th>
                <th></th>
                <th></th>

              </tr>
            </thead>

            <tbody>


              {
                prod?.map((item, index) => (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td><img src={`${BASE_URL}/upload/${item.image}`} height={'100px'} width={'200px'} alt="" className='kk' /></td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>{item.subcategory}</td>
                      <td>{item.number}</td>
                      <td> <Editprod prod={item} /></td>
                      <td><button onClick={() => { deleteProd(item._id) }} className="btn"> <i class="fas fa-trash fa-lg"></i></button> </td>
                    </tr>
                  </>
                ))
              }

            </tbody>


          </Table>
        </div>



      </div>
    </>
  )
}

export default Viewallprod 