import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import signupImg from '../images/signin.svg';


const SignIn = () => {

  const initialValues = {
    email: "",
    password: "",
  }


  const navigate = useNavigate();
  const [data, setData] = useState(initialValues);
  const [error, setError] = useState(false);
  const [formE, setFormE] = useState({});


  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (data.email !== "" && data.password !== "") {
      const url = "http://localhost:2000/new/signin";
      const response = await axios.post(url, data);
      console.log(response.data);
      if (response.status === 201) {
        window.alert("successfully login !!")
        navigate('/');
      } else if(response.status === 404){
        window.alert("Invalid Credentials");
      }else;
    } else {
      setFormE(validate(data));
      setError(true);
    }
  }

  useEffect(() => {
    if (Object.keys(formE).length === 0 && error) {}
  }, [formE]);

  const validate = (data) => {
    let errors = {};
    const er = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!data.email) {
      errors.email = "Email is required!";
    } else if (!er.test(data.email)) {
      errors.email = "Please enter valid email"
    }
    if (!data.password) {
      errors.password = "Password is required!";
    }
    // else if(data.password !== initialValues.password){
    //   window.alert("Invalid Credentials");
    // }else;
     
    return errors;
  }



  return (
    <>
      <div className='bdy'>
        <div className='full' id='sign'>
          <div className='right'>
            <img src={signupImg} alt='signup' />
          </div>
          <div className='left'>
            <div className='container3' >
              <h2>Log In</h2>
              <div className='ui divider'></div>
              <div className='ui form'>
                <div className='field'>
                  <label>Email</label>
                  <input type='email' name='email' placeholder='enter your email' values={initialValues.email} onChange={handleSubmit} />
                  <p id='red'>{formE.email}</p>
                </div>
                <div className='field'>
                  <label>Password</label>
                  <input type='password' name='password' placeholder='enter your password' maxLength={11} values={initialValues.password} onChange={handleSubmit} />
                  <p id='red'>{formE.password}</p>
                </div>
                <button className='fluid ui button' id='btn2' onClick={handleClick}>Sign In</button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default SignIn;