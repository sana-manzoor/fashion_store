import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addorder } from '../services/allApis';
import { deletecart } from '../services/allApis';


function Success() {
  const [details, setDetails] = useState(null);
  const [data, setData] = useState({
   
  });

const navigate=useNavigate()

  // Function to add order
  const orderadd = async () => {
    const result = await addorder(data);
    if (result.status === 200) {
      console.log("Order added:", result.data);
    } else {
      console.log("Error adding order");
    }
  };

  console.log(data)

  useEffect(() => {
    const storedDetails = sessionStorage.getItem("details");
    if (storedDetails) {
      try {
        const parsedDetails = JSON.parse(storedDetails); // Properly parse the data
        console.log("Parsed Details:", parsedDetails);
  
        // Update the data state with all properties at once
        setData((prevData) => ({
          ...prevData,
          ...parsedDetails, // Include the details from sessionStorage
          uid: JSON.parse(sessionStorage.getItem("currentUser")),
          uname: JSON.parse(sessionStorage.getItem("uname"))
        }));
  
        // Optionally, also update the details state
        setDetails(parsedDetails);
      } catch (error) {
        console.error("Error parsing session storage data:", error);
      }
    }
  }, []);

  console.log(details)

  useEffect(() => {
    if (details) {
      console.log("Details updated, calling orderadd:");
      orderadd();
    }
  }, [details]);

  // Function to clear all stored data
  const clearall = async () => {
    localStorage.clear();
    const result = await deletecart(data.uid);
    if (result.status === 200) {
      console.log("Cart cleared successfully");
      navigate('/')
      
    } else {
      console.log("Error clearing cart");
    }
  };

  useEffect(() => {
    console.log("Updated data state:", data);
  }, [data]);

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', backgroundColor: '#E2EAF4' }}>
      <div style={{ height: '600px', width: '550px', backgroundColor: 'white' }}>
        <img
          src="https://i.gifer.com/origin/11/1184b4c0aa977f925dde58d2075772dd_w200.gif"
          style={{ width: '350px', height: '200px' }}
          alt=""
          className="d-block mx-auto"
        />
        <h2 className='text-center text-danger'>Payment Successful</h2>
        <h5 className='text-center'>We received your purchase request!!</h5>
        <div className='text-left ms-5 mt-4' style={{ fontSize: '22px' }}>
          <p><strong>Payment ID:</strong> {details?.id || 'Loading...'}</p>
          <p><strong>Amount paid:</strong> ₹{details?.amount || 'Loading...'}</p>
          <p><strong>Status:</strong> {details?.status || 'Loading...'}</p>
        </div>
        <div className='text-center'>
          <button className='btn btn-outline-danger btn-lg' onClick={clearall}>Home</button>
        </div>
      </div>
    </div>
  );
}

export default Success;
