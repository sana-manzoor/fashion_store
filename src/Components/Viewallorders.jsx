import React, { useEffect,useState } from 'react'
import Admheader from './Admheader'
import { Table } from 'react-bootstrap'
import { orderlist } from '../services/allApis'


function Viewallorders() {

    const [ord, setOrd] = useState([])
 
  
    const allorders = async () => {
      const result = await orderlist()
      console.log(result)
      if (result.status === 200) {
        console.log(result.data)
        setOrd(result.data)
        // console.log(prod)
      }
  
  
    }

    useEffect(()=>{
        allorders()
    },[])
  return (
    <>
        <Admheader />
        <div className="container mb-5 ll" style={{ marginTop: '80px', minHeight: '400px' }}>
        <h2 className="text-center mt-5 mb-4 ht1">View <span className='ht2'>ORDERS</span> </h2>
        <Table bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Id</th>
                <th>Orderid</th>
                <th>UserId</th>
                <th>Uname</th>
                <th>Amount</th>
                <th>Status</th>
                

              </tr>
            </thead>

            <tbody>


              {
                ord?.map((item, index) => (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item._id}</td>
                      <td>{item.id}</td>
                      <td>{item.uid}</td>
                      <td>{item.uname}</td>
                      <td>{item.amount}</td>
                      <td>{item.status}</td>
                    </tr>
                  </>
                ))
              }

            </tbody>


          </Table>

        

        </div>
        </>
  )
}

export default Viewallorders