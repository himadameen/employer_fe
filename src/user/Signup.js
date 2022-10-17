import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import signupImg from '../images/signin.svg';


const Signup = () => {

    const initialValues = {
        fullName: "",
        email: "",
        mobile: "",
        address: "",
        password: "",
        re_password: "",
    }


    const navigate = useNavigate();
    const [data, setData] = useState(initialValues);
    const [error, setError] = useState(false);
    const [formError, setFormError] = useState({});


    const handleSubmit = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if (data.fullName !== "" && data.email !== "") {
            const url = "http://localhost:2000/new/newUser";
            const response = await axios.post(url, data);
            console.log(response.data);
            if (response.status === 201) {
                window.alert("successfully registered !!");
                navigate('/signin');
            } else {
                window.alert("Invalid Credientials!!")
            }
        } else {
            setFormError(validate(data));
            setError(true);
        }
    }

    useEffect(() => {
        if (Object.keys(formError).length === 0 && error) { }
    }, [formError])


    const validate = (data) => {
        const errors = {};
        const er = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!data.fullName) {
            errors.fullName = "UserName is required!";
        }
        if (!data.email) {
            errors.email = "Email is required!";
        } else if (!er.test(data.email)) {
            errors.email = "Please enter valid email"
        }
        if (!data.mobile) {
            errors.mobile = "Please enter your mobile number";
        }
        if (!data.address) {
            errors.address = "Please enter your address";
        }
        if (!data.password) {
            errors.password = "Please enter your password";
        }
        if (!data.re_password) {
            errors.re_password = "please enter your re_password";
        }
        return errors;
    }




    return (
        <>
            <div className='bdy'>
                <div className='full'>
                    <div className='right'>
                        <img src={signupImg} alt='signup' />
                    </div>
                    <div className='left'>
                        <div className='container3' >
                            <h2>Registration Form</h2>
                            <div className='ui divider'></div>
                            <div className='ui form'>
                                <div className='field'>
                                    <label>Username</label>
                                    <input type='text' name='fullName' placeholder='enter your name' values={initialValues.username} onChange={handleSubmit} required />
                                    <p id='red'>{formError.fullName}</p>
                                </div>

                                <div className='field'>
                                    <label>Email</label>
                                    <input type='email' name='email' placeholder='enter your email' values={initialValues.email} onChange={handleSubmit} required />
                                    <p id='red'>{formError.email}</p>
                                </div>

                                <div className='field'>
                                    <label>Mobile</label>
                                    <input type='number' name='mobile' placeholder='enter your phone number' maxLength={11} values={initialValues.mobile} onChange={handleSubmit} />
                                    <p id='red'>{formError.mobile}</p>
                                </div>
                                <div className='field'>
                                    <label>Address</label>
                                    <input type='text' name='address' placeholder='enter your address' values={initialValues.address} onChange={handleSubmit} />
                                    <p id='red'>{formError.address}</p>

                                </div>
                                <div className='field'>
                                    <label>Password</label>
                                    <input type='password' name='password' placeholder='enter your password' values={initialValues.password} onChange={handleSubmit} required />
                                    <p id='red'>{formError.password}</p>

                                </div>
                                <div className='field'>
                                    <label>Confirm Password</label>
                                    <input type='password' name='re_password' placeholder='enter your confirm password' values={initialValues.re_password} onChange={handleSubmit} required />
                                    <p id='red'>{formError.re_password}</p>

                                </div>
                                <button className='fluid ui button' id='btn' onClick={handleClick}>Register</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Signup;