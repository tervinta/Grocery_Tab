import React from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn
}
from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN_MUTATION } from '../../utils/mutations'
import Auth from '../../utils/auth';

import './style.scss';

export default function Login() {
    const [login, { loading }] = useMutation(LOGIN_MUTATION);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logingHandler = async (evt) => {
        evt.preventDefault();

        try {
            const { data } = await login({
                variables: { email, password }
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <MDBContainer className="container p-3 my-5 d-flex flex-column w-50">
            <form id="login-form" onSubmit={logingHandler}>

                <h2 id='login-h2' className='d-flex justify-content-center'>Login</h2>

                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={(evt) => setEmail(evt.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(evt) => setPassword(evt.target.value)}/>

                <button type='submit' className="submit-button" disabled={loading}>Sign in</button>

                <div className="text-center">
                    <p>Not a member? <Link to={"/signup"}>Register</Link></p>

                    <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                    </MDBBtn>

                    </div>
                </div>
                <div id='spacer'></div>
            </form>

        </MDBContainer>
    );
}
