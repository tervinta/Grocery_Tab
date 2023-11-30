import React, { useState } from 'react';
import { Country, State } from 'country-state-city';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';

export default function Shipping() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        houseNo: '',
        city: '',
        country: '',
        state: '',
        pinCode: '',
        phoneNo: '',
    });

    const confirmOrder = (e) => {
        e.preventDefault();

        // Validate the form
        if (validateForm()) {
            navigate('/ConfirmOrder');
        } else {
            showErrorToast('Please fill out all required fields.');
        }
    };

    const validateForm = () => {
        const { houseNo, city, country, state, pinCode, phoneNo } = formValues;
        return houseNo && city && country && state && pinCode && phoneNo;
    };

    const handleInputChange = (e) => {
        console.log(e)
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
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
        <section className='shipping'>
            <main>
                <h1>CheckOut details</h1>
                <form>
                    <div>
                        <label>House No</label>
                        <input
                            type='text'
                            name='houseNo'
                            placeholder='Enter House No'
                            required
                            // value={formValues.houseNo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>City</label>
                        <input
                            type='text'
                            name='city'
                            placeholder='Enter City'
                            // value={formValues.city}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Country</label>
                        <select
                            name='country'
                            // value={formValues.country}
                            onChange={handleInputChange}
                        >
                            <option value=''>Country</option>
                            {Country && Country.getAllCountries().map((i) => (
                                <option value={i.isoCode} key={`country_${i.isoCode}`}>
                                    {i.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>State</label>
                        <select
                            name='state'
                            // value={formValues.state}
                            onChange={handleInputChange}
                        >
                            <option value=''>State</option>
                            {State && State.getAllStates('PAK').map((i) => (
                                <option value={i.isoCode} key={`state_${i.isoCode}`}>
                                    {i.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Pin Code</label>
                        <input
                            type='number'
                            name='pinCode'
                            placeholder='Enter Pin Code'
                            // value={formValues.pinCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Phone No.</label>
                        <input
                            type='text'
                            name='phoneNo'
                            placeholder='Enter Phone No'
                            // value={formValues.phoneNo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Link to="/confirm">
                    <button type='button'>
                        Confirm Order
                    </button>
                    </Link>
                </form>
            </main>
            <ToastContainer />
        </section>
    );
}
