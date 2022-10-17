import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Add = () => {

    const initialValues = {
        username: "",
        email: "",
        phone: "",
        status: "",
        gender: "",
        profile: "https://th.bing.com/th/id/R.09ecc9caa027d5e1ceefd40ac2f68df2?rik=NmsRbkO3v%2fM9vw&riu=http%3a%2f%2fplusmontage.dk%2fwp-content%2fuploads%2fsites%2f7467%2f2020%2f05%2fprofile-blank.png&ehk=0Dz57rg%2fMhrON1SW0gAxKZ4UOgN7fmPGjb5zK%2bRMdZI%3d&risl=&pid=ImgRaw&r=0",
    }

    const navigate = useNavigate();
    const [input, setInput] = useState(initialValues);

    const handleSubmit = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if (input.username !== "" && input.email !== "") {
            const url = "http://localhost:2000/add_employee";
            const response = await axios.post(url, input);
            console.log(response.data);
            if (response.status === 201) {
                navigate('/details');
            } else {
                window.alert ("invalid details");
            }
        }
    }

    let base64String = "";

    const imageUploaded = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            base64String = reader.result;
            setInput((pre) => ({ ...pre, profile: base64String }));
        }
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    }

    return (
        <>
            <div className='fullcont'>
            <div id='back'>
                <Link to='/details'><i class="fa fa-chevron-circle-left" aria-hidden="true">Back</i></Link>
            </div>
                <div className='container2' >
                    <h2>Add Employee Details</h2>
                    <div className='ui divider'></div>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Username</label>
                            <input type='text' name='username' placeholder='enter your name' values={initialValues.username} onChange={handleSubmit} />
                        </div>

                        <div className='field'>
                            <label>Email</label>
                            <input type='email' name='email' placeholder='enter your email' values={initialValues.email} onChange={handleSubmit} />
                        </div>

                        <div className='field'>
                            <label>Phone</label>
                            <input type='number' name='phone' placeholder='enter your phone number' maxLength={11} values={initialValues.phone} onChange={handleSubmit} />
                        </div>

                        <div className='field' id="status">
                            <label>Status</label>
                            <input type="radio" name="status" value='active' values={initialValues.status} onChange={handleSubmit} />Active
                            <input type="radio" name="status" value='deactive' values={initialValues.status} onChange={handleSubmit} />DeActive
                        </div>

                        <div className='field'>
                            <label>Gender</label>
                            <select name="gender" values={initialValues.gender} onChange={handleSubmit}>
                                <option >Select the Gender</option>
                                <option value="male">Male</option>
                                <option value="female" >Female</option>
                                <option value="others" >Others</option>
                            </select>
                        </div>

                        <div className='field'>
                            <label>Profile Pic</label>
                            <input type="file" name='image' id="image" values={initialValues.profile} onChange={imageUploaded} />
                        </div>

                        <button className='fluid ui button' id='btn' onClick={handleClick}>Add</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add;