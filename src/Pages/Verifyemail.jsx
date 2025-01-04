import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';
import { useNavigate } from 'react-router-dom';



function Verifyemail() {
    const [message, setMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const verifyToken = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');

            try {
                const response = await axios.get(`${BASE_URL}/verify-email?token=${token}`);
                setMessage(response.data.message);  // Show success message if token is valid
            } catch (error) {
                setMessage('Verification failed. Invalid or expired token.');  // Handle errors
            }
        };
        verifyToken();
    }, [location]);


    const navigate = useNavigate();

    useEffect(() => {
     const timeout = setTimeout(() => {
         navigate("/log");
      }, 6000);
      return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div style={{ marginTop: '80px' ,minHeight:'60vh'}} className='d-flex justify-content-center align-items-center'>

            <div className="container  my-5 p-4 border rounded shadow-sm text-center" style={{ backgroundColor: "#f9f9f9", maxWidth: "500px", margin: "auto", fontFamily: "Arial, sans-serif", }}>
                <div
                    className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                    style={{  width: "60px", height: "60px", backgroundColor: "rgb(159, 5, 5)",  marginBottom: "20px", }}>
                    <i className="fas fa-check"  style={{ fontSize: "36px", color: "white" }} ></i>
                </div>
                <h2 className="text-center ht1 m-4">Email <span className='ht2'>VERIFICATION</span> </h2>
                <p style={{ fontSize: "16px", color: "#333", lineHeight: "1.5" }}>
                    {message}
                    <p className='m-4'>You will be redirected shortly...</p>
                </p>
            </div>



        </div>
    );
};

export default Verifyemail;
