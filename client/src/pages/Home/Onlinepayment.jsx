import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Onlineorder2.css'


const PaymentForm = () => {
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const navigate = useNavigate();

  const Successfulorder = () => {
    navigate('/PaymentSuccess');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <div className="paymentform">
      <div className="credit-card">
        <div className="card-number">{formData.number || '#### #### #### ####'}</div>
        <div className="card-holder">{formData.name || 'CARDHOLDER'}</div>
        <div className="card-expiry-cvc">
          <div className="expiry">{formData.expiry || 'MM/YY'}</div>
          <div className="cvc">{formData.cvc || 'CVC'}</div>
        </div>
      </div>

      <div className='forms'> 
        <div className="formgroup">
          <label>Card Number</label>
          <input
            type="text"
            name="number"
            maxLength="16"
            placeholder="Card Number"
            value={formData.number}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginTop: '5px' }}

          />
        </div>

        <div className="formgroup">
          <label>Cardholder Name</label>
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginTop: '5px' }}

          />
        </div>

        <div className="formgroup">
          <label>Expiry Date</label>
          <input
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginTop: '5px' }}

            type="text"
            name="expiry"
            maxLength="5"
            placeholder="MM/YY"
            value={formData.expiry}
            onChange={handleInputChange}
          />
        </div>

        <div className="formgroup">
          <label>CVC</label>
          <input
            type="text"
            name="cvc"
            maxLength="3"
            placeholder="CVC"
            value={formData.cvc}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginTop: '5px' }}

          />
        </div>
<Link to='/successfull'>
        <button type="button" onClick={Successfulorder}
          style={{ width: '30%',padding:'15px',backgroundColor:'#4CAF50' }}
        >Pay Now</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentForm;
