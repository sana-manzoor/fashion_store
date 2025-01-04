

import React, { useState,useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'


const Checkout = () => {
  const [amount, setAmount] = useState(localStorage.getItem('amount')); // Example amount in cents
  const [paymentDetails,setPaymentDetails]=useState(null)
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "21px",
        "::placeholder": {
          color: "#aab7c4",

        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();



    if (!stripe || !elements) {
      console.error('Stripe or Elements not initialized.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error('CardElement not found or not initialized.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        console.error('Payment Error:', error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentDetails(paymentIntent);
        console.log(paymentIntent)
        sessionStorage.setItem("details", JSON.stringify(paymentIntent));
        toast.success('Payment successful!');
        navigate('/success');
      }
      else{
        toast.error("Payment failed!!")
      }
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };


  useEffect(() => {
    if (paymentDetails) {
      sessionStorage.setItem("details", JSON.stringify(paymentDetails));
      console.log('Updated paymentDetails:', paymentDetails);
    }
  }, [paymentDetails]); 




  return (
    <div style={{ width: '440px' }} className='border shadow m-5 p-5'>
      <form onSubmit={handleSubmit} >
        <h3>Enter Card Details</h3>
        <CardElement options={cardElementOptions} />
        <div>
          <table className="table" style={{ fontSize: '25px' }}>
            <tbody>
              <tr className="mt-2">
                <td>Shipping Charge:</td>
                <td style={{ textDecoration: 'line-through' }}>₹40</td>
              </tr>
              <tr className="mt-2">
                <td>Delivery Charge:</td>
                <td style={{ textDecoration: 'line-through' }}>₹50</td>
              </tr>
              <tr className="mt-4">
                <td>Total:</td>
                <td>₹{amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className='btn btn-outline-danger' disabled={!stripe}>
            Pay ₹{amount}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Checkout;
