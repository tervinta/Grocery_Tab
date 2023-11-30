import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  const Successfulorders = () => {
    navigate('/');
  };
  return (
    <section className='paymentSuccess'>
    
    <main>
    <h1>Order Confirmed</h1>
    <p>Order Placed Successfully , You can check order status below</p>
    <button onClick={Successfulorders}
     style={{ width: '20%', padding: '10px', boxSizing: 'border-box', marginTop: '15px',
     backgroundColor:'#4CAF50'
      }}

    >Check Status</button>
    </main>
    </section>
  )
}
