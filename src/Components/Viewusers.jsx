import React,{useState,useEffect} from 'react'
import Admheader from './Admheader'
import { userslist } from '../services/allApis'
import { Table } from 'react-bootstrap'

function Viewusers() {

  const [users,setUsers]=useState([])

  const allusers = async () => {
    const result = await userslist()
    console.log(result)
    if (result.status === 200) {
      // console.log(result.data)
      setUsers(result.data)
      // console.log(prod)
    }


  }

  useEffect(()=>{
    allusers()
  },[])

  return (
    <>
        <Admheader />
        <div className="container mb-5" style={{ marginTop: '30px', minHeight: '400px' }}>
      <h2 className="text-center ht1 m-3 ">All <span className='ht2'>USERS</span> </h2>

        <div className="table-responsive tt">
        <Table bordered hover>
          <thead>
          <tr>
              <th></th>
              <th>Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              
              
          </tr>
          </thead>
          
            <tbody>
              

              {
                users?.map((item,index)=>(
                  <>
                  <tr>
                  <td>{index+1}</td>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                
               
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

export default Viewusers