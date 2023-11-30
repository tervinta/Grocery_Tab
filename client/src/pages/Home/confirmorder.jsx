import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ConfirmOrder() {
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState();

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
    };

    const confirmDetails = () => {
        if (selectedPayment === 'cashOnDelivery') {
            navigate('/successfull');
        } else if (selectedPayment === 'online') {
            navigate('/Online');
        }
    };

    const showErrorToast = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <section className='confirmOrder'>
            <main>
                <h1>Order Confirm</h1>

                <form>
                    <div>
                        <label>
                            <input
                                type='radio'
                                name='payment'
                                value='cashOnDelivery'
                                onChange={handlePaymentChange}
                            />
                            Cash on delivery
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                                type='radio'
                                name='payment'
                                value='online'
                                onChange={handlePaymentChange}
                            />
                            Online
                        </label>
                    </div>

                    <button type='button' onClick={confirmDetails}>
                        Place Order
                    </button>
                </form>
            </main>
            <ToastContainer />
        </section>
    );
}

